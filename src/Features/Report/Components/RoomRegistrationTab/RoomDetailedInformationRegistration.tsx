/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Button } from "../../../../components/ui/button";
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
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  removeRoomDetailedInfomrationForRegistration,
  selectRoomDetailedInfomrationsForRegistration,
  setRoomDetailedInfomrationsForRegistration,
} from "../../reportSlices/reportSlice";
import { IRoomDetailsRegistration } from "../../types/report";
import {
  CompleteSchemaRegistration,
  RoomDetailsSchemaRegistration,
} from "../../zod/room-registration";
import { ROOM_DETAILS_KEYS_REGISTRATION } from "./const.room-registration";
import RoomDetailsTableRegistration from "./RoomDetailsTableRegistration";

interface RoomDetailedInformationRegistrationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchemaRegistration>, any, any>;
  onSubmitHandleRoomDetails: (
    data: z.infer<typeof RoomDetailsSchemaRegistration>
  ) => Promise<void>;
}

const RoomDetailedInformationRegistration = ({
  form,
  onSubmitHandleRoomDetails,
}: RoomDetailedInformationRegistrationProps) => {
  const dispatch = useAppDispatch();
  const roomDetails = useAppSelector(
    selectRoomDetailedInfomrationsForRegistration
  );

  const isServiceChargeEnabled = form.watch("serviceChargeEnabled");
  const isVatAmountEnabled = form.watch("vatAmountEnabled");
  const isCityChargeEnabled = form.watch("cityChargeEnabled");
  const isAdditionalChargesEnabled = form.watch("additionalChargesEnabled");

  useEffect(() => {
    if (!isServiceChargeEnabled) {
      form.setValue("serviceChargeAmount", "");
    }
    if (!isVatAmountEnabled) {
      form.setValue("vatAmountValue", "");
    }
    if (!isCityChargeEnabled) {
      form.setValue("cityChargeValue", "");
    }
    if (!isAdditionalChargesEnabled) {
      form.setValue("additionalChargesValue", "");
    }
  }, [
    isServiceChargeEnabled,
    isVatAmountEnabled,
    isCityChargeEnabled,
    isAdditionalChargesEnabled,
    form,
  ]);

  const handleAddRoom = async () => {
    try {
      // Get only Room Details fields, not all form values
      const roomDetailsValues: Partial<IRoomDetailsRegistration> = {};
      for (const key of ROOM_DETAILS_KEYS_REGISTRATION as (keyof IRoomDetailsRegistration)[]) {
        roomDetailsValues[key] = form.getValues(key as any);
      }

      console.log("roomDetailsValues ---", roomDetailsValues);
      form.clearErrors();
      const result = RoomDetailsSchemaRegistration.safeParse(roomDetailsValues);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof z.infer<
            typeof RoomDetailsSchemaRegistration
          >;
          form.setError(fieldName, { message: issue.message });
        });
        return;
      }
      dispatch(
        setRoomDetailedInfomrationsForRegistration(
          roomDetailsValues as IRoomDetailsRegistration
        )
      );
      await onSubmitHandleRoomDetails(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteRoom = () => {
    dispatch(removeRoomDetailedInfomrationForRegistration(0));
  };

  return (
    <div className=" bg-[#f2f2f2] p-8 pb-6 mb-6">
      <h3 className="font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
        Room Detailed Information
      </h3>

      {/* Row 1: Room Types, Adult (Per Room), Child (Per Room), Room List */}
      <div className="grid 2xl:grid-cols-8 lg:grid-cols-2 w-full gap-3">
        {/* Room Types */}
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="roomTypes"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Room Types</FormLabel>
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

        {/* Adult (Per Room) */}
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="adultPerRoom"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Adult (Per Room)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    className="h-[35px] bg-[#e9ecef] appearance-none
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

        {/* Child (Per Room) */}
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="childPerRoom"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Child (Per Room)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-[35px] bg-[#e9ecef] appearance-none
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

        {/* Room List Button */}
        <div
          className={`col-span-2 flex ${
            form.formState.errors.roomTypes ||
            form.formState.errors.adultPerRoom ||
            form.formState.errors.childPerRoom
              ? "items-center mb-1"
              : "items-end"
          } w-full`}
        >
          <Button
            type="button"
            className="bg-cyan-500 hover:bg-cyan-600 text-white h-[35px] w-full"
          >
            Room List
          </Button>
        </div>
      </div>

      {/* Row 2: Room Number, Rack Rate */}
      <div className="mt-4 grid grid-cols-2 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Room Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="h-[35px] bg-[#e9ecef] appearance-none
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
        <div className="">
          <FormField
            control={form.control}
            name="rackRate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Rack Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none
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

      {/* Row 3: Discount Type, Discount Amount */}
      <div className="mt-4 grid grid-cols-2 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Discount Type</FormLabel>
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
                    <SelectItem value="Percentage">Percentage</SelectItem>
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
                <FormLabel className="font-normal">Discount Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    {...field}
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none
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

      {/* Row 4: Negotiated Rate, Service Charge, VAT Amount, City Charge, Additional Charges */}
      <div className="grid xl:grid-cols-8 w-full gap-3 mt-5">
        {/* Negotiated Rate */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="negotiatedRate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Negotiated Rate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0"
                    {...field}
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  px-2 appearance-none
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

        {/* Service Charge */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="serviceChargeAmount"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Service Charge*</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      disabled={!isServiceChargeEnabled}
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] flex-1 appearance-none
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

        {/* VAT Amount */}
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="vatAmountValue"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">VAT Amount*</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isVatAmountEnabled}
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] flex-1 appearance-none
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

        {/* City Charge */}
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="cityChargeValue"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">City Charge*</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isCityChargeEnabled}
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] flex-1 appearance-none
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

        {/* Additional Charges */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="additionalChargesValue"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">
                  Additional Charges*
                </FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isAdditionalChargesEnabled}
                      type="number"
                      placeholder="0"
                      className="h-[35px] bg-[#e9ecef] flex-1 appearance-none
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
      </div>

      {/* Row 5: Total Room Rent Amt and RRC button */}
      <div className="grid grid-cols-2 w-full gap-3 mt-4">
        {/* Left side — Total Room Rent Amt */}
        <div className="w-full flex">
          <FormField
            control={form.control}
            name="totalRoomRentAmt"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">
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

      {/* Row 6: Check In Date, Departure Date, Number of Night, Same as global date checkbox */}
      <div className="mt-4 grid lg:grid-cols-12 md:grid-cols-8 w-full gap-3">
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="roomCheckInDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Check In Date *</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter">Select a Date</span>
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

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="roomDepartureDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Departure Date *</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter">
                            <span className="font-Inter">Select a Date</span>
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

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="numberOfNight"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Number of Night *</FormLabel>
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

        <div className="col-span-2 flex items-start pt-6">
          <FormField
            control={form.control}
            name="sameAsGlobalDate"
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
                <FormLabel className="font-normal mb-0">
                  Same as global date
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 7: Extra Bed Section */}
      <div className="mt-4 bg-[#e4e0e1] p-3 rounded">
        <h4 className="font-medium mb-3">Extra Bed</h4>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 w-full gap-3">
          <div className="">
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">Service Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[35px] bg-white">
                        <SelectValue placeholder="Please select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-[#E9E9E9]">
                      <SelectItem value="Bed1">Extra Bed 1</SelectItem>
                      <SelectItem value="Bed2">Extra Bed 2</SelectItem>
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
                  <FormLabel className="font-normal">
                    Service From Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <div
                          className={cn(
                            "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer font-Inter",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span className="font-Inter">
                              <span className="font-Inter">Select a Date</span>
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

          <div className="">
            <FormField
              control={form.control}
              name="serviceToDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal">Service To Date</FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <div
                          className={cn(
                            "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-3 py-2 cursor-pointer font-Inter",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span className="font-Inter">
                              <span className="font-Inter">Select a Date</span>
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

          <div className="flex">
            <FormField
              control={form.control}
              name="totalServiceAmount"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal">
                    total service amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="h-[35px] bg-white appearance-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <div
              className={`col-span-3 flex ${
                form.formState.errors.totalServiceAmount
                  ? "items-center mb-1"
                  : "items-end "
              }`}
            >
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
        <RoomDetailsTableRegistration
          roomDetails={roomDetails || []}
          onDelete={handleDeleteRoom}
        />
      </div>
    </div>
  );
};

export default RoomDetailedInformationRegistration;
