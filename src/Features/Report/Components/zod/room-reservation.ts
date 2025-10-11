import z from "zod";

export const CompleteSchema = z.object({
  // Section 1: Guest Information
  checkInDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a check-in date",
    }),
  checkInTime: z.string().nonempty("Please select check-in time"),
  checkOutDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select a check-out date",
    }),
  checkOutTime: z.string().nonempty("Please select check-out time"),
  totalNights: z.string().nonempty("Please enter total nights"),
  title: z.string().nonempty("Please select a title"),
  // status: z.string().nonempty("Please select a status"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z
    .string()
    .nonempty("Please enter a valid email")
    .email("Please enter a valid email"),
  phone: z.string().nonempty("Phone number is required"),
  country: z.string().nonempty("Please select a country"),
  reservationMode: z.string().nonempty("Please select a reservation mode"),
  currencyType: z.string().nonempty("Please select a currency type"),
  discountRate: z.string().nonempty("Please enter a discount rate"),

  // Section 2: Room Details
  roomTypes: z.string().min(1, "Please select a room type"),
  roomQuantity: z.string().min(1, "Room quantity is required"),
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

  // Dates converted to date() validation
  roomCheckInDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Check in date is required",
    }),
  roomCheckOutDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Check out date is required",
    }),
  numberOfNight: z.string().optional(),
  extraBed: z.boolean().optional(),

  // Service section (also date type)
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

  //  room detials last part
  marketSegment: z.string().min(1, "Market segment is required"),
  guestSource: z.string().min(1, "Guest source is required"),
  reference: z.string().min(1, "Reference is required"),
  mealPlan: z.string().min(1, "Meal plan is required"),
  classification: z.string().min(1, "Classification is required"),
  reservationStatus: z.string().min(1, "Reservation status is required"),
  bookersName: z.string().min(1, "Bookers name is required"),
  hotelRemarks: z.string().optional(),
  guestRemarks: z.string().optional(),
  posRemarks: z.string().optional(),
  isRoomRateShown: z.boolean().default(false),
});

// Separate schemas for section-specific validation
export const GuestInfoSchema = CompleteSchema.pick({
  checkInDate: true,
  checkInTime: true,
  checkOutDate: true,
  checkOutTime: true,
  totalNights: true,
  title: true,
  status: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  country: true,
  reservationModel: true,
  currencyType: true,
  discountRate: true,
});

export const RoomDetailsSchema = CompleteSchema.pick({
  roomTypes: true,
  roomQuantity: true,
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
  roomCheckOutDate: true,
  numberOfNight: true,
  extraBed: true,
  serviceName: true,
  serviceFromDate: true,
  serviceToDate: true,
  totalServiceAmount: true,
});
