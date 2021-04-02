import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Streamer {
  displayName: string;
  userName: string;
  isOnline: boolean;
  _id: string;
  secondPrice: number;
  charPrice: number;
  charLimit: number;
  minAmount: number;
  gifsMinAmount: number;
  goalProgress: number;
  goal: number;
  goalReached: boolean;
  streamUrl: string;
  streamPlatform: string;
  streamLanguage: string;
  streamDescription: string;
  streamCategory: string;
}

interface Confirmation {
  amount: number;
}

interface Payment {
  message: string;
  confirmation: Confirmation;
}

interface DonorState {
  isLoading: boolean;
  streamer: Streamer;
  onlineStreamers: Streamer[];
  payment: Payment;
  error: Error;
  subaddress: string;
}

const slice = createSlice({
  name: "donor",
  initialState: {
    isLoading: false,
    streamer: {},
    error: {},
    payment: {
      message: ""
    } as Payment
  } as DonorState,
  reducers: {
    setStreamer: (state, action: PayloadAction<Streamer>) => {
      state.streamer = action.payload;
    },
    setSubaddress: (state, action: PayloadAction<string>) => {
      state.subaddress = action.payload;
    },
    setPayment: (state, action: PayloadAction<Payment>) => {
      state.payment = action.payload;
    },
    setOnlineStreamers: (state, action: PayloadAction<Streamer[]>) => {
      state.onlineStreamers = action.payload;
    },
    requestStreamerStart: (state) => {
      state.isLoading = true;
      // state.error = null;
    },
    requestStreamerSuccess: (state, action: PayloadAction<Streamer>) => {
      state.streamer = action.payload;
      state.isLoading = false;
    },
    requestStreamerFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    receivePayment: (state, action: PayloadAction<Payment>) => {
      state.payment = action.payload;
    }
  },
});

export const { actions, reducer } = slice;

export const requestStreamer = createAction("donor/requestStreamer", (userName: string) => {
  return {
    payload: {
      userName
    }
  }
});

export const requestSubaddress = createAction("donor/requestSubaddress", (displayName, userName, _id, donor, message) => {
  return {
    payload: {
      displayName,
      userName,
      _id,
      donor,
      message
    }
  }
});

export const requestOnlineStreamers = createAction("donor/requestOnlineStreamers");

export default slice;
