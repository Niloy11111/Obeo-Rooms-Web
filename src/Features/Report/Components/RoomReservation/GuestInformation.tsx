/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
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
import { CompleteSchema } from "../../zod/room-reservation";

interface CompleteInformationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchema>, any, any>;
}
const GuestInformation = ({ form }: CompleteInformationProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="border-b pb-6 mb-6">
      {/* Row 1 */}
      <div className="grid 2xl:grid-cols-12 lg:grid-cols-4 md:grid-cols-2  w-full gap-5">
        {/* Check In Date */}
        <div className="w-full col-span-2">
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
                          "flex   w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className=" font-Inter">
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

        {/* Check In Time */}
        <div className="w-full col-span-2">
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
                    className="h-[35px] bg-[#e9ecef] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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

        <div className="grid grid-cols-3 col-span-4 gap-5">
          {/* Check Out Date */}
          <div className="w-full col-span-1">
            <FormField
              control={form.control}
              name="checkOutDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal ">Check Out Date</FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <div
                          className={cn(
                            "flex  w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between  border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className=" font-Inter">
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

          {/* Check Out Time */}
          <div className="w-full col-span-1">
            <FormField
              control={form.control}
              name="checkOutTime"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="invisible font-normal ">Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="1"
                      className="h-[35px] bg-[#e9ecef] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
          <div className="w-full  col-span-1">
            <FormField
              control={form.control}
              name="totalNights"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal ">Total Nights</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Title */}
        <div className="w-full col-span-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal ">Title</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 2: First Name, Last Name, Email */}
      <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 w-full gap-5">
        <div className="w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">First Name*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="h-[35px] bg-[#e9ecef] appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">Last Name*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="h-[35px] bg-[#e9ecef] appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="h-[35px] bg-[#e9ecef] appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 3: Phone, Country, Reservation Mode */}
      <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 w-full gap-5">
        <div className="w-full">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="h-[35px] bg-[#e9ecef] appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal ">Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="BD">Bangladesh</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
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
            name="reservationMode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal ">Reservation Mode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-[#E9E9E9]">
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 4: More Guest Details Button, Currency Type, Discount Rate */}
      <div className="mt-5 grid grid-cols-12">
        <div className=" col-span-4 w-full gap-5">
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              type="button"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={() => {
                setShowModal(true);
              }}
            >
              More Guest Details
            </Button>
            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className=" font-semibold">
                      Additional Guest Information
                    </h3>
                    <button onClick={() => setShowModal(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <Button
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 w-full"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4"></div>
        <div className=" grid col-span-4 grid-cols-2 gap-5">
          <div className="">
            <FormField
              control={form.control}
              name="currencyType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal ">Currency Type</FormLabel>
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
          <div className="">
            <FormField
              control={form.control}
              name="discountRate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal ">Discount Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] appearance-none"
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
    </div>
  );
};

export default GuestInformation;
