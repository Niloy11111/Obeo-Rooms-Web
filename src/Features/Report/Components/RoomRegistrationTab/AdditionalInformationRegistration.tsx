/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { CompleteSchemaRegistration } from "../../zod/room-registration";

interface AdditionalInformationRegistrationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchemaRegistration>, any, any>;
}

const AdditionalInformationRegistration = ({
  form,
}: AdditionalInformationRegistrationProps) => {
  return (
    <div className=" pt-4 bg-[#f2f2f2] pb-6 mt-8 mb-6">
      {/* Row 1: Market Segment, Guest Source, Reference */}
      <div className="grid xl:grid-cols-12 lg:grid-cols-8 w-full gap-3">
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="marketSegment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Market Segment</FormLabel>
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

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="guestSource"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Guest Source</FormLabel>
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

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Reference</FormLabel>
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

      {/* Row 2: Meal Plan, POS Remarks */}
      <div className="grid mt-4 xl:grid-cols-2 lg:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="mealPlan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Meal Plan</FormLabel>
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

        <div className="">
          <FormField
            control={form.control}
            name="posRemarks"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">POS Remarks</FormLabel>
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

      {/* Row 3: Hotel Remarks, Guest Remarks */}
      <div className="mt-4 grid xl:grid-cols-2 lg:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="hotelRemarks"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Hotel Remarks</FormLabel>
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

        <div className="">
          <FormField
            control={form.control}
            name="guestRemarks"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Guest Remarks</FormLabel>
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
      </div>
    </div>
  );
};

export default AdditionalInformationRegistration;
