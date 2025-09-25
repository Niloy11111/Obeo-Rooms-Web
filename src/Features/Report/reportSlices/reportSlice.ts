import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";

import { pickupReservations } from "../Components/utils/repot";
import { IPickUp } from "../types/report";

interface InitialStateTypes {
  pickupInformation: IPickUp[] | undefined;
}

export const initialState: InitialStateTypes = {
  pickupInformation: pickupReservations?.filter(
    (item) => item?.status !== "completed"
  ),
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
  },
});

export const { setPickupInformation } = reportSlice.actions;
export const selectPickupInformation = (state: RootState) =>
  state.report.pickupInformation;
export default reportSlice.reducer;
