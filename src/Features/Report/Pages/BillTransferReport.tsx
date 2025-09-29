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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import BillTransferTable from "../Components/BillTransferTable";
import { billTransfers } from "../Components/utils/repot";
import {
  selectBillTransfer,
  setBillTransfer,
} from "../reportSlices/reportSlice";

export const FormSchema = z
  .object({
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
  })
  .refine((data) => data.fromDate || data.toDate, {
    message: "Please Provide From Date or To Date",
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
    const fromDate = data.fromDate ? format(data.fromDate, "yyyy-MM-dd") : "";
    const toDate = data.toDate ? format(data.toDate, "yyyy-MM-dd") : "";

    let filtered = billTransfers;

    if (fromDate && toDate) {
      filtered = filtered.filter(
        (item) => item.date >= fromDate && item.date <= toDate
      );
    } else if (fromDate) {
      filtered = filtered.filter((item) => item.date >= fromDate);
    } else if (toDate) {
      filtered = filtered.filter((item) => item.date <= toDate);
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
          Bill Transfer Reports
        </h1>
        <div className="rounded-b-sm pt-4 bg-white  px-5 pb-2">
          <Form {...form}>
            <form>
              <div className="flex 2sm:flex-row flex-col items-end gap-5">
                <FormField
                  control={form.control}
                  name="fromDate"
                  render={({ field }) => (
                    <FormItem className=" flex 2lg:max-w-max w-full flex-col ">
                      <FormLabel className="font-normal text-base">
                        From Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <div
                              className={cn(
                                "flex 2lg:w-[520px]  w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer text-sm font-Inter",
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
                <FormField
                  control={form.control}
                  name="toDate"
                  render={({ field }) => (
                    <FormItem className=" flex 2lg:max-w-max w-full flex-col ">
                      <FormLabel className="font-normal text-base">
                        To Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <div
                              className={cn(
                                "flex 2lg:w-[520px]  w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer text-sm font-Inter",
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
              </div>

              <p className="text-red-500 text-sm my-2">
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
        className="pdf-container  mt-3 pt-2 max-h-[78vh] overflow-y-auto bg-white shadow-sm pb-2 rounded-md w-full"
      >
        <div className="ml-6 mr-4">
          <BillTransferTable billTransfers={IBillTransfers || []} />
        </div>
      </div>
    </div>
  );
};

export default BillTransferReport;
