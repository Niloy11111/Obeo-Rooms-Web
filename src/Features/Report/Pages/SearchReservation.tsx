/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "../Components/SearchReservation/search-reservation.css";

import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { cn } from "../../../lib/utils";

import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { searchFormDefaultValues } from "../Components/SearchReservation/const.search-reservation";
import EditReservationModal from "../Components/SearchReservation/EditReservationModal";
import ReservationLetter from "../Components/SearchReservation/ReservationLetter";
import SearchReservationTable from "../Components/SearchReservation/SearchReservationTable";
import useSearchReservationData from "../hooks/useSearchReservationData";
import { IReservation } from "../types/search-reservation";
import { SearchSchema } from "../zod/search-reservation";

type SearchFormValues = z.infer<typeof SearchSchema>;

const SearchReservation = () => {
  const { data: fetched } = useSearchReservationData(
    "/search-reservation.json"
  );
  const ComponentPdf = useRef(null);
  const [originalData, setOriginalData] = useState<IReservation[]>([]);
  const [filteredData, setFilteredData] = useState<IReservation[]>([]);
  const [displayData, setDisplayData] = useState<IReservation[]>([]);
  const [editingItem, setEditingItem] = useState<IReservation | null>(null);

  const [showCount, setShowCount] = useState<number>(10);
  const [tableSearch, setTableSearch] = useState<string>("");

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchFormDefaultValues,
  });

  useEffect(() => {
    if (Array.isArray(fetched) && fetched.length > 0) {
      setOriginalData(fetched as IReservation[]);
      setFilteredData(fetched as IReservation[]);
      setDisplayData(fetched as IReservation[]);
    }
  }, [fetched]);

  useEffect(() => {
    (async () => {
      try {
        await handleTableSearch(tableSearch, filteredData);
      } catch {
        // swallow - already logged in handler
      }
    })();
  }, [filteredData]);

  const onSubmitHandleSearch = async (values: SearchFormValues) => {
    try {
      // single-filter approach
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

      setFilteredData(filtered);
    } catch (err) {
      console.error("Error submitting form:", err);
      throw err;
    }
  };

  const onSubmitHandleClear = async () => {
    try {
      // reset to the default values we declared above
      form.reset(searchFormDefaultValues as any);
      setFilteredData(originalData);
      setTableSearch("");
      setDisplayData(originalData);
    } catch (err) {
      console.error("Error clearing form:", err);
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (!window.confirm("Are you sure you want to delete this reservation?"))
        return;
      const next = originalData.filter((r) => r.id !== id);
      setOriginalData(next);
      setFilteredData((prev) => prev.filter((r) => r.id !== id));
      setDisplayData((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting reservation:", err);
      throw err;
    }
  };

  const handleEditSave = async (updated: IReservation) => {
    try {
      const next = originalData.map((r) => (r.id === updated.id ? updated : r));
      setOriginalData(next);
      setFilteredData((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      setDisplayData((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      setEditingItem(null);
    } catch (err) {
      console.error("Error saving edited reservation:", err);
      throw err;
    }
  };

  const handleTableSearch = async (query: string, baseData = filteredData) => {
    try {
      setTableSearch(query);
      if (!query || query.trim() === "") {
        setDisplayData(baseData);
        return;
      }

      const q = query.trim().toLowerCase();

      const searched = baseData.filter((r) => {
        // join commonly visible fields into a single string
        const haystack = [
          r.reserveNo,
          r.reserveDate,
          r.guestName,
          r.mobile,
          r.company,
          r.roomInfo,
          r.createdBy,
          r.updatedBy,
          r.checkIn,
          r.checkOut,
          r.reservationStatus,
          r.registrationStatus,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });

      setDisplayData(searched);
    } catch (err) {
      console.error("Error searching table:", err);
      throw err;
    }
  };

  // final Save / Clear at bottom of page
  const handleFinalSave = async () => {
    try {
      const snapshot = {
        filters: form.getValues(),
        results: displayData,
        timestamp: new Date().toISOString(),
      };

      toast.success("Console snapshot successfully!");

      console.log("Saving Search Snapshot:", snapshot);
      // You could dispatch to Redux or call an API here.
    } catch (err) {
      console.error("Error saving snapshot:", err);
      throw err;
    }
  };

  const handleFinalClear = async () => {
    try {
      await onSubmitHandleClear();
      console.log("Cleared search state; snapshot not saved.");
    } catch (err) {
      console.error("Error in final clear:", err);
      throw err;
    }
  };

  const generatePDF = useReactToPrint({
    content: () => ComponentPdf.current,
    documentTitle: "",
    onAfterPrint: () => toast.success("PDF generated successfully!"),
  });

  const handlePrint = () => {
    generatePDF();
  };

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

  return (
    <div className="font-Roboto ">
      <div className="shadow-sm">
        <h1 className="text-xl bg-white  border-b border-gray-200 py-2 pl-5">
          Search Reservation
        </h1>

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
                        <FormLabel className="w-[250px]  ">
                          Guest Phone
                        </FormLabel>
                        <FormControl className="">
                          <Input {...field} placeholder="Guest Phone" />
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
                        <FormLabel className="w-[250px]">
                          Company Name
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
                        <FormLabel className="w-[250px]">
                          Contact Person
                        </FormLabel>
                        <FormControl className="">
                          <Input {...field} placeholder="Contact Person" />
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
                              <SelectItem value="Confirmed">
                                Confirmed
                              </SelectItem>
                              <SelectItem value="Waiting">Waiting</SelectItem>
                              <SelectItem value="Cancelled">
                                Cancelled
                              </SelectItem>
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
      </div>

      <div className="mt-4 bg-white shadow-sm rounded-md p-4">
        <div className="flex flex-col sm:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div className="flex  sm:justify-normal justify-center items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <Select
              onValueChange={(v) => setShowCount(Number(v))}
              defaultValue={String(showCount)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="flex items-center gap-2 sm:justify-normal justify-center sm:mt-0 mt-4">
            <label className="text-sm text-gray-600">Search:</label>
            <Input
              value={tableSearch}
              onChange={(e) => handleTableSearch(e.target.value)}
              placeholder="Search table..."
              className="w-56"
            />
          </div>
        </div>
        <div
          ref={ComponentPdf}
          className="w-full hidden print:block print-full-page"
        >
          <ReservationLetter />
        </div>
        <SearchReservationTable
          data={displayData}
          onEdit={(item) => setEditingItem(item)}
          onDelete={handleDelete}
          handlePrint={handlePrint}
        />

        {/* Pagination visual */}
        <div className="mt-4 flex sm:flex-row flex-col justify-between items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {Math.min(showCount, displayData.length)} of{" "}
            {displayData.length} entries
          </div>

          <nav className="inline-flex flex-wrap items-center gap-2">
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              Previous
            </button>

            {/* small page pill list, current page visually emphasized */}
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              1
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              2
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              3
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              4
            </button>
            <span className="px-3 py-1 rounded border bg-white text-gray-700">
              ...
            </span>
            <button className="px-3 py-1 rounded border bg-white text-gray-700">
              43
            </button>

            <button className="px-3 py-1 rounded bg-[#10a37f] text-white">
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Save / Clear */}
      <div className="flex justify-center gap-3 z-50 my-10">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handleFinalSave}
        >
          Save
        </Button>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500"
          onClick={handleFinalClear}
        >
          Clear
        </Button>
      </div>

      {editingItem && (
        <EditReservationModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default SearchReservation;
