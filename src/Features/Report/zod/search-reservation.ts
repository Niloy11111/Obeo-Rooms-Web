import z from "zod";

export const SearchSchema = z
  .object({
    roomType: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select a room type",
      }),
    guestName: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter guest name",
      }),
    contactPerson: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter contact person",
      }),
    reservationNo: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter reservation number",
      }),
    fromDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select from date",
      }),
    guestPhone: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter guest phone",
      }),
    contactPersonPhone: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please enter contact person phone",
      }),
    companyName: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select company name",
      }),
    toDate: z
      .date()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select to date",
      }),
    createdBy: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select created by",
      }),
    reservationStatus: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select reservation status",
      }),
    searchOrdering: z
      .string()
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select search ordering",
      }),
  })
  .superRefine((data, ctx) => {
    const hasValue =
      data.roomType ||
      data.guestName ||
      data.contactPerson ||
      data.reservationNo ||
      data.fromDate ||
      data.guestPhone ||
      data.contactPersonPhone ||
      data.companyName ||
      data.toDate ||
      data.createdBy ||
      data.reservationStatus ||
      data.searchOrdering;

    // If at least one field has value, remove all field errors
    if (hasValue) {
      ctx.issues = [];
    }

    // Validate date range
    if (data.fromDate && data.toDate && data.fromDate > data.toDate) {
      ctx.addIssue({
        code: "custom",
        message: "From date must be before or equal to To date",
        path: ["toDate"],
      });
    }
  });
