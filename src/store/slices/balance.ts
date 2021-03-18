import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BalanceState {
  unlocked: number;
  total: number;
}

const slice = createSlice({
  name: "balance",
  initialState: {
    unlocked: 0,
    total: 0,
  } as BalanceState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setUnlocked: (state, action: PayloadAction<number>) => {
      state.unlocked = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export default slice;
