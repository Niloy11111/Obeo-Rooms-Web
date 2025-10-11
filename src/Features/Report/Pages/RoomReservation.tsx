/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import { Checkbox } from "../../../components/ui/checkbox";
import {
  completeFormDefaultValues,
  ROOM_FIELDS,
} from "../Components/const.room-reservation";
import RoomDetailsTable from "../Components/RoomDetailsTable";
import {
  CompleteSchema,
  RoomDetailsSchema,
} from "../Components/zod/room-reservation";
import {
  clearRoomDetailedInfomrations,
  clearRoomReservationFullData,
  removeRoomDetailedInfomration,
  selectRoomDetailedInfomrations,
  setRoomDetailedInfomrations,
  setRoomReservationFullData,
} from "../reportSlices/reportSlice";

// Complete Schema (all fields optional for the main form, validation happens per section)
// Combined Schema - All fields in one

const RoomReservation = () => {
  const [showModal, setShowModal] = useState(false);
  const form = useForm({
    resolver: zodResolver(CompleteSchema),
    defaultValues: completeFormDefaultValues,
  });

  const dispatch = useAppDispatch();
  const roomDetails = useAppSelector(selectRoomDetailedInfomrations);

  // Handler Function
  const onSubmitHandleRoomDetails = async (
    data: z.infer<typeof RoomDetailsSchema>
  ) => {
    try {
      console.log("data -- sdfsd", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const handleAddRoom = async () => {
    try {
      // Get only Room Details fields, not all form values
      const roomDetailsValues = {
        roomTypes: form.getValues("roomTypes"),
        roomQuantity: form.getValues("roomQuantity"),
        adultPerRoom: form.getValues("adultPerRoom"),
        childPerRoom: form.getValues("childPerRoom"),
        roomNumber: form.getValues("roomNumber"),
        rackRate: form.getValues("rackRate"),
        discountType: form.getValues("discountType"),
        discountAmount: form.getValues("discountAmount"),
        negotiatedRate: form.getValues("negotiatedRate"),
        serviceChargeAmount: form.getValues("serviceChargeAmount"),
        serviceChargeEnabled: form.getValues("serviceChargeEnabled"),
        vatAmountValue: form.getValues("vatAmountValue"),
        vatAmountEnabled: form.getValues("vatAmountEnabled"),
        cityChargeValue: form.getValues("cityChargeValue"),
        cityChargeEnabled: form.getValues("cityChargeEnabled"),
        additionalChargesValue: form.getValues("additionalChargesValue"),
        additionalChargesEnabled: form.getValues("additionalChargesEnabled"),
        totalRoomRentAmt: form.getValues("totalRoomRentAmt"),
        roomCheckInDate: form.getValues("roomCheckInDate"),
        roomCheckOutDate: form.getValues("roomCheckOutDate"),
        numberOfNight: form.getValues("numberOfNight"),
        extraBed: form.getValues("extraBed"),
        serviceName: form.getValues("serviceName"),
        serviceFromDate: form.getValues("serviceFromDate"),
        serviceToDate: form.getValues("serviceToDate"),
        totalServiceAmount: form.getValues("totalServiceAmount"),
      };

      console.log("roomDetailsValues", roomDetailsValues);
      form.clearErrors();
      const result = RoomDetailsSchema.safeParse(roomDetailsValues);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof z.infer<
            typeof RoomDetailsSchema
          >;
          form.setError(fieldName, { message: issue.message });
        });
        return;
      }
      dispatch(setRoomDetailedInfomrations(roomDetailsValues));
      await onSubmitHandleRoomDetails(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteRoom = () => {
    dispatch(removeRoomDetailedInfomration(0));
  };

  const onSubmitHandleFinalSave = async (
    data: z.infer<typeof CompleteSchema>
  ) => {
    try {
      // make shallow copy, remove all keys in ROOM_FIELDS
      const copy = { ...data } as Record<string, any>;
      ROOM_FIELDS.forEach((k) => delete copy[k]);

      // attach redux roomDetails array (normalize here if needed)
      const payload = {
        ...copy,
        roomDetails: roomDetails || [],
      };

      console.log("refactored payload", payload);
      // send payload...

      dispatch(setRoomReservationFullData(payload));
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };
  const handleFinalClear = async () => {
    try {
      form.reset();
      dispatch(clearRoomDetailedInfomrations());
      dispatch(clearRoomReservationFullData());
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };
  return (
    <div className="min-h-screen  text-sm font-Inter bg-gray-100">
      <div className="p-5 ">
        <h2 className=" font-medium mb-4 text-xl">Room Reservation</h2>

        <div className="bg-white rounded shadow-sm p-5 mb-4">
          <Form {...form}>
            <form>
              {/* ========== SECTION 1: Guest Information ========== */}
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
                          <FormLabel className="font-normal ">
                            Check In Date
                          </FormLabel>
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
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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
                          <FormLabel className="invisible font-normal ">
                            Time
                          </FormLabel>
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
                            <FormLabel className="font-normal ">
                              Check Out Date
                            </FormLabel>
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
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
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
                            <FormLabel className="invisible font-normal ">
                              Time
                            </FormLabel>
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
                            <FormLabel className="font-normal ">
                              Total Nights
                            </FormLabel>
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
                          <FormLabel className="font-normal ">
                            First Name*
                          </FormLabel>
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
                          <FormLabel className="font-normal ">
                            Last Name*
                          </FormLabel>
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
                          <FormLabel className="font-normal ">
                            Country
                          </FormLabel>
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
                          <FormLabel className="font-normal ">
                            Reservation Mode
                          </FormLabel>
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
                        onClick={(e) => {
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
                            <FormLabel className="font-normal ">
                              Currency Type
                            </FormLabel>
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
                            <FormLabel className="font-normal ">
                              Discount Rate
                            </FormLabel>
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

              {/* ========== SECTION 2: Room Detailed Information ========== */}
              <div className="border-b bg-[#f2f2f2] pb-6 mb-6">
                <h3 className=" font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
                  Room Detailed Information
                </h3>

                {/* Row 1: Room Types, Room Quantity, Adult, Child, Room List, HF */}
                <div className="grid 2xl:grid-cols-8 lg:grid-cols-2 w-full gap-3">
                  {/* Left side (Room Types) */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="roomTypes"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Room Types
                          </FormLabel>
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

                  {/* Right side divided into 5 columns */}
                  <div className="col-span-4 grid 2xl:grid-cols-5 gap-3">
                    {/* Room Quantity */}
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="roomQuantity"
                        render={({ field }) => (
                          <FormItem className="flex  flex-col">
                            <FormLabel className="font-normal ">
                              Room Quantity
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1"
                                className="h-[35px] bg-[#e9ecef] appearance-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Adult Per Room */}
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="adultPerRoom"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Adult (Per Room)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1"
                                className="h-[35px] bg-[#e9ecef] appearance-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Child Per Room */}
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="childPerRoom"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Child (Per Room)
                            </FormLabel>
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

                    {/* Buttons */}
                    <div className="col-span-1 flex items-end gap-2">
                      <Button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white h-[35px] px-4"
                      >
                        Room List
                      </Button>
                      <Button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white h-[35px] px-4"
                      >
                        HF
                      </Button>
                    </div>

                    {/* Empty space */}
                    <div className="col-span-1"></div>
                  </div>
                </div>

                {/* Row 2: Rack Rate, Discount Type, Discount Amount, Negotiated Rate, Checkboxes */}
                <div className="mt-4 grid grid-cols-2 w-full gap-3">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="roomNumber"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Room Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="h-[35px] bg-[#e9ecef] appearance-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="rackRate"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Rack Rate
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
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

                {/* Row 2.1 */}
                <div className="mt-4 grid grid-cols-2 w-full gap-3">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Discount Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="-- Fixed --" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="Fixed">Fixed</SelectItem>
                              <SelectItem value="Percentage">
                                Percentage
                              </SelectItem>
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
                      name="discountAmount"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Discount Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
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

                {/* Row 2.2 */}
                <div className="grid xl:grid-cols-8 w-full gap-3 mt-5">
                  {/* col-span-4 */}
                  <div className=" col-span-4  gap-8 grid grid-cols-2">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="negotiatedRate"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Negotiated Rate
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="h-[35px] bg-[#e9ecef] appearance-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="">
                      <FormField
                        control={form.control}
                        name="serviceChargeAmount"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Service Charge*
                            </FormLabel>
                            <div className="flex    items-center ">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="h-[35px] bg-[#e9ecef] appearance-none flex-1"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border border-gray-200 h-[35px] flex items-center justify-center w-[40px]">
                                <FormField
                                  control={form.control}
                                  name="serviceChargeEnabled"
                                  render={({ field: checkboxField }) => (
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={checkboxField.value}
                                        onChange={checkboxField.onChange}
                                        className=" cursor-pointer"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className=" col-span-4  grid grid-cols-3 gap-5">
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="vatAmountValue"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              VAT Amount*
                            </FormLabel>
                            <div className="flex items-center">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="h-[35px] bg-[#e9ecef] appearance-none flex-1"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border border-gray-200 h-[35px] flex items-center justify-center w-[40px]">
                                <FormField
                                  control={form.control}
                                  name="vatAmountEnabled"
                                  render={({ field: checkboxField }) => (
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={checkboxField.value}
                                        onChange={checkboxField.onChange}
                                        className=" cursor-pointer"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="cityChargeValue"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              City Charge*
                            </FormLabel>
                            <div className="flex items-center ">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="h-[35px] bg-[#e9ecef] appearance-none flex-1"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border border-gray-200 h-[35px] flex items-center justify-center w-[40px]">
                                <FormField
                                  control={form.control}
                                  name="cityChargeEnabled"
                                  render={({ field: checkboxField }) => (
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={checkboxField.value}
                                        onChange={checkboxField.onChange}
                                        className="cursor-pointer"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="additionalChargesValue"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Additional Charges*
                            </FormLabel>
                            <div className="flex items-center ">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="h-[35px] bg-[#e9ecef] appearance-none flex-1"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border border-gray-200 h-[35px] flex items-center justify-center w-[40px]">
                                <FormField
                                  control={form.control}
                                  name="additionalChargesEnabled"
                                  render={({ field: checkboxField }) => (
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={checkboxField.value}
                                        onChange={checkboxField.onChange}
                                        className=" cursor-pointer"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2.3 */}
                <div className="grid grid-cols-2 w-full gap-3">
                  {/* Left side — takes full width of first column */}
                  <div className="w-full flex">
                    <FormField
                      control={form.control}
                      name="totalRoomRentAmt"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Total Room Rent Amt
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="h-[35px] bg-[#e9ecef] appearance-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="col-span-2 flex items-end">
                      <Button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white h-[35px] w-full"
                      >
                        RRC
                      </Button>
                    </div>
                  </div>

                  {/* Right side — empty white space */}
                  <div></div>
                </div>

                {/* Row 3: Total Room Rent, Check In Date, Check Out Date, Number of Night, Extra Bed, RRC Button */}
                <div className="mt-4 grid lg:grid-cols-12 md:grid-cols-8 w-full gap-3">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="roomCheckInDate"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Check In Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger>
                              <FormControl>
                                <div
                                  className={cn(
                                    "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
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
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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

                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="roomCheckOutDate"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Check Out Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger>
                              <FormControl>
                                <div
                                  className={cn(
                                    "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
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
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="numberOfNight"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="font-normal ">
                            Number of Night
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="h-[35px] bg-[#e9ecef] appearance-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2 flex items-center pt-6">
                    <FormField
                      control={form.control}
                      name="extraBed"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4"
                            />
                          </FormControl>
                          <FormLabel className="font-normal  mb-0">
                            Same as guest date
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Row 4: Extra Bed Section */}
                <div className="mt-4 bg-[#e4e0e1] p-3 rounded">
                  <h4 className=" font-medium mb-3">Extra Bed</h4>
                  <div className="grid xl:grid-cols-4 md:grid-cols-2  w-full gap-3">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="serviceName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-normal ">
                              Service Name
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-[35px] bg-white">
                                  <SelectValue placeholder="-- Please Select --" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-[#E9E9E9]">
                                <SelectItem value="Bed1">
                                  Extra Bed 1
                                </SelectItem>
                                <SelectItem value="Bed2">
                                  Extra Bed 2
                                </SelectItem>
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
                        name="serviceFromDate"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Service From Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger>
                                <FormControl>
                                  <div
                                    className={cn(
                                      "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
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
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
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

                    <div className="">
                      <FormField
                        control={form.control}
                        name="serviceToDate"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Service To Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger>
                                <FormControl>
                                  <div
                                    className={cn(
                                      "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer  font-Inter",
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
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
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

                    <div className="flex">
                      <FormField
                        control={form.control}
                        name="totalServiceAmount"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="font-normal ">
                              Total Service amount
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="h-[35px] bg-white appearance-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-3 flex items-end">
                        <Button
                          type="button"
                          className="bg-cyan-500 hover:bg-cyan-600 text-white h-[35px]"
                        >
                          RRC
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-5">
                  <Button
                    className="bg-[#0069d9] hover:bg-[#0069d9]/80 h-[35px] rounded-[4px] cursor-pointer font-normal"
                    type="button"
                    onClick={handleAddRoom}
                  >
                    Add
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 h-[35px] rounded-[4px] cursor-pointer font-normal text-white"
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="mt-5">
                  <RoomDetailsTable
                    roomDetails={roomDetails || []}
                    onDelete={handleDeleteRoom}
                  />
                </div>
              </div>

              {/* ========== SECTION 3: ========== */}
              <div className="border-b pt-4 bg-[#f2f2f2] pb-6 mt-8 mb-6">
                {/* Row 1: Room Types, Room Quantity, Adult, Child, Room List, HF */}
                <div className="grid  xl:grid-cols-12 lg:grid-cols-8  w-full gap-3">
                  {/* Market Segment */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="marketSegment"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Market Segment
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="--- Please Select ---" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="corporate">
                                Corporate
                              </SelectItem>
                              <SelectItem value="leisure">Leisure</SelectItem>
                              <SelectItem value="group">Group</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guest Source */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="guestSource"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Guest Source
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="--- Please Select ---" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="direct">Direct</SelectItem>
                              <SelectItem value="online">Online</SelectItem>
                              <SelectItem value="agent">
                                Travel Agent
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reference */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="reference"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Reference
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="--- Please Select ---" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="ref1">Reference 1</SelectItem>
                              <SelectItem value="ref2">Reference 2</SelectItem>
                              <SelectItem value="ref3">Reference 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid mt-4 xl:grid-cols-12 lg:grid-cols-8  w-full gap-3">
                  {/* Meal Plan */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="mealPlan"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Meal Plan
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="--- Please Select ---" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="ep">
                                EP - European Plan
                              </SelectItem>
                              <SelectItem value="cp">
                                CP - Continental Plan
                              </SelectItem>
                              <SelectItem value="map">
                                MAP - Modified American Plan
                              </SelectItem>
                              <SelectItem value="ap">
                                AP - American Plan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Classification */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="classification"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Classification
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="Regular" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="regular">Regular</SelectItem>
                              <SelectItem value="vip">VIP</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reservation Status */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="reservationStatus"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Reservation Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="Waiting" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="waiting">Waiting</SelectItem>
                              <SelectItem value="confirmed">
                                Confirmed
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className=" w-full mt-4 gap-3">
                  {/* Bookers Name */}
                  <div className="">
                    <FormField
                      control={form.control}
                      name="bookersName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Bookers Name
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-[35px] bg-[#e9ecef]">
                                <SelectValue placeholder="--- Please Select ---" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-[#E9E9E9]">
                              <SelectItem value="booker1">Booker 1</SelectItem>
                              <SelectItem value="booker2">Booker 2</SelectItem>
                              <SelectItem value="booker3">Booker 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-4 grid xl:grid-cols-12 lg:grid-cols-8 w-full gap-3">
                  {/* Hotel Remarks */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="hotelRemarks"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Hotel Remarks
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Hotel Remarks"
                              className="h-[35px] bg-[#e9ecef]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guest Remarks */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="guestRemarks"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            Guest Remarks
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Guest Remarks"
                              className="h-[35px] bg-[#e9ecef]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* POS Remarks */}
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="posRemarks"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal ">
                            POS Remarks
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="POS Remarks"
                              className="h-[35px] bg-[#e9ecef]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 w-full gap-3">
                  {/* Checkbox */}
                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="isRoomRateShown"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal ">
                              Is Room Rate Show in Room Reservation Letter or
                              Pre Registration Card
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* ========== FINAL SAVE BUTTON ========== */}
              <div className="flex justify-center gap-1 items-center">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitHandleFinalSave)}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 text-white"
                >
                  Save All
                </Button>
                <Button
                  type="button"
                  onClick={handleFinalClear}
                  className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white"
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;
