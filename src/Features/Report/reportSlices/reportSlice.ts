import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { IBillTransfer, IDrop, IPickUp } from "../types/report";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
  dropOffInformation: IDrop[] | undefined;
  billTransfer?: IBillTransfer[] | undefined;
}

export const initialState: InitialStateTypes = {
  pickupInformation: [],
  dropOffInformation: [],
  // pickupInformation: pickupReservations?.filter(
  //   (item) => item?.status !== "completed"
  // ),
  billTransfer: [],
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
  },
});

export const { setBillTransfer } = reportSlice.actions;
export const selectBillTransfer = (state: RootState) =>
  state.report.billTransfer;
export const { setPickupInformation } = reportSlice.actions;
export const selectPickupInformation = (state: RootState) =>
  state.report.pickupInformation;
export const { setDropOffInformation } = reportSlice.actions;
export const selectDropOffInformation = (state: RootState) =>
  state.report.dropOffInformation;
export default reportSlice.reducer;
