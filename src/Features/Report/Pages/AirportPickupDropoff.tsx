import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Calendar } from "../../../components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import ReportTable from "../Components/AirportPickupDropoff/ReportTable";
import useDropOffReservation from "../hooks/useDropOffReservation";
import usePickupReservation from "../hooks/usePickupReservation";

const FormSchema = z.object({
  reportDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a reportDate",
    }),
});

const AirportPickupDropoff = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const ComponentPdf = useRef(null);

  const { data: pickupInformations } = usePickupReservation(
    "/pickupReservation.json",
    false
  );
  const { data: dropOffInformation } = useDropOffReservation(
    "/dropOffReservation.json"
  );
  const [filteredPickup, setFilteredPickup] = useState(pickupInformations);
  const [filteredDrop, setFilteredDrop] = useState(dropOffInformation);

  useEffect(() => {
    setFilteredPickup(pickupInformations);
    setFilteredDrop(dropOffInformation);
  }, [pickupInformations, dropOffInformation]);

  const onSubmitHandleSearch = async (values: z.infer<typeof FormSchema>) => {
    try {
      // Handle Search
      const selectedDate = values?.reportDate
        ? format(values.reportDate, "yyyy-MM-dd")
        : "";

      setFilteredPickup(
        pickupInformations?.filter((item) => item.date === selectedDate)
      );
      setFilteredDrop(
        dropOffInformation?.filter((item) => item.date === selectedDate)
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset();
      setFilteredPickup(pickupInformations);
      setFilteredDrop(dropOffInformation);
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
          Airport PickUp Drop Report
        </h1>
        <div className="rounded-b-sm bg-white px-5 pb-2">
          <p className="pb-1 pt-2 ">Report Date</p>

          <Form {...form}>
            <form className="space-y-2">
              <FormField
                control={form.control}
                name="reportDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <Popover>
                      <PopoverTrigger>
                        <FormControl>
                          <div
                            className={cn(
                              "flex md:w-[520px] w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer text-sm font-Inter",
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
              <div className="flex gap-2">
                <Button
                  className="bg-[#0069d9] hover:bg-[#0069d9]/80 py-3 rounded-[4px] cursor-pointer font-normal"
                  type="submit"
                  onClick={form.handleSubmit(onSubmitHandleSearch)}
                >
                  Search
                </Button>

                <Button
                  className="bg-[#343a40] hover:bg-[#343a40]/80 py-3 rounded-[4px] cursor-pointer font-normal"
                  type="button"
                  onClick={onSubmitHandleClear}
                >
                  Clear
                </Button>
                <Button
                  className="bg-[#17a2b8] hover:bg-[#17a2b8]/80 py-3 rounded-[4px] cursor-pointer
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
            Airport PickUp Drop Report
          </h1>

          <ReportTable
            pickupInformations={filteredPickup}
            dropOffInformation={filteredDrop}
          />
        </div>
      </div>
    </div>
  );
};

export default AirportPickupDropoff;
