export type TStatus = "pending" | "approved" | "rejected" | "completed";

export interface IPickUp {
  _id: string;
  reservationNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
  originalAmount: number;
  adjustedAmount: number;
  adjustmentType: string | null;
  reason: string | null;
  status: TStatus;
  adjustmentDate: string | null;
}

export interface IDrop {
  _id: string;
  roomNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
}
