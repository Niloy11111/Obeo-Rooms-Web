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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useAppDispatch } from "../../../Redux/hooks";
import {
  clearAirportPickupDropTab,
  setAirportPickupDropTab,
} from "../reportSlices/reportSlice";

const FormSchema = z.object({
  airportPickup: z.enum(["YES", "NO"], "Airport Pickup is required"),
  airportDrop: z.enum(["YES", "NO"], "Airport Drop is required"),
});

type FormValues = z.infer<typeof FormSchema>;

const DEFAULTS: FormValues = {
  airportPickup: "NO",
  airportDrop: "NO",
};

const AirportPickupDropTab = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: DEFAULTS,
    mode: "onSubmit",
  });

  const dispatch = useAppDispatch();

  const onSubmitHandleSave = async (values: FormValues) => {
    try {
      // Page-scoped save logic
      console.log("Saving Airport Pickup/Drop:", values);
      toast.success("Saved to redux!");
      dispatch(setAirportPickupDropTab(values));

      form.reset(DEFAULTS);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save");
    }
  };

  const onSubmitHandleClear = () => {
    try {
      form.reset(DEFAULTS);
      dispatch(clearAirportPickupDropTab());
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear");
    }
  };

  return (
    <div className="font-Roboto  ">
      <div className="rounded-md border border-[#E9E9E9] shadow-sm bg-white">
        {/* Top title bar */}
        <div className="w-full bg-[#f8f9fa] rounded-t-md">
          <h1 className="text-[18px] leading-6 text-[#343a40] px-4 py-2">
            Airport Pickup/Drop
          </h1>
        </div>

        <div className="p-3 md:p-4    space-y-3">
          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(onSubmitHandleSave)}
            >
              {/* Arrival Information */}
              <section className="rounded border border-[#dee2e6] overflow-hidden">
                <div className="bg-[#343a3f] text-white text-[14px] px-3 py-2">
                  Arrival Information
                </div>
                <div className="bg-[#f2f2f2] px-3 py-3 grid grid-cols-12 items-center gap-3">
                  <div className="col-span-12 md:col-span-2">
                    <FormLabel className="text-[12px] text-[#495057]">
                      Airport Pickup<span className="text-red-500">*</span>
                    </FormLabel>
                  </div>

                  <div className="col-span-12 md:col-span-10 ">
                    <FormField
                      control={form.control}
                      name="airportPickup"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-[35px] w-full rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="text-[13px]">
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Departure Information */}
              <section className="rounded border border-[#dee2e6] overflow-hidden">
                <div className="bg-[#343a3f] text-white text-[14px] px-3 py-2">
                  Departure Information
                </div>
                <div className="bg-[#f2f2f2] px-3 py-3 grid grid-cols-12 items-center gap-3">
                  <div className="col-span-12 md:col-span-2">
                    <FormLabel className="text-[12px] text-[#495057]">
                      Airport Drop<span className="text-red-500">*</span>
                    </FormLabel>
                  </div>

                  <div className="col-span-12 md:col-span-10">
                    <FormField
                      control={form.control}
                      name="airportDrop"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-[35px] w-full rounded-[4px] bg-white border border-[#E9E9E9] text-[13px] text-[#495057]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="text-[13px]">
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </section>

              {/* Footer actions */}
              <div className="flex  mb-0  items-center justify-between ">
                <div className="flex-1" />

                <div className="flex items-center gap-2">
                  {/* Spacer */}
                  <div className="w-2" />

                  <Button
                    type="button"
                    className="bg-[#007bff] hover:bg-[#007bff]/90 text-white h-[32px] px-4 rounded-[4px]"
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#007bff] hover:bg-[#007bff]/90 text-white h-[32px] px-4 rounded-[4px]"
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-1 ">
                {/* Save / Clear centered-ish like the image */}
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

export default AirportPickupDropTab;
