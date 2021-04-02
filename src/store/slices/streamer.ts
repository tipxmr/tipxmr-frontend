import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface StreamerState {}
type HashedSeed = string;

interface AnimationSettings {
  color: string;
}

interface Streamer {
  _id: HashedSeed;
  name: string;
  animationSettings: AnimationSettings;
  restoreHeight: number;
}

type StreamerState = Streamer;

const slice = createSlice({
  name: "streamer",
  initialState: {} as StreamerState,
  reducers: {
    updateStreamer: (state, action: PayloadAction<Streamer>) => {
      state._id = action.payload._id;
      state.animationSettings = action.payload.animationSettings;
      state.creationDate = action.payload.creationDate;
      state.displayName = action.payload.displayName;
      state.donationStats = action.payload.donationStats;
      state.isOnline = action.payload.isOnline;
      state.isPremium = action.payload.isPremium;
      state.profilePicture = action.payload.profilePicture;
      state.restoreHeight = action.payload.restoreHeight;
      state.streamerSocketId = action.payload.streamerSocketId;
      state.stream = action.payload.stream;
      state.userName = action.payload.userName;
    },
    updateHashedSeed: (state, action: PayloadAction<HashedSeed>) => {
      state._id = action.payload;
    },
    updateAnimationSettings: (
      state,
      action: PayloadAction<AnimationSettings>
    ) => {
      state.animationSettings = action.payload;
    },
  },
});

export const { actions, reducer } = slice;
export const {
  updateStreamer,
  updateHashedSeed,
  updateAnimationSettings,
} = actions;

export default slice;
