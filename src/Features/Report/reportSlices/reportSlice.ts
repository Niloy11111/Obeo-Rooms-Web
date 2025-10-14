/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { completeFormDefaultValues } from "../Components/RoomReservation/const.room-reservation";
import { IBillTransfer, IDrop, IPickUp, IRoomDetails } from "../types/report";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
  dropOffInformation: IDrop[] | undefined;
  billTransfer?: IBillTransfer[] | undefined;
  roomDetailedInfomrations: IRoomDetails[];
  roomReservationFullData: Record<string, any>;
}

export const initialState: InitialStateTypes = {
  pickupInformation: [],
  dropOffInformation: [],
  billTransfer: [],
  roomDetailedInfomrations: [],
  roomReservationFullData: completeFormDefaultValues,
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
      state.roomReservationFullData = [];
    },
  },
});

export const {
  setBillTransfer,
  setPickupInformation,
  setDropOffInformation,
  setRoomDetailedInfomrations,
  clearRoomDetailedInfomrations,
  clearRoomReservationFullData,
  removeRoomDetailedInfomration,
  setRoomReservationFullData,
} = reportSlice.actions;

export const selectBillTransfer = (state: RootState) =>
  state.report.billTransfer;

export const selectPickupInformation = (state: RootState) =>
  state.report.pickupInformation;

export const selectDropOffInformation = (state: RootState) =>
  state.report.dropOffInformation;
export default reportSlice.reducer;
export const selectRoomReservationFullData = (state: RootState) =>
  state.report.roomReservationFullData;
export const selectRoomDetailedInfomrations = (state: RootState) =>
  state.report.roomDetailedInfomrations;
