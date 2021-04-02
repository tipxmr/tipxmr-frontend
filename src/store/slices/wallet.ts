import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import monerojs from "../libs/monero";

type Seed = string;
type Language = string;
type WalletStatus = "idle" | "pending" | "resolved" | "rejected";

interface WalletState {
  seed: Seed;
  wallet: any;
  status: WalletStatus;
  isOpen: boolean;
  // subaddress: string;
}

const slice = createSlice({
  name: "wallet",
  initialState: {
    wallet: {},
    status: "idle",
    isOpen: false
  } as WalletState,
  reducers: {
    setSeed: (state, action: PayloadAction<Seed>) => {
      state.seed = action.payload;
    },
    setWallet: (state, action: PayloadAction<any>) => {
      state.wallet = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    // setSubaddress: (state, action: PayloadAction<string>) => {
    //   state.subaddress = action.payload;
    // },
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
