import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { billTransfers, pickupReservations } from "../Components/utils/repot";
import { IBillTransfer, IPickUp } from "../types/report";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
  billTransfer?: IBillTransfer[] | undefined;
}

export const initialState: InitialStateTypes = {
  pickupInformation: pickupReservations?.filter(
    (item) => item?.status !== "completed"
  ),
  billTransfer: billTransfers,
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
export default reportSlice.reducer;
