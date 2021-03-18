import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  donors: any[];
  qeueu: any[];
  history: any[];
}

const slice = createSlice({
  name: "transaction",
  initialState: {
    donors: [],
    qeueu: [],
    history: [],
  } as TransactionState,
  reducers: {
    appendToQueue: (state, action: PayloadAction<any>) => {
      state.qeueu.push(action.payload);
    },
    appendToHistory: (state, action: PayloadAction<any>) => {
      state.history.push(action.payload);
    },
    appendToDonors: (state, action: PayloadAction<any>) => {
      state.donors.push(action.payload);
    },
  },
});

export const { actions, reducer } = slice;

export default slice;
