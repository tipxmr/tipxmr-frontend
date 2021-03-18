import { createSlice } from "@reduxjs/toolkit";

interface DonationsState {}

const slice = createSlice({
  name: "donations",
  initialState: {} as DonationsState,
  reducers: {},
});

export const { actions, reducer } = slice;

export default slice;
