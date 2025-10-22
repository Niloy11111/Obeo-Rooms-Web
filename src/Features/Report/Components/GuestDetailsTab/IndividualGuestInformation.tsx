/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import {
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
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  removeGuestDetails,
  selectGuestDetailsData,
  setGuestDetailsData,
} from "../../reportSlices/reportSlice";
import { IGuestDetails } from "../../types/report";
import {
  CompleteSchemaGuestDetails,
  GuestDetailsSchema,
} from "../../zod/guest-details";
import { GUEST_DETAILS_KEYS } from "./const.guest-details";
import GuestDetailsTable from "./GuestDetailsTable";

interface IndividualGuestInformationProps {
  form: UseFormReturn<z.infer<typeof CompleteSchemaGuestDetails>, any, any>;
  onSubmitHandleGuestDetails: (
    data: z.infer<typeof GuestDetailsSchema>
  ) => Promise<void>;
}

const IndividualGuestInformation = ({
  form,
  onSubmitHandleGuestDetails,
}: IndividualGuestInformationProps) => {
  const dispatch = useAppDispatch();
  const guestDetails = useAppSelector(selectGuestDetailsData);

  const handleAddGuest = async () => {
    try {
      // Get only Guest Details fields, not all form values
      const guestDetailsValues: Partial<IGuestDetails> = {};
      for (const key of GUEST_DETAILS_KEYS as (keyof IGuestDetails)[]) {
        guestDetailsValues[key] = form.getValues(key as any);
      }

      console.log("guestDetailsValues ---", guestDetailsValues);
      form.clearErrors();
      const result = GuestDetailsSchema.safeParse(guestDetailsValues);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof z.infer<
            typeof GuestDetailsSchema
          >;
          form.setError(fieldName, { message: issue.message });
        });
        return;
      }
      dispatch(setGuestDetailsData(guestDetailsValues as IGuestDetails));
      await onSubmitHandleGuestDetails(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteGuest = (index: number) => {
    dispatch(removeGuestDetails(index));
  };

  return (
    <div className="bg-[#f2f2f2] p-8 pb-6 mb-6">
      <h3 className="font-medium mb-4 bg-gray-800 text-white px-3 py-2 rounded">
        Individual Guest Information
      </h3>

      {/* Row 1: Title, First Name, Last Name, Room Number */}
      <div className="grid 2xl:grid-cols-12 lg:grid-cols-8 w-full gap-3">
        {/* Title */}
        <div className="2xl:col-span-2 lg:col-span-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Title</FormLabel>
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
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* First Name */}
        <div className="2xl:col-span-3 lg:col-span-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">First Name *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="h-[35px] bg-[#e9ecef]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Last Name */}
        <div className="2xl:col-span-3 lg:col-span-3">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Last Name *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="h-[35px] bg-[#e9ecef]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Room Number */}
        <div className="2xl:col-span-3 lg:col-span-4 flex items-end gap-2">
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Room Number *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white h-[35px] whitespace-nowrap"
          >
            Search Guest
          </Button>
        </div>
      </div>

      {/* Row 2: Full Guest Name */}
      <div className="mt-4 w-full">
        <FormField
          control={form.control}
          name="fullGuestName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="font-normal">Full Guest Name *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Full Guest Name"
                  className="h-[35px] bg-[#e9ecef]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Date of Birth, Gender */}
      <div className="mt-4 grid grid-cols-2 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter text-sm">
                            Date of Birth
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border border-[#E9E9E9] w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Gender</FormLabel>
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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 4: Company Name, Address */}
      <div className="mt-4 grid grid-cols-2 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Company Name</FormLabel>
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
                    <SelectItem value="Company1">Company 1</SelectItem>
                    <SelectItem value="Company2">Company 2</SelectItem>
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
            name="address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Address"
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

      {/* Row 5: Your email, Profession, Phone */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Your email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email"
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
            name="profession"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Profession</FormLabel>
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
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Phone"
                    className="h-[35px] bg-[#e9ecef] appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 6: City, Zip Code, Country */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="City"
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
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Zip Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Zip Code"
                    {...field}
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
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
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Country</FormLabel>
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
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 7: Nationality, Driving Licence, National ID */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Nationality</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nationality"
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
            name="drivingLicence"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Driving Licence</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Driving Licence"
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
            name="nationalId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">National ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="National ID"
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 8: Visa Number, Visa Issue Date, Visa Expiry Date */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="visaNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Visa Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Visa Number"
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
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
            name="visaIssueDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Visa Issue Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter text-sm">
                            Visa Issue Date
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border border-[#E9E9E9] w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="visaExpiryDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Visa Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter text-sm">
                            Visa Expiry Date
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border border-[#E9E9E9] w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 9: Passport No, Pass. Issue Date, Pass. Expiry Date */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="passportNo"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Passport No</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Passport No"
                    type="number"
                    className="h-[35px] bg-[#e9ecef]  appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) >= 0) {
                        field.onChange(value);
                      }
                    }}
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
            name="passIssueDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Pass. Issue Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter text-sm">
                            Pass. Issue Date
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border border-[#E9E9E9] w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="passExpiryDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Pass. Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full h-[35px] rounded-[4px] bg-[#e9ecef] items-center justify-between border border-[#E9E9E9] px-2 py-2 cursor-pointer font-Inter",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span className="font-Inter text-sm">
                            Pass. Expiry Date
                          </span>
                        )}
                        <CalendarIcon className="h-3 w-3 opacity-50" />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border border-[#E9E9E9] w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Row 10: Blocked Guest, Guest Document, Is Contact Person */}
      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-1 w-full gap-3">
        <div className="">
          <FormField
            control={form.control}
            name="blockedGuest"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 pt-8">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4"
                  />
                </FormControl>
                <FormLabel className="font-normal mb-0">
                  Blocked Guest
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="guestDocument"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="font-normal">Guest Document</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      className="h-[35px] bg-[#e9ecef] hidden"
                      id="guestDocument"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                    />
                    <label
                      htmlFor="guestDocument"
                      className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm h-[35px] flex items-center"
                    >
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {value?.name || "No file chosen"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="isContactPerson"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 pt-8">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4"
                  />
                </FormControl>
                <FormLabel className="font-normal mb-0">
                  Is Contact Person
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-5">
        <Button
          className="bg-[#0069d9] hover:bg-[#0069d9]/80 h-[35px] rounded-[4px] cursor-pointer font-normal"
          type="button"
          onClick={handleAddGuest}
        >
          ADD
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 h-[35px] rounded-[4px] cursor-pointer font-normal text-white"
          type="button"
          onClick={() => form.reset()}
        >
          Clear
        </Button>
      </div>

      {/* Guest Details Table */}
      <div className="mt-5">
        <GuestDetailsTable
          guestDetails={guestDetails || []}
          onDelete={handleDeleteGuest}
        />
      </div>
    </div>
  );
};

export default IndividualGuestInformation;
