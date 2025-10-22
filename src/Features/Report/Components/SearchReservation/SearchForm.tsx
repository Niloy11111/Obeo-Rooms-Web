/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import {
  Form,
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
import { IReservation } from "../../types/search-reservation";
import { SearchSchema } from "../../zod/search-reservation";
import { searchFormDefaultValues } from "./const.search-reservation";

type SearchFormValues = z.infer<typeof SearchSchema>;

interface SearchFormProps {
  originalData: IReservation[];
  onFilteredDataChange: (data: IReservation[]) => void;
  onResetData: (data: IReservation[]) => void;
  onPageReset: () => void;
}

const SearchForm = ({
  originalData,
  onFilteredDataChange,
  onResetData,
  onPageReset,
}: SearchFormProps) => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchFormDefaultValues,
  });

  // unique lists for select fields (company, createdBy, roomType)
  const uniqueRoomTypes = useMemo(
    () =>
      Array.from(new Set(originalData.map((d) => d.roomType).filter(Boolean))),
    [originalData]
  );
  const uniqueCompanies = useMemo(
    () =>
      Array.from(new Set(originalData.map((d) => d.company).filter(Boolean))),
    [originalData]
  );
  const uniqueCreators = useMemo(
    () =>
      Array.from(new Set(originalData.map((d) => d.createdBy).filter(Boolean))),
    [originalData]
  );

  const onSubmitHandleSearch = async (values: SearchFormValues) => {
    try {
      const filtered = originalData.filter((r) => {
        const match = (value?: string | null, q?: string) =>
          q
            ? !!value && value.toLowerCase().includes(q.toLowerCase().trim())
            : true;

        const fromOk =
          !values.fromDate ||
          (r.checkIn && r.checkIn >= format(values.fromDate, "yyyy-MM-dd"));
        const toOk =
          !values.toDate ||
          (r.checkOut && r.checkOut <= format(values.toDate, "yyyy-MM-dd"));

        return (
          match(r.roomType, values.roomType) &&
          match(r.guestName, values.guestName) &&
          match(r.contactPerson, values.contactPerson) &&
          match(r.reserveNo, values.reservationNo) &&
          match(r.company, values.companyName) &&
          match(r.guestPhone, values.guestPhone) &&
          match(r.contactPersonPhone, values.contactPersonPhone) &&
          match(r.reservationStatus, values.reservationStatus) &&
          match(r.createdBy, values.createdBy) &&
          match(r.searchOrdering, values.searchOrdering) &&
          fromOk &&
          toOk
        );
      });

      onFilteredDataChange(filtered);
      onPageReset();
    } catch (err) {
      console.error("Error submitting form:", err);
      throw err;
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      form.reset(searchFormDefaultValues as any);
      onResetData(originalData);
      onPageReset();
    } catch (err) {
      console.error("Error clearing form:", err);
      throw err;
    }
  };

  return (
    <div className="rounded-b-sm pt-4 bg-white px-5 pb-2 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandleSearch)}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex justify-between items-center gap-3">
                    <FormLabel className="w-[250px]">Room Types</FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as any}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="--- Please Select ---" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueRoomTypes.map((rt) => (
                            <SelectItem key={rt} value={rt as string}>
                              {rt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px] ">From Date</FormLabel>
                    <FormControl className="">
                      <Popover>
                        <PopoverTrigger className="w-full">
                          <div
                            className={cn(
                              "flex w-full h-[35px] rounded-[4px] bg-[#f3f4f6] items-center justify-between border border-[#E9E9E9] px-3 py-2 text-sm cursor-pointer",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "yyyy-MM-dd")
                              : ""}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="toDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">To Date</FormLabel>
                    <FormControl className="">
                      <Popover>
                        <PopoverTrigger className="w-full">
                          <div
                            className={cn(
                              "flex w-full h-[35px] rounded-[4px] bg-[#f3f4f6] items-center justify-between border border-[#E9E9E9] px-3 py-2 text-sm cursor-pointer",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "yyyy-MM-dd")
                              : ""}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reservationNo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">
                      Reservation Number
                    </FormLabel>
                    <FormControl className="">
                      <Input {...field} placeholder="Reservation Number" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">Guest Name</FormLabel>
                    <FormControl className="">
                      <Input {...field} placeholder="Guest Name" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guestPhone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]  ">Guest Phone</FormLabel>
                    <FormControl className="">
                      <Input
                        type="number"
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        inputMode="decimal"
                        {...field}
                        placeholder="Guest Phone"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">Company Name</FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as any}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Please Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueCompanies.map((c) => (
                            <SelectItem key={c} value={c as string}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">Created By</FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as any}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Please Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueCreators.map((c) => (
                            <SelectItem key={c} value={c as string}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">Contact Person</FormLabel>
                    <FormControl className="">
                      <Input
                        type="number"
                        inputMode="decimal"
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        {...field}
                        placeholder="Contact Person"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPersonPhone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">
                      Contact Person Phone
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        type="number"
                        inputMode="decimal"
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        {...field}
                        placeholder="Contact Person Phone"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reservationStatus"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]">
                      Reservation Status
                    </FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as any}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Please Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Waiting">Waiting</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="searchOrdering"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="w-[250px]  ">
                      Search Ordering
                    </FormLabel>
                    <FormControl className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as any}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Please Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASC">ASC</SelectItem>
                          <SelectItem value="DESC">DESC</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              className="bg-[#0069d9] hover:bg-[#0069d9]/90 h-[35px]"
            >
              Search
            </Button>
            <Button
              type="button"
              className="bg-[#f0ad4e] hover:bg-[#f0ad4e]/90 h-[35px]"
              onClick={onSubmitHandleClear}
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
