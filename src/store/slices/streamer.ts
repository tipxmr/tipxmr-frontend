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
      state = action.payload;
    },
    updateHashedSeed: (state, action: PayloadAction<HashedSeed>) => {
      state._id = action.payload;
    },
    updateAnimationSettings: (state, action: PayloadAction<AnimationSettings>) => {
      state.animationSettings = action.payload;
    },
  },
});

export const { actions, reducer } = slice;
export const { updateStreamer, updateHashedSeed, updateAnimationSettings } = actions;

export default slice;
