/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { completeFormDefaultValuesForGuestDetails } from "../Components/GuestDetailsTab/const.guest-details";
import { completeFormDefaultValuesForRegistration } from "../Components/RoomRegistrationTab/const.room-registration";
import { completeFormDefaultValues } from "../Components/RoomReservation/const.room-reservation";
import {
  IBillTransfer,
  IDrop,
  IGuestDetails,
  IPickUp,
  IRoomDetails,
  IRoomDetailsRegistration,
} from "../types/report";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
  dropOffInformation: IDrop[] | undefined;
  billTransfer?: IBillTransfer[] | undefined;
  roomDetailedInfomrations: IRoomDetails[];
  roomReservationFullData: Record<string, any>;
  complimentaryItems: string[];

  // Room Registration State
  roomDetailedInfomrationsForRegistration: IRoomDetailsRegistration[];
  roomRegistrationFullData: Record<string, any>;

  // Guest Details State
  guestDetailsData: IGuestDetails[];
  guestDetailsFullData: Record<string, any>;
}

export const initialState: InitialStateTypes = {
  pickupInformation: [],
  dropOffInformation: [],
  billTransfer: [],
  roomDetailedInfomrations: [],
  roomReservationFullData: completeFormDefaultValues,
  complimentaryItems: [],

  // Room Registration Initial State
  roomDetailedInfomrationsForRegistration: [],
  roomRegistrationFullData: completeFormDefaultValuesForRegistration,

  // Guest Details Initial State
  guestDetailsData: [],
  guestDetailsFullData: completeFormDefaultValuesForGuestDetails,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setPickupInformation: (
      state,
      action: PayloadAction<IPickUp[] | undefined>
    ) => {
      state.pickupInformation = action.payload;
    },
    setDropOffInformation: (
      state,
      action: PayloadAction<IDrop[] | undefined>
    ) => {
      state.dropOffInformation = action.payload;
    },
    setBillTransfer: (
      state,
      action: PayloadAction<IBillTransfer[] | undefined>
    ) => {
      state.billTransfer = action.payload;
    },

    // Room Reservation Actions
    setRoomDetailedInfomrations: (
      state,
      action: PayloadAction<IRoomDetails>
    ) => {
      state.roomDetailedInfomrations = [
        ...state.roomDetailedInfomrations,
        action.payload,
      ];
    },
    clearRoomDetailedInfomrations: (state) => {
      state.roomDetailedInfomrations = [];
    },
    removeRoomDetailedInfomration: (state, action: PayloadAction<number>) => {
      state.roomDetailedInfomrations = state.roomDetailedInfomrations.filter(
        (_, index) => index !== action.payload
      );
    },
    setRoomReservationFullData: (
      state,
      action: PayloadAction<
        Record<string, any> | typeof completeFormDefaultValues
      >
    ) => {
      state.roomReservationFullData = action.payload;
    },
    clearRoomReservationFullData: (state) => {
      state.roomReservationFullData = completeFormDefaultValues;
    },

    // Room Registration Actions
    setRoomDetailedInfomrationsForRegistration: (
      state,
      action: PayloadAction<IRoomDetailsRegistration>
    ) => {
      state.roomDetailedInfomrationsForRegistration = [
        ...state.roomDetailedInfomrationsForRegistration,
        action.payload,
      ];
    },
    clearRoomDetailedInfomrationsForRegistration: (state) => {
      state.roomDetailedInfomrationsForRegistration = [];
    },
    removeRoomDetailedInfomrationForRegistration: (
      state,
      action: PayloadAction<number>
    ) => {
      state.roomDetailedInfomrationsForRegistration =
        state.roomDetailedInfomrationsForRegistration.filter(
          (_, index) => index !== action.payload
        );
    },
    setRoomRegistrationFullData: (
      state,
      action: PayloadAction<
        Record<string, any> | typeof completeFormDefaultValuesForRegistration
      >
    ) => {
      state.roomRegistrationFullData = action.payload;
    },
    clearRoomRegistrationFullData: (state) => {
      state.roomRegistrationFullData = completeFormDefaultValuesForRegistration;
    },

    // Guest Details Actions
    setGuestDetailsData: (state, action: PayloadAction<IGuestDetails>) => {
      state.guestDetailsData = [...state.guestDetailsData, action.payload];
    },
    clearGuestDetailsData: (state) => {
      state.guestDetailsData = [];
    },
    removeGuestDetails: (state, action: PayloadAction<number>) => {
      state.guestDetailsData = state.guestDetailsData.filter(
        (_, index) => index !== action.payload
      );
    },
    setGuestDetailsFullData: (
      state,
      action: PayloadAction<
        Record<string, any> | typeof completeFormDefaultValuesForGuestDetails
      >
    ) => {
      state.guestDetailsFullData = action.payload;
    },
    clearGuestDetailsFullData: (state) => {
      state.guestDetailsFullData = completeFormDefaultValuesForGuestDetails;
    },

    // Complimentary Items Actions
    setComplimentaryItems: (state, action: PayloadAction<string[]>) => {
      state.complimentaryItems = action.payload ?? [];
    },
    clearComplimentaryItems: (state) => {
      state.complimentaryItems = [];
    },
  },
});

export const {
  setBillTransfer,
  setPickupInformation,
  setDropOffInformation,

  // Room Reservation Actions Export
  setRoomDetailedInfomrations,
  clearRoomDetailedInfomrations,
  removeRoomDetailedInfomration,
  setRoomReservationFullData,
  clearRoomReservationFullData,

  // Room Registration Actions Export
  setRoomDetailedInfomrationsForRegistration,
  clearRoomDetailedInfomrationsForRegistration,
  removeRoomDetailedInfomrationForRegistration,
  setRoomRegistrationFullData,
  clearRoomRegistrationFullData,

  // Guest Details Actions Export
  setGuestDetailsData,
  clearGuestDetailsData,
  removeGuestDetails,
  setGuestDetailsFullData,
  clearGuestDetailsFullData,

  // Complimentary Items Actions Export
  setComplimentaryItems,
  clearComplimentaryItems,
} = reportSlice.actions;

// Room Reservation Selectors
export const selectBillTransfer = (state: RootState) =>
  state.report.billTransfer;

export const selectPickupInformation = (state: RootState) =>
  state.report.pickupInformation;

export const selectDropOffInformation = (state: RootState) =>
  state.report.dropOffInformation;

export const selectRoomReservationFullData = (state: RootState) =>
  state.report.roomReservationFullData;

export const selectRoomDetailedInfomrations = (state: RootState) =>
  state.report.roomDetailedInfomrations;

// Room Registration Selectors
export const selectRoomRegistrationFullData = (state: RootState) =>
  state.report.roomRegistrationFullData;

export const selectRoomDetailedInfomrationsForRegistration = (
  state: RootState
) => state.report.roomDetailedInfomrationsForRegistration;

// Guest Details Selectors
export const selectGuestDetailsData = (state: RootState) =>
  state.report.guestDetailsData;

export const selectGuestDetailsFullData = (state: RootState) =>
  state.report.guestDetailsFullData;

// Complimentary Items Selectors
export const selectComplimentaryItems = (state: RootState) =>
  state.report.complimentaryItems;

export default reportSlice.reducer;
