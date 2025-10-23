/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";

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
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  removeRoomDetailedInfomration,
  selectRoomDetailedInfomrations,
  setRoomDetailedInfomrations,
} from "../../reportSlices/reportSlice";
import { IRoomDetails } from "../../types/report";
import { CompleteSchema, RoomDetailsSchema } from "../../zod/room-reservation";

import { ROOM_DETAILS_KEYS } from ".././RoomReservation/const.room-reservation";
import RoomDetailsTable from "./RoomDetailsTable";

interface CompleteInformationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchema>, any, any>;
  onSubmitHandleRoomDetails: (
    data: z.infer<typeof RoomDetailsSchema>
  ) => Promise<void>;
}

const RoomDetailedInformation = ({
  form,
  onSubmitHandleRoomDetails,
}: CompleteInformationProps) => {
  const dispatch = useAppDispatch();
  const roomDetails = useAppSelector(selectRoomDetailedInfomrations);

  const handleAddRoom = async () => {
    try {
      // Get only Room Details fields, not all form values
      const roomDetailsValues: Partial<IRoomDetails> = {};
      for (const key of ROOM_DETAILS_KEYS as (keyof IRoomDetails)[]) {
        roomDetailsValues[key] = form.getValues(key as any);
      }

      console.log("roomDetailsValues ---", roomDetailsValues);
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
      dispatch(setRoomDetailedInfomrations(roomDetailsValues as IRoomDetails));
      await onSubmitHandleRoomDetails(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteRoom = () => {
    dispatch(removeRoomDetailedInfomration(0));
  };

  return (
    <div className=" border-b bg-[#f2f2f2] pb-6 mb-6">
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
                <FormLabel className="font-normal ">Room Types</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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

        {/* Right side divided into 5 columns */}
        <div className="col-span-4 grid 2xl:grid-cols-5 gap-3">
          {/* Room Quantity */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="roomQuantity"
              render={({ field }) => (
                <FormItem className="flex  flex-col">
                  <FormLabel className="font-normal ">Room Quantity</FormLabel>
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
                <FormLabel className="font-normal ">Room Number</FormLabel>
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
                <FormLabel className="font-normal ">Rack Rate</FormLabel>
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
                <FormLabel className="font-normal ">Discount Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
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
                <FormLabel className="font-normal ">Discount Amount</FormLabel>
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
                  <FormLabel className="font-normal ">VAT Amount*</FormLabel>
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
                  <FormLabel className="font-normal ">City Charge*</FormLabel>
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
                <FormLabel className="font-normal ">Check In Date</FormLabel>
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
            name="roomCheckOutDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal ">Check Out Date</FormLabel>
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
                <FormLabel className="font-normal ">Number of Night</FormLabel>
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
                  <FormLabel className="font-normal ">Service Name</FormLabel>
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
  );
};

export default RoomDetailedInformation;
