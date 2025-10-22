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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { OthersInformationSchema } from "../../zod/others-information";

interface DepartureInformationProps {
  form: UseFormReturn<z.infer<typeof OthersInformationSchema>, any, any>;
}

const DepartureInformation = ({ form }: DepartureInformationProps) => {
  return (
    <div className="bg-[#f2f2f2] pb-6 mb-6">
      <h3 className="font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
        Departure Information
      </h3>

      {/* Airport Drop */}
      <div className="w-full">
        <FormField
          control={form.control}
          name="airportDrop"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-normal">Airport Drop</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </div>
  );
};

export default DepartureInformation;
