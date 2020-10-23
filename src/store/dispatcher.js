import { mergeDeepLeft, omit } from "ramda";
import { useRecoilCallback } from "recoil";
import { streamerState, walletState } from "./atom";

export default function createDispatcher() {
  /////////////////////
  // Streamer Config //
  /////////////////////

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

  /////////////////////
  ////// Wallet ///////
  /////////////////////

  const updateWallet = useRecoilCallback(({ set }) => (values) => {
    set(walletState, (oldWallet) => {
      return mergeDeepLeft(values, oldWallet);
    });
  });

  return {
    updateStreamer,
    updateRestoreHeight,
    updateHashedSeed,
    updateAnimationSettings,
  };
}
