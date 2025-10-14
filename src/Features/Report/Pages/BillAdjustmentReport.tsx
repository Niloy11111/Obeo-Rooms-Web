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

import BillAdjustmentTable from "../Components/BillAdjustmentReport/BillAdjustmentTable";
import usePickupReservation from "../hooks/usePickupReservation";
import {
  selectPickupInformation,
  setPickupInformation,
} from "../reportSlices/reportSlice";
import { IPickUp } from "../types/report";

const FormSchema = z
  .object({
    reservationNo: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a reservationNo date",
      }),
    reportDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a reportDate",
      }),
    status: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a status",
      }),
  })
  .superRefine((data, ctx) => {
    const hasValue = data.reservationNo || data.reportDate || data.status;

    // If at least one field has value, remove all field errors
    if (hasValue) {
      ctx.issues = [];
    }
  });

const BillAdjustmentReport = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const dispatch = useAppDispatch();
  const ComponentPdf = useRef(null);

  const [originalPickupInformation, setOriginalPickupInformation] = useState<
    IPickUp[]
  >([]);

  const { data } = usePickupReservation("/pickupReservation.json");
  const pickupInformation = useAppSelector(selectPickupInformation);

  useEffect(() => {
    if (data.length > 0) {
      setOriginalPickupInformation(data);

      if (
        !pickupInformation ||
        (Array.isArray(pickupInformation) && pickupInformation.length === 0)
      ) {
        dispatch(setPickupInformation(data));
      }
    }
  }, [data, dispatch, pickupInformation]);

  const onSubmitHandleSearch = async (values: z.infer<typeof FormSchema>) => {
    try {
      // Handle Search
      const selectedDate = values.reportDate
        ? format(values.reportDate, "yyyy-MM-dd")
        : "";
      const reservationNo = values.reservationNo;
      const status = values.status?.toLowerCase();

      let filtered = originalPickupInformation as IPickUp[];

      if (reservationNo) {
        filtered = filtered.filter(
          (item) => item?.reservationNo === reservationNo
        );
      } else if (selectedDate && status) {
        filtered = filtered.filter(
          (item) =>
            item?.adjustmentDate === selectedDate && item.status === status
        );
      } else if (selectedDate) {
        filtered = filtered.filter(
          (item) => item?.adjustmentDate === selectedDate
        );
      } else if (status) {
        filtered = filtered.filter((item) => item.status === status);
      }

      dispatch(setPickupInformation(filtered));
    } catch (error) {
      console.error("Someting went wrong", error);

      throw error;
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset();
      dispatch(setPickupInformation(originalPickupInformation));
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
    <div className="font-Roboto   ">
      <div className="shadow-sm">
        <h1 className="text-xl  text-white bg-[#343a3f] py-2 pl-5">
          Bill Adjustment Report
        </h1>
        <div className="rounded-b-sm pt-4 bg-white  px-5 pb-2">
          <Form {...form}>
            <form>
              <div className="flex lg:flex-row flex-col items-end 2lg:gap-5 gap-3">
                <FormField
                  control={form.control}
                  name="reportDate"
                  render={({ field }) => (
                    <FormItem className=" flex 2lg:max-w-max w-full flex-col ">
                      <FormLabel className="font-normal text-base">
                        Report Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <div
                              className={cn(
                                "flex 2lg:w-[520px] w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer text-sm font-Inter",
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
                <div className="flex  xs:flex-row flex-col 2lg:gap-5 gap-3  w-full">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="2lg:w-[260px] w-full ">
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
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reservationNo"
                    render={({ field }) => (
                      <FormItem className="2lg:w-[260px] w-full ">
                        <FormLabel className=" font-normal text-base mt-0">
                          Researvation No
                        </FormLabel>

                        <Input {...field} type="text" placeholder="RES001235" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-2 xs:mt-2 xs:mb-0 mt-5 mb-3 ">
                <Button
                  className="bg-[#0069d9] hover:bg-[#0069d9]/80 h-[35px] rounded-[4px] cursor-pointer font-normal"
                  type="submit"
                  onClick={form.handleSubmit(onSubmitHandleSearch)}
                >
                  Search
                </Button>

                <Button
                  className="bg-[#343a40] hover:bg-[#343a40]/80 h-[35px] rounded-[4px] cursor-pointer font-normal"
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
        className="pdf-container  mt-3 pt-4 max-h-[78vh] overflow-y-auto bg-white shadow-sm pb-2 rounded-md w-full"
      >
        <div className="ml-6 mr-4">
          <h1
            className="border-t pt-2 border-[#E9E9E9]  mb-2
          text-xl font-bold text-[#343a40]   "
          >
            Bill Adjustment Report
          </h1>

          <BillAdjustmentTable pickupInformation={pickupInformation || []} />
        </div>
      </div>
    </div>
  );
};

export default BillAdjustmentReport;
