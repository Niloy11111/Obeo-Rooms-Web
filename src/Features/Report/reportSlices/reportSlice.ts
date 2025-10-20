/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { completeFormDefaultValuesForRegistration } from "../Components/RoomRegistrationTab/const.room-registration";
import { completeFormDefaultValues } from "../Components/RoomReservation/const.room-reservation";
import {
  IBillTransfer,
  IDrop,
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

// Complimentary Items Selectors
export const selectComplimentaryItems = (state: RootState) =>
  state.report.complimentaryItems;

export default reportSlice.reducer;
