import z from "zod";

export const SearchTabSchema = z
  .object({
    roomTypes: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a room type",
      }),
    roomNumber: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter room number",
      }),
    registrationNumber: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter registration number",
      }),
    reservationNumber: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter reservation number",
      }),
    checkInDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select check-in date",
      }),
    companyName: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select company name",
      }),
    country: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select country",
      }),
    nameOfTheGuest: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter guest name",
      }),
    guestPhoneNumber: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter guest phone number",
      }),
    contactPersonPhoneNumber: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter contact person phone number",
      }),
  })
  .superRefine((data, ctx) => {
    const hasValue =
      data.roomTypes ||
      data.roomNumber ||
      data.registrationNumber ||
      data.reservationNumber ||
      data.checkInDate ||
      data.companyName ||
      data.country ||
      data.nameOfTheGuest ||
      data.guestPhoneNumber ||
      data.contactPersonPhoneNumber;

    // If at least one field has value, remove all field errors
    if (hasValue) {
      ctx.issues = [];
    }
  });
