/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
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
import { SearchTabSchema } from "../zod/search-tab";

// Default Values
const formDefaultValues = {
  roomTypes: undefined,
  roomNumber: "",
  registrationNumber: undefined,
  reservationNumber: undefined,
  checkInDate: undefined,
  companyName: undefined,
  country: undefined,
  nameOfTheGuest: "",
  guestPhoneNumber: undefined,
  contactPersonPhoneNumber: "",
};

const SearchTab = () => {
  const form = useForm({
    resolver: zodResolver(SearchTabSchema),
    defaultValues: formDefaultValues,
    mode: "onSubmit",
  });

  const onSubmitHandleSearch = async (
    data: z.infer<typeof SearchTabSchema>
  ) => {
    try {
      // Filter out empty values
      const filledData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      console.log("Search criteria:", filledData);
      // Perform search with filledData...
    } catch (error) {
      console.error("Error searching:", error);
      throw error;
    }
  };

  const handleClear = () => {
    form.reset(formDefaultValues);
    form.clearErrors();
  };

  return (
    <div className="min-h-screen text-sm font-Inter bg-gray-100">
      <div className="p-5">
        <h2 className="font-medium mb-4 text-xl">Search</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* Row 1: Room Types, Room Number, Registration Number */}
              <div className="grid lg:grid-cols-3 md:grid-cols-1 w-full gap-5">
                {/* Room Types */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="roomTypes"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-normal">
                          Room Types
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                              <SelectValue placeholder="-- Please Select --" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E9E9E9]">
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Double">Double</SelectItem>
                            <SelectItem value="Suite">Suite</SelectItem>
                            <SelectItem value="Deluxe">Deluxe</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Room Number */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Room Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Room Number"
                            className="h-[35px] bg-[#e9ecef] px-2 appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                            "
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || parseFloat(value) >= 0) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Registration Number */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Registration Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Registration Number"
                            className="h-[35px] bg-[#e9ecef] px-2 appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                            "
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || parseFloat(value) >= 0) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Row 2: Reservation Number, Check-In Date, Company Name */}
              <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-5">
                {/* Reservation Number */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="reservationNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Reservation Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Reservation Number"
                            className="h-[35px] bg-[#e9ecef] px-2 appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                            "
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || parseFloat(value) >= 0) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Check-In Date */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Check-In Date
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger className="w-full">
                              <div
                                className={cn(
                                  "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 text-sm cursor-pointer",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? format(field.value, "yyyy-MM-dd")
                                  : "Check-In Date"}
                                <CalendarIcon className="h-4 w-4 opacity-50" />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-auto">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout="dropdown"
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Name */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-normal">
                          Company Name
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                              <SelectValue placeholder="-- Please Select --" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E9E9E9]">
                            <SelectItem value="Company1">Company 1</SelectItem>
                            <SelectItem value="Company2">Company 2</SelectItem>
                            <SelectItem value="Company3">Company 3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Row 3: Country, Name Of the Guest, Guest Phone Number */}
              <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-5">
                {/* Country */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-normal">Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                              <SelectValue placeholder="-- Please Select --" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#E9E9E9]">
                            <SelectItem value="Bangladesh">
                              Bangladesh
                            </SelectItem>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Name Of the Guest */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="nameOfTheGuest"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Name Of the Guest
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Name Of the Guest"
                            className="h-[35px] bg-[#e9ecef]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Guest Phone Number */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="guestPhoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Guest Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Guest Phone Number"
                            className="h-[35px] bg-[#e9ecef] px-2 appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                            "
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || parseFloat(value) >= 0) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Row 4: Contact Person Phone Number */}
              <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-5">
                {/* Contact Person Phone Number */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="contactPersonPhoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="font-normal">
                          Contact Person Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Contact Person Phone Number"
                            className="h-[35px] bg-[#e9ecef] px-2 appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                            "
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || parseFloat(value) >= 0) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Search and Clear Buttons */}
              <div className="flex gap-2 mt-6">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitHandleSearch)}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-[35px]"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  onClick={handleClear}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white h-[35px]"
                >
                  Clear
                </Button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Check-In
                </Button>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Previous
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
