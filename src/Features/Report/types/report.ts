/* eslint-disable @typescript-eslint/no-explicit-any */
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
  roomNumber?: string;
  rackRate: string;
  discountType: string;
  discountAmount: string;
  negotiatedRate?: string;
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

export interface IRoomDetailsRegistration {
  roomTypes: string;
  adultPerRoom: string;
  childPerRoom: string;
  roomNumber?: string;
  rackRate: string;
  discountType: string;
  discountAmount: string;
  negotiatedRate?: string;
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
  roomDepartureDate: Date | undefined;
  numberOfNight: string;
  sameAsGlobalDate: boolean;
  serviceName: string;
  serviceFromDate: Date | undefined;
  serviceToDate: Date | undefined;
  totalServiceAmount: string;
  extraBed?: boolean;
  status?: string;
}

//

export type TStatusGuestDetails =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

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
  roomNumber?: string;
  rackRate: string;
  discountType: string;
  discountAmount: string;
  negotiatedRate?: string;
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

export interface IRoomDetailsRegistration {
  roomTypes: string;
  adultPerRoom: string;
  childPerRoom: string;
  roomNumber?: string;
  rackRate: string;
  discountType: string;
  discountAmount: string;
  negotiatedRate?: string;
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
  roomDepartureDate: Date | undefined;
  numberOfNight: string;
  sameAsGlobalDate: boolean;
  serviceName: string;
  serviceFromDate: Date | undefined;
  serviceToDate: Date | undefined;
  totalServiceAmount: string;
  extraBed?: boolean;
  status?: string;
}

// New Interface for Guest Details
export interface IGuestDetails {
  title?: string;
  firstName: string;
  lastName: string;
  roomNumber?: string;
  fullGuestName?: string;
  dateOfBirth?: Date;
  gender?: string;
  companyName?: string;
  address?: string;
  email?: string;
  profession?: string;
  phone?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  nationality?: string;
  drivingLicence?: string;
  nationalId?: string;
  visaNumber?: string;
  visaIssueDate?: Date;
  visaExpiryDate?: Date;
  passportNo?: string;
  passIssueDate?: Date;
  passExpiryDate?: Date;
  blockedGuest?: boolean;
  isContactPerson?: boolean;
  guestDocument?: any;
}
