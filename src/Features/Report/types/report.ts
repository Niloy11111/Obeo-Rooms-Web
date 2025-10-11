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

export interface IBillTransfer {
  _id: string;
  date: string;
  type: string;
  previousRegistrationId: string;
  previousRoomNumber: string;
  transferredBillRegistrationId: string;
  transferredBillRoomNumber: string;
  amount: number;
  remarks: string;
}

export interface IDrop {
  _id: string;
  roomNo: string;
  guestInfo: string;
  companyInfo: string;
  flightInfo: string;
  date: string;
}
export interface IRoomDetails {
  roomTypes: string;
  roomQuantity: string;
  adultPerRoom: string;
  childPerRoom: string;
  roomNumber: string;
  rackRate: string;
  discountType: string;
  discountAmount: string;
  negotiatedRate: string;
  serviceChargeAmount: string;
  serviceChargeEnabled: boolean;
  vatAmountValue: string;
  vatAmountEnabled: boolean;
  cityChargeValue: string;
  cityChargeEnabled: boolean;
  additionalChargesValue: string;
  additionalChargesEnabled: boolean;
  totalRoomRentAmt: string;
  roomCheckInDate: Date | undefined;
  roomCheckOutDate: Date | undefined;
  numberOfNight: string;
  extraBed: boolean;
  serviceName: string;
  serviceFromDate: Date | undefined;
  serviceToDate: Date | undefined;
  totalServiceAmount: string;
}
