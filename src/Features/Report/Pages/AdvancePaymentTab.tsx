/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import {
  CURRENCY_OPTIONS,
  PAYMENT_MODES,
} from "../Components/AdvancePaymentTab/const.advance-payment-tab";

const FormSchema = z.object({
  paymentMode: z.enum(PAYMENT_MODES, "Payment Mode is required"),
  paymentFor: z.enum(CURRENCY_OPTIONS, "Currency is required"),
  paymentAmount: z.coerce
    .number({ message: "Payment Amount is required" })
    .gt(0, "Payment Amount must be greater than 0"),
  remarks: z.string().nonempty("First name is required"),
});

type FormValues = z.input<typeof FormSchema>;

const DEFAULTS: FormValues = {
  paymentMode: "" as any,
  paymentFor: "" as any,
  paymentAmount: "" as any,
  remarks: "",
};

const AdvancePaymentTab = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: DEFAULTS,
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmitHandleSave = async (values: FormValues) => {
    try {
      console.log("values", values);

      toast.success("console logged!");
      form.reset(DEFAULTS);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save");
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset(DEFAULTS);
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear");
    }
  };

  return (
    <div className="font-Roboto">
      <div className="rounded-md border border-[#E9E9E9] shadow-sm bg-white">
        {/* Top title bar */}
        <div className="w-full bg-[#f8f9fa] rounded-t-md">
          <h1 className="text-[18px] leading-6 text-[#343a40] px-4 py-2">
            Advance Payment
          </h1>
        </div>

        <div className="p-3 md:p-4 space-y-3">
          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(onSubmitHandleSave)}
            >
              {/* Top row: 3 fields */}
              <section className="rounded border border-[#dee2e6] overflow-hidden">
                <div className="bg-[#f2f2f2] px-3 py-3 grid grid-cols-12 gap-3">
                  {/* Payment Mode (left) */}
                  <div className="col-span-12 md:col-span-4">
                    <FormField
                      control={form.control}
                      name="paymentMode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[12px] text-[#495057]">
                            Payment Mode <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-[35px] w-full rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057]">
                                <SelectValue placeholder="— Please Select —" />
                              </SelectTrigger>
                              <SelectContent className="text-[13px]">
                                {PAYMENT_MODES.map((m) => (
                                  <SelectItem key={m} value={m}>
                                    {m}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Currency (middle) — uses existing paymentFor field */}
                  <div className="col-span-12 md:col-span-4">
                    <FormField
                      control={form.control}
                      name="paymentFor"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[12px] text-[#495057]">
                            Currency <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-[35px] w-full rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057]">
                                <SelectValue placeholder="— Please Select —" />
                              </SelectTrigger>
                              <SelectContent className="text-[13px]">
                                {CURRENCY_OPTIONS.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Payment Amount (right) — remove default BDT; show selected currency dynamically */}
                  <div className="col-span-12 md:col-span-4">
                    <FormField
                      control={form.control}
                      name="paymentAmount"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[12px] text-[#495057]">
                            Payment Amount{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type="number"
                                inputMode="decimal"
                                placeholder="Received Amount"
                                className="h-[35px] pr-14 rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={field.value as any}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === "" || parseFloat(value) >= 0) {
                                    field.onChange(value);
                                  }
                                }}
                              />
                            </FormControl>
                            {/* Dynamic currency tag; no default text */}
                            <FormField
                              control={form.control}
                              name="paymentFor"
                              render={({ field: currencyField }) => (
                                <>
                                  {currencyField.value ? (
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6c757d]">
                                      {currencyField.value}
                                    </span>
                                  ) : null}
                                </>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Remarks row (full width) */}
                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="remarks"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[12px] text-[#495057]">
                            Remarks
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={2}
                              placeholder=""
                              className="rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Prev/Next (no handlers) */}
              <div className="flex items-center justify-between">
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <div className="w-2" />
                  <Button
                    type="button"
                    className="bg-[#007bff] hover:bg-[#007bff]/90 text-white h-[32px] px-4 rounded-[4px]"
                  >
                    Previous
                  </Button>
                </div>
              </div>

              {/* Bottom centered Save/Clear */}
              <div className="flex justify-center gap-1">
                <Button
                  type="submit"
                  className="bg-[#28a745] hover:bg-[#28a745]/90 text-white h-[32px] px-4 rounded-[4px]"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={onSubmitHandleClear}
                  className="bg-[#ffc107] hover:bg-[#ffc107]/90 text-[#212529] h-[32px] px-4 rounded-[4px]"
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

export default AdvancePaymentTab;
