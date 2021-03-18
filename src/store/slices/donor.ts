import { createSlice } from "@reduxjs/toolkit";

interface DonorState {}

const slice = createSlice({
  name: "donor",
  initialState: {} as DonorState,
  reducers: {},
});

export const { actions, reducer } = slice;

export default slice;
