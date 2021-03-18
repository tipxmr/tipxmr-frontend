import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import monerojs from "../libs/monero";

type Seed = string;
type Language = string;
type WalletStatus = "idle" | "pending" | "resolved" | "rejected";

interface WalletState {
  wallet: any;
  status: WalletStatus;
}

const slice = createSlice({
  name: "wallet",
  initialState: {
    wallet: null,
    status: "idle",
  } as WalletState,
  reducers: {
    // open: (state, action: PayloadAction<Seed>) => {
    //   state = action.payload;
    // },
    // create: (state, action: PayloadAction<Language>) => {
    //   state = action.payload;
    // },
    close: (state) => {
      state.wallet = {};
    },
  },
});

export const { actions, reducer } = slice;

export default slice;
