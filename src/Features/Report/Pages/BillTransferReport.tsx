import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

import { useReactToPrint } from "react-to-print";
import { Calendar } from "../../../components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { cn } from "../../../lib/utils";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import BillTransferTable from "../Components/BillTransferTable";
import { billTransfers } from "../Components/utils/repot";
import {
  selectBillTransfer,
  setBillTransfer,
} from "../reportSlices/reportSlice";

const FormSchema = z
  .object({
    transferId: z.string().optional(),
    reportDate: z.date().optional(),
    status: z.string().optional(),
  })
  .refine((data) => data.transferId || data.reportDate || data.status, {
    message: "Provide Transfer ID or Report Date or Status",
    path: ["_form"],
  });

const BillTransferReport = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const dispatch = useAppDispatch();
  const IBillTransfers = useAppSelector(selectBillTransfer);

  const ComponentPdf = useRef(null);

  const handleSearch = (data: z.infer<typeof FormSchema>) => {
    const selectedDate = data.reportDate
      ? format(data.reportDate, "yyyy-MM-dd")
      : "";
    const transferId = data.transferId;
    const status = data.status?.toLowerCase();

    let filtered = billTransfers;

    if (transferId) {
      filtered = filtered.filter((item) => item.transferId === transferId);
    } else if (selectedDate && status) {
      filtered = filtered.filter(
        (item) => item.transferDate === selectedDate && item.status === status
      );
    } else if (selectedDate) {
      filtered = filtered.filter((item) => item.transferDate === selectedDate);
    } else if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    dispatch(setBillTransfer(filtered));
    console.log("Filtered data:", filtered);
  };

  const handleClear = () => {
    form.reset();
    dispatch(setBillTransfer(billTransfers));
  };

  const generatePDF = useReactToPrint({
    content: () => ComponentPdf.current,
    documentTitle: "PickupDropReport",
    onAfterPrint: () => toast.success("PDF generated successfully!"),
  });

  const handlePrint = () => {
    generatePDF();
  };

  useEffect(() => {
    if (IBillTransfers?.length === 0) {
      dispatch(setBillTransfer(billTransfers));
    }
  }, []);

  return (
    <div className="font-Roboto   ">
      <div className="shadow-sm">
        <h1 className="text-xl  text-white bg-[#343a3f] py-2 pl-5">
          Bill Transfer Report
        </h1>
        <div className="rounded-b-sm pt-4 bg-white  px-5 pb-2">
          <Form {...form}>
            <form>
              <div className="flex 2sm:flex-row flex-col items-end gap-5">
                <FormField
                  control={form.control}
                  name="reportDate"
                  render={({ field }) => (
                    <FormItem className=" flex 2sm:max-w-max w-full flex-col ">
                      <FormLabel className="font-normal text-base">
                        Report Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <div
                              className={cn(
                                "flex 2sm:w-[340px] w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer text-sm font-Inter",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-sm font-Inter">
                                  {format(new Date(), "yyyy-MM-dd")}
                                </span>
                              )}
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="border border-[#E9E9E9] w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <div className="flex  xs:flex-row flex-col gap-5 w-full">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="2sm:w-[150px] w-full ">
                        <FormLabel className="font-normal text-base mt-0">
                          Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Any" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E9E9E9]">
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transferId"
                    render={({ field }) => (
                      <FormItem className="2sm:w-[150px] w-full ">
                        <FormLabel className=" font-normal text-base mt-0">
                          Transfer ID
                        </FormLabel>

                        <Input {...field} type="text" placeholder="BT001235" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <p className="text-red-500 text-sm my-2  ">
                {form?.formState?.errors?._form?.message}
              </p>

              <div className="flex gap-2 xs:mt-2 xs:mb-0 mt-5 mb-3 ">
                <Button
                  className="bg-[#0069d9] hover:bg-[#0069d9]/80 h-[35px]rounded-[4px] cursor-pointer
  font-normal "
                  type="button"
                  onClick={form.handleSubmit(handleSearch)}
                >
                  Search
                </Button>

                <Button
                  className="bg-[#343a40] hover:bg-[#343a40]/80 h-[35px] rounded-[4px] cursor-pointer
  font-normal"
                  type="button"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  className="bg-[#17a2b8] hover:bg-[#17a2b8]/80 h-[35px] rounded-[4px] cursor-pointer
  font-normal"
                  type="button"
                  onClick={handlePrint}
                >
                  Print
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div
        ref={ComponentPdf}
        className="pdf-container  mt-3 pt-4 max-h-[78vh] overflow-y-auto bg-white shadow-sm pb-2 rounded-md w-full"
      >
        <div className="ml-6 mr-4">
          <h1
            className="border-t pt-2 border-[#E9E9E9]  mb-2
          text-xl font-bold text-[#343a40]   "
          >
            Bill Transfer Report
          </h1>

          <BillTransferTable billTransfers={IBillTransfers || []} />
        </div>
      </div>
    </div>
  );
};

export default BillTransferReport;
