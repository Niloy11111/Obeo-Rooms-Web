import z from "zod";

export const OthersInformationSchema = z.object({
  // Section 1: Other Information
  comingFrom: z.string().optional(),
  nextDestination: z.string().optional(),
  complimentaryGuest: z.string().min(1, "Please select complimentary guest"),
  houseUse: z.string().min(1, "Please select house use"),
  isPreviouslyVisitedGuest: z.boolean().optional(),
  visitPurpose: z.string().optional(),
  roomOwner: z.string().min(1, "Please select room owner"),
  isGuestVIP: z.boolean().optional(),

  // Section 2: Departure Information
  airportDrop: z.string().min(1, "Please select airport drop"),

  // Section 3: Credit Card Information
  cardType: z.string().min(1, "Please select card type"),
  cardNumber: z.string().min(1, "Card number is required"),
  cardHolderName: z.string().min(1, "Card holder name is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  cardReference: z.string().optional(),
});
