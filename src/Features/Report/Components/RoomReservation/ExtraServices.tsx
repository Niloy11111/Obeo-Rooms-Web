/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { CompleteSchema } from "../../zod/room-reservation";

interface CompleteInformationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchema>, any, any>;
}

const ExtraServices = ({ form }: CompleteInformationProps) => {
  return (
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
                <FormLabel className="font-normal ">Market Segment</FormLabel>
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
                    <SelectItem value="corporate">Corporate</SelectItem>
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
                <FormLabel className="font-normal ">Guest Source</FormLabel>
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
                    <SelectItem value="agent">Travel Agent</SelectItem>
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
                <FormLabel className="font-normal ">Reference</FormLabel>
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
                <FormLabel className="font-normal ">Meal Plan</FormLabel>
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
                    <SelectItem value="ep">EP - European Plan</SelectItem>
                    <SelectItem value="cp">CP - Continental Plan</SelectItem>
                    <SelectItem value="map">
                      MAP - Modified American Plan
                    </SelectItem>
                    <SelectItem value="ap">AP - American Plan</SelectItem>
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
                <FormLabel className="font-normal ">Classification</FormLabel>
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
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                <FormLabel className="font-normal ">Bookers Name</FormLabel>
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
                <FormLabel className="font-normal ">Hotel Remarks</FormLabel>
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
                <FormLabel className="font-normal ">Guest Remarks</FormLabel>
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
                <FormLabel className="font-normal ">POS Remarks</FormLabel>
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
                    Is Room Rate Show in Room Reservation Letter or Pre
                    Registration Card
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ExtraServices;
