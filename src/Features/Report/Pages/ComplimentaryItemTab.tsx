import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";

import { useAppDispatch } from "../../../Redux/hooks";
import { COMPLIMENTARY_ITEMS } from "../Components/ComplementaryItemTab/const.complementary-tab";
import {
  clearComplimentaryItems,
  setComplimentaryItems,
} from "../reportSlices/reportSlice";

const ALL_IDS = COMPLIMENTARY_ITEMS.map((i) => i.id);

const FormSchema = z.object({
  complimentaryItems: z.array(z.string()).default([]),
});
type FormValues = z.input<typeof FormSchema>;

const DEFAULTS: FormValues = {
  complimentaryItems: [],
};

const ComplimentaryItemTab = () => {
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: DEFAULTS,
    mode: "onSubmit",
  });

  const selected = form.watch("complimentaryItems");
  const allSelected = selected?.length === ALL_IDS.length && ALL_IDS.length > 0;

  const toggleOne = (id: string, checked: boolean | "indeterminate") => {
    const on = checked === true;
    const current = form.getValues("complimentaryItems") ?? [];
    const next = on
      ? Array.from(new Set([...current, id]))
      : current.filter((x) => x !== id);
    form.setValue("complimentaryItems", next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const toggleAll = (checked: boolean | "indeterminate") => {
    const on = checked === true;
    const next = on ? ALL_IDS : [];
    form.setValue("complimentaryItems", next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmitHandleSave = async (values: FormValues) => {
    console.log("values", values);
    try {
      const itemsWithLabels = (values.complimentaryItems ?? []).map(
        (id) => COMPLIMENTARY_ITEMS.find((i) => i.id === id)?.label ?? id
      );
      console.log("items to save", itemsWithLabels);
      dispatch(setComplimentaryItems(itemsWithLabels));
      toast.success("Saved to redux!");
      form.reset(DEFAULTS);
    } catch (error) {
      console.error("Error saving complimentary items:", error);
      toast.error("Failed to save");
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset(DEFAULTS);
      dispatch(clearComplimentaryItems());
      toast.message("Cleared complimentary items");
    } catch (error) {
      console.error("Error clearing complimentary items:", error);
      toast.error("Failed to clear");
    }
  };

  return (
    <div className="font-Roboto ">
      <div className="rounded-md border shadow-sm m-10 border-[#E9E9E9]  bg-white">
        {/* Top title bar */}
        <div className="w-full  rounded-t-md">
          <h1 className="text-xl leading-6 text-[#343a40] px-4 py-2">
            Complimentary Item
          </h1>
        </div>

        <div className="p-3 md:p-4 ">
          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(onSubmitHandleSave)}
            >
              <div className="rounded border border-[#dee2e6] p-3">
                {/* Select All */}
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id="selectAll"
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                  />
                  <label
                    htmlFor="selectAll"
                    className=" text-[#198754] cursor-pointer select-none"
                  >
                    Select All
                  </label>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="complimentaryItems"
                    render={() => (
                      <FormItem>
                        <div className="flex flex-col space-y-4">
                          {COMPLIMENTARY_ITEMS.map((item) => {
                            const checked =
                              selected?.includes(item.id) ?? false;
                            return (
                              <div
                                key={item.id}
                                className="flex items-center gap-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    id={item.id}
                                    checked={checked}
                                    onCheckedChange={(c) =>
                                      toggleOne(item.id, c)
                                    }
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={item.id}
                                  className="text-sm text-[#495057] font-normal leading-5 cursor-pointer"
                                >
                                  {item.label}
                                </FormLabel>
                              </div>
                            );
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex mb-0 items-center justify-between pt-2">
                <div className="flex-1" />
                <div className="flex items-center gap-2 ">
                  {/* Spacer */}
                  <div className="w-2" />

                  {/* Keep buttons; no handlers per instruction */}
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
              <div className="flex justify-center gap-1">
                {/* Centered Save/Clear like the previous tab */}
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

export default ComplimentaryItemTab;
