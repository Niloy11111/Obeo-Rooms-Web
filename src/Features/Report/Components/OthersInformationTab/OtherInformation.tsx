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
import { OthersInformationSchema } from "../../zod/others-information";

interface OtherInformationProps {
  form: UseFormReturn<z.infer<typeof OthersInformationSchema>, any, any>;
}

const OtherInformation = ({ form }: OtherInformationProps) => {
  return (
    <div className="bg-[#f2f2f2] pb-6 mb-6">
      <h3 className="font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
        Other Information
      </h3>

      {/* Row 1: Coming From, Next Destination, Visit Purpose */}
      <div className="grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="comingFrom"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Coming From</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Coming From"
                    className="h-[35px] bg-[#e9ecef]"
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
            name="nextDestination"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Next Destination</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Next Destination"
                    className="h-[35px] bg-[#e9ecef]"
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
            name="visitPurpose"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Visit Purpose</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Visit Purpose"
                    className="h-[35px] bg-[#e9ecef]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 2: Complimentary Guest, House Use, Room Owner */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="complimentaryGuest"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">
                  Complimentary Guest
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
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
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
            name="houseUse"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">House Use</FormLabel>
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
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
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
            name="roomOwner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Room Owner</FormLabel>
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
                    <SelectItem value="Owner1">Owner 1</SelectItem>
                    <SelectItem value="Owner2">Owner 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 3: Checkboxes */}
      <div className="mt-4 grid lg:grid-cols-2 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="isPreviouslyVisitedGuest"
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
                  Is Previously Visited Guest?
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="isGuestVIP"
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
                  Is Guest VIP?
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
