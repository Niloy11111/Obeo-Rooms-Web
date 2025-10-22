import z from "zod";

export const CompleteSchemaRegistration = z.object({
  // Section 1: Guest Details
  reservation: z.boolean().optional(),
  reservationSelect: z.string().min(1, "Please select a reservation"),

  checkInDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a check-in date",
    }),
  checkInTime: z.string().nonempty("Please select check-in time"),
  departureDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a departure date",
    }),
  departureTime: z.string().nonempty("Please select departure time"),
  totalNights: z.string().nonempty("Please enter total nights"),
  listedCompany: z.boolean().optional(),

  listedCompanySelect: z.string().min(1, "Please select a listed company"),
  currencyName: z.string().nonempty("Please select a currency"),
  conversionRate: z.string().nonempty("Please enter conversion rate"),

  // Section 2: Room Details
  roomTypes: z.string().min(1, "Please select a room type"),
  adultPerRoom: z.string().min(1, "Adult per room is required"),
  childPerRoom: z.string().min(1, "Child per room is required"),
  roomNumber: z.string().optional(),
  rackRate: z.string().min(1, "Rack rate is required"),
  discountType: z.string().min(1, "Please select a discount type"),
  discountAmount: z.string().min(1, "Discount amount is required"),
  negotiatedRate: z.string().optional(),
  serviceChargeAmount: z.string().optional(),
  serviceChargeEnabled: z.boolean().optional(),
  vatAmountValue: z.string().optional(),
  vatAmountEnabled: z.boolean().optional(),
  cityChargeValue: z.string().optional(),
  cityChargeEnabled: z.boolean().optional(),
  additionalChargesValue: z.string().optional(),
  additionalChargesEnabled: z.boolean().optional(),
  totalRoomRentAmt: z.string().optional(),

  roomCheckInDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Check in date is required",
    }),
  roomDepartureDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Departure date is required",
    }),
  numberOfNight: z.string().optional(),
  sameAsGlobalDate: z.boolean().optional(),

  // Service section (Extra Bed)
  serviceName: z.string().optional(),
  serviceFromDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a service from date",
    }),
  serviceToDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a service to date",
    }),
  totalServiceAmount: z.string().optional(),

  // Section 3: Additional Information
  marketSegment: z.string().min(1, "Market segment is required"),
  guestSource: z.string().min(1, "Guest source is required"),
  reference: z.string().min(1, "Reference is required"),
  mealPlan: z.string().min(1, "Meal plan is required"),
  posRemarks: z.string().optional(),
  hotelRemarks: z.string().optional(),
  guestRemarks: z.string().optional(),
});

export const RoomDetailsSchemaRegistration = CompleteSchemaRegistration.pick({
  roomTypes: true,
  adultPerRoom: true,
  childPerRoom: true,
  roomNumber: true,
  rackRate: true,
  discountType: true,
  discountAmount: true,
  negotiatedRate: true,
  serviceChargeAmount: true,
  serviceChargeEnabled: true,
  vatAmountValue: true,
  vatAmountEnabled: true,
  cityChargeValue: true,
  cityChargeEnabled: true,
  additionalChargesValue: true,
  additionalChargesEnabled: true,
  totalRoomRentAmt: true,
  roomCheckInDate: true,
  roomDepartureDate: true,
  numberOfNight: true,
  sameAsGlobalDate: true,
  serviceName: true,
  serviceFromDate: true,
  serviceToDate: true,
  totalServiceAmount: true,
});
