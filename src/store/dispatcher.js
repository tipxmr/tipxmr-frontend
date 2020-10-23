import { mergeDeepLeft, omit } from "ramda";
import { useRecoilCallback } from "recoil";
import { streamerState } from "./atom";

export default function createDispatcher() {
  const updateStreamer = useRecoilCallback(({ set }) => (values) => {
    set(streamerState, (oldStreamer) => {
      return mergeDeepLeft(omit(["profilePicture"], values), oldStreamer);
    });
  });

  const updateRestoreHeight = useRecoilCallback(
    ({ set }) => (restoreHeight) => {
      set(streamerState, (oldStreamer) => {
        return mergeDeepLeft({ restoreHeight }, oldStreamer);
      });
    }
  );

  const updateHashedSeed = useRecoilCallback(({ set }) => (hashedSeed) => {
    set(streamerState, (oldStreamer) => {
      return mergeDeepLeft({ hashedSeed }, oldStreamer);
    });
  });

  const updateAnimationSettings = useRecoilCallback(
    ({ set }) => (animationSettings) => {
      set(streamerState, (oldStreamer) => {
        return mergeDeepLeft(
          omit(["sound", "bgImg"], animationSettings),
          oldStreamer
        );
      });
    }
  );

  return {
    updateStreamer,
    updateRestoreHeight,
    updateHashedSeed,
    updateAnimationSettings,
  };
}
