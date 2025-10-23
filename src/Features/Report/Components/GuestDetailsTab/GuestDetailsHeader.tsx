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
import { CompleteSchemaGuestDetails } from "../../zod/guest-details";

interface GuestDetailsHeaderProps {
  form: UseFormReturn<z.infer<typeof CompleteSchemaGuestDetails>, any, any>;
}

const GuestDetailsHeader = ({ form }: GuestDetailsHeaderProps) => {
  // const isFamilyGroupCouple = form.watch("familyGroupCouple");

  return (
    <div className="pb-6 mb-6 border-b">
      {/* Row 1: Person (Adult), Family/Group/Couple, Person (Child) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
        {/* Person (Adult) */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="personAdult"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Person (Adult)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Family/Group/Couple Checkbox */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="familyGroupCouple"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-normal mb-1">
                  Family/Group/Couple
                </FormLabel>
                <FormControl>
                  <div className="border border-gray-200 h-[35px] flex items-center justify-start px-3">
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
        </div>

        {/* Person (Child) */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="personChild"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Person (Child)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
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

export default GuestDetailsHeader;
