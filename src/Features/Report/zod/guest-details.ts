import z from "zod";

export const CompleteSchemaGuestDetails = z.object({
  // Section 1: Header Fields
  personAdult: z.string().min(1, "Please enter number of adults"),
  familyGroupCouple: z.boolean().optional(),
  personChild: z.string().optional(),

  // Section 2: Individual Guest Information
  title: z.string().min(1, "Please select a title"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roomNumber: z.string().min(1, "Room number is required"),
  fullGuestName: z.string().min(1, "Full guest name is required"),

  dateOfBirth: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select date of birth",
    }),

  gender: z.string().min(1, "Please select a gender"),
  companyName: z.string().optional(),
  address: z.string().optional(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  profession: z.string().min(1, "Please select a profession"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Please select a country"),
  nationality: z.string().min(1, "Nationality is required"),
  drivingLicence: z.string().optional(),
  nationalId: z.string().optional(),

  visaNumber: z.string().optional(),
  visaIssueDate: z
    .date()
    .optional()
    .refine((val) => val === undefined || val !== undefined, {
      message: "Please select visa issue date",
    }),
  visaExpiryDate: z
    .date()
    .optional()
    .refine((val) => val === undefined || val !== undefined, {
      message: "Please select visa expiry date",
    }),

  passportNo: z.string().optional(),
  passIssueDate: z
    .date()
    .optional()
    .refine((val) => val === undefined || val !== undefined, {
      message: "Please select passport issue date",
    }),
  passExpiryDate: z
    .date()
    .optional()
    .refine((val) => val === undefined || val !== undefined, {
      message: "Please select passport expiry date",
    }),

  blockedGuest: z.boolean().optional(),
  isContactPerson: z.boolean().optional(),
  guestDocument: z.any().optional(),
});

// RoomDetailsSchemaRegistration

export const GuestDetailsSchema = CompleteSchemaGuestDetails.pick({
  title: true,
  firstName: true,
  lastName: true,
  roomNumber: true,
  fullGuestName: true,
  dateOfBirth: true,
  gender: true,
  companyName: true,
  address: true,
  email: true,
  profession: true,
  phone: true,
  city: true,
  zipCode: true,
  country: true,
  nationality: true,
  drivingLicence: true,
  nationalId: true,
  visaNumber: true,
  visaIssueDate: true,
  visaExpiryDate: true,
  passportNo: true,
  passIssueDate: true,
  passExpiryDate: true,
  blockedGuest: true,
  isContactPerson: true,
  guestDocument: true,
});
