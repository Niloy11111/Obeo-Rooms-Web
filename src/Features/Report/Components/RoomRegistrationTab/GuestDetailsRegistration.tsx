/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Calendar } from "../../../../components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { cn } from "../../../../lib/utils";
import { CompleteSchemaRegistration } from "../../zod/room-registration";

interface GuestDetailsRegistrationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchemaRegistration>, any, any>;
}

const GuestDetailsRegistration = ({ form }: GuestDetailsRegistrationProps) => {
  const isReservationChecked = form.watch("reservation");
  const isListedCompanyChecked = form.watch("listedCompany");

  useEffect(() => {
    if (!isReservationChecked) {
      form.setValue("reservationSelect", "");
    }
    if (!isListedCompanyChecked) {
      form.setValue("listedCompanySelect", "");
    }
  }, [isReservationChecked, isListedCompanyChecked, form]);

  return (
    <div className=" pb-6 mb-6">
      {/* Row 1: Reservation, Check In Date & Time, Departure Date & Time, Total Nights, Linked Company */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 lg:grid-cols-8 w-full gap-5">
        {/* Reservation Checkbox and Select */}
        <div className="md:col-span-3 flex gap-3 items-start ">
          <FormField
            control={form.control}
            name="reservation"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-normal  ">Reservation</FormLabel>
                <FormControl>
                  <div className="border border-gray-200 h-[35px] flex items-center justify-center mx-auto w-[35px]">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reservationSelect"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="invisible font-normal ">Select</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
                  value={field.value}
                  disabled={!isReservationChecked}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-[35px] bg-[#e9ecef]",
                        !isReservationChecked && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="res1">Reservation 1</SelectItem>
                    <SelectItem value="res2">Reservation 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Check In Date and Time */}
        <div className="2xl:col-span-2 lg:col-span-3 md:col-span-2 grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">Check In Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter ",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter ">
                            <span className="font-Inter">Select a Date</span>
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
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
            name="checkInTime"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="invisible font-normal ">Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    step="1"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    {...field}
                    value={
                      field.value ||
                      new Date().toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Departure Date and Time */}
        <div className="2xl:col-span-2 lg:col-span-3 md:col-span-2 grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal  ">Departure Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter ",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter ">
                            <span className="font-Inter">Select a Date</span>
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
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
            name="departureTime"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="invisible font-normal ">Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    step="1"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    {...field}
                    value={
                      field.value ||
                      new Date().toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Total Nights */}

        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="totalNights"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal  ">Total Nights</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Linked Company */}
        <div className="md:col-span-3 flex gap-3 items-start">
          <FormField
            control={form.control}
            name="listedCompany"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-normal   whitespace-nowrap">
                  Listed Company
                </FormLabel>
                <FormControl>
                  <div className="border border-gray-200 h-[35px] flex items-center mx-auto justify-center w-[35px]">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listedCompanySelect"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="invisible font-normal ">Select</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
                  value={field.value}
                  disabled={!isListedCompanyChecked}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-[35px] w-full bg-[#e9ecef]",
                        !isListedCompanyChecked &&
                          "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="company1">Company 1</SelectItem>
                    <SelectItem value="company2">Company 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 3: Currency Name and Conversion Rate */}
      <div className="mt-5 grid lg:grid-cols-2 md:grid-cols-1 w-full gap-5">
        <div className="w-full">
          <FormField
            control={form.control}
            name="currencyName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Currency Name *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                      <SelectValue placeholder="BDT" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="BDT">BDT</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="conversionRate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Conversion Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1.00"
                    className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsRegistration;
