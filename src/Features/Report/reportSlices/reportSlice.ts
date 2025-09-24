import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/store";
import { TQueryParam } from "../types/report";

interface InitialStateTypes {
  reportParams: TQueryParam[] | undefined;
}

export const initialState: InitialStateTypes = {
  reportParams: [],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportParams: (
      state,
      action: PayloadAction<TQueryParam[] | undefined>
    ) => {
      state.reportParams = action.payload;
    },
  },
});

export const { setReportParams } = reportSlice.actions;
export const selectReportParams = (state: RootState) =>
  state.report.reportParams;
export default reportSlice.reducer;
