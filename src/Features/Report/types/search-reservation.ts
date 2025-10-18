export type IReservation = {
  id: number;
  reserveNo: string;
  reserveDate?: string;
  guestName?: string;
  mobile?: string;
  guestPhone?: string;
  contactPersonPhone?: string;
  company?: string;
  roomType?: string;
  contactPerson?: string;
  roomInfo?: string;
  createdBy?: string;
  updatedBy?: string;
  checkIn?: string;
  checkOut?: string;
  advance?: number;
  reservationStatus?: string;
  registrationStatus?: string;
  searchOrdering?: string;
};

type Hotel = {
  name: string;
  tagline?: string;
  addressLines: string[];
};

type ReservationGuest = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

type Reservation = {
  number: string;
  status: string;
  printDate?: string;
  createdBy?: string;
  createdAt?: string;
  guest: ReservationGuest;
  arrivalDate?: string;
  departureDate?: string;
  roomNight?: number;
  reservationMode?: string;
  airportPickUp?: string;
  airportDrop?: string;
  flightETA?: string;
  flightETD?: string;
};

type Room = {
  type: string;
  arrivalDate?: string;
  departureDate?: string;
  tariff: number;
  qty: number;
  nights: number;
};

export type ReservationData = {
  hotel: Hotel;
  reservation: Reservation;
  rooms: Room[];
  mealPlan?: string;
  guestRemarks?: string;
  policy?: string[];
};
