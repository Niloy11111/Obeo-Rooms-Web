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

interface CreditCardInformationProps {
  form: UseFormReturn<z.infer<typeof OthersInformationSchema>, any, any>;
}

const CreditCardInformation = ({ form }: CreditCardInformationProps) => {
  return (
    <div className="bg-[#f2f2f2] pb-6 mb-6">
      <h3 className="font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
        Credit Card Information
      </h3>

      {/* Row 1: Card Type, Card Number, Card Holder Name */}
      <div className="grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Card Type</FormLabel>
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
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="MasterCard">MasterCard</SelectItem>
                    <SelectItem value="AmericanExpress">
                      American Express
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
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Card Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Card Number"
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
            name="cardHolderName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Card Holder Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Card Holder Name"
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

      {/* Row 2: Expiry Date, Card Reference */}
      <div className="mt-4 grid lg:grid-cols-2 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Expiry Date"
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
            name="cardReference"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Card Reference</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Card Reference"
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
    </div>
  );
};

export default CreditCardInformation;
