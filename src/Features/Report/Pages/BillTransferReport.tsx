import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import BillTransferTable from "../Components/BillTransferReport/BillTransferTable";
import useBillTransfers from "../hooks/useBillTransfers";
import {
  selectBillTransfer,
  setBillTransfer,
} from "../reportSlices/reportSlice";
import { IBillTransfer } from "../types/report";

const FormSchema = z
  .object({
    fromDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a from date",
      }),
    toDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a to date",
      }),
  })
  .superRefine((data, ctx) => {
    const hasValue = data.fromDate || data.toDate;

    // If at least one field has value, remove field errors
    if (hasValue) {
      ctx.issues = [];
    }
  });

const BillTransferReport = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [originalBillTransfers, setOriginalBillTransfers] = useState<
    IBillTransfer[]
  >([]);
  const dispatch = useAppDispatch();
  const ComponentPdf = useRef(null);
  const billTransfers = useAppSelector(selectBillTransfer);
  const { data } = useBillTransfers("/billTransfer.json");

  useEffect(() => {
    if (data.length > 0) {
      setOriginalBillTransfers(data);
      if (
        !billTransfers ||
        (Array.isArray(billTransfers) && billTransfers.length === 0)
      ) {
        dispatch(setBillTransfer(data));
      }
    }
  }, [data, dispatch, billTransfers]);

  const onSubmitHandleSearch = async (data: z.infer<typeof FormSchema>) => {
    try {
      const fromDate = data.fromDate ? format(data.fromDate, "yyyy-MM-dd") : "";
      const toDate = data.toDate ? format(data.toDate, "yyyy-MM-dd") : "";

      let filtered = originalBillTransfers;

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
    } catch (error) {
      console.error("Error submitting form:", error);

      throw error;
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset();
      dispatch(setBillTransfer(originalBillTransfers));
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const generatePDF = useReactToPrint({
    content: () => ComponentPdf.current,
    documentTitle: "PickupDropReport",
    onAfterPrint: () => toast.success("PDF generated successfully!"),
  });

  const handlePrint = () => {
    generatePDF();
  };

  return (
    <div className="font-Roboto    ">
      <div className="shadow-sm">
        <h1 className="text-xl  text-white bg-[#343a3f] py-2 pl-5">
          Bill Transfer Reports
        </h1>
        <div className="rounded-b-sm pt-4 bg-white  px-5 pb-2">
          <Form {...form}>
            <form>
              <div className=" flex 2sm:flex-row flex-col items-end 2lg:gap-5 gap-3">
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2 xs:mt-2 xs:mb-0 mt-5 mb-3 ">
                <Button
                  className="bg-[#0069d9] hover:bg-[#0069d9]/80 h-[35px]rounded-[4px] cursor-pointer
  font-normal "
                  type="submit"
                  onClick={form.handleSubmit(onSubmitHandleSearch)}
                >
                  Search
                </Button>

                <Button
                  className="bg-[#343a40] hover:bg-[#343a40]/80 h-[35px] rounded-[4px] cursor-pointer
  font-normal"
                  type="button"
                  onClick={onSubmitHandleClear}
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
          <BillTransferTable billTransfers={billTransfers || []} />
        </div>
      </div>
    </div>
  );
};

export default BillTransferReport;
