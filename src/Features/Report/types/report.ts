export type TStatus = "pending" | "approved" | "rejected" | "completed";
export type TransferStatus = "pending" | "approved" | "rejected" | "cancelled";

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
export interface IBillTransfer {
  transferId: string;
  sourceInfo: {
    guestInfo: string;
    companyInfo: string;
    reservationNo: string;
  };
  destinationInfo: {
    guestInfo: string;
    companyInfo: string;
    reservationNo: string;
  };
  transferAmount: number;
  reason: string;
  status: TransferStatus;
  transferDate: string;
  processedBy: string;
}

export interface IDrop {
  _id: string;
  roomNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
}
