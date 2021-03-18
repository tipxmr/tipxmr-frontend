import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";

import socketMiddleware from "./middlewares/socket";
import walletMiddleware from "./middlewares/wallet";

import balance from "./slices/balance";
import donation from "./slices/donation";
import donor from "./slices/donor";
import restoreHeight from "./slices/restore-height";
import streamer from "./slices/streamer";
import synchronisation from "./slices/synchronisation";
import transaction from "./slices/transaction";
import wallet from "./slices/wallet";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

const reducer = combineReducers({
  balance: balance.reducer,
  donation: donation.reducer,
  donor: donor.reducer,
  restoreHeight: restoreHeight.reducer,
  streamer: streamer.reducer,
  synchronisation: synchronisation.reducer,
  transaction: transaction.reducer,
  wallet: wallet.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([
      logger,
    //   epicMiddleware,
      walletMiddleware,
      socketMiddleware,
    ]),
});

// epicMiddleware.run(epic);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
