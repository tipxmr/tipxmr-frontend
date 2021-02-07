import { append, mergeDeepLeft, omit } from "ramda";
import { useRecoilCallback } from "recoil";
import {
  donationsQueueState,
  donationsHistoryState,
  streamerState,
  walletState,
  donorsInfoState,
} from "./atom";

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

  const update_id = useRecoilCallback(({ set }) => (_id) => {
    set(streamerState, (oldStreamer) => {
      return mergeDeepLeft({ _id }, oldStreamer);
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
  //////// Txs ////////
  /////////////////////

  const appendToDonationsQueue = useRecoilCallback(({ set }) => (donation) => {
    set(donationsQueueState, (donations) => {
      return append(donation, donations);
    });
  });

  const appendToDonationsHistory = useRecoilCallback(
    ({ set }) => (donation) => {
      set(donationsHistoryState, (donations) => {
        return append(donation, donations);
      });
    }
  );

  const appendToDonorsInfo = useRecoilCallback(({ set }) => (donation) => {
    set(donorsInfoState, (donations) => {
      return append(donation, donations);
    });
  });

  return {
    updateStreamer,
    updateRestoreHeight,
    update_id,
    updateAnimationSettings,
    appendToDonationsQueue,
    appendToDonationsHistory,
    appendToDonorsInfo,
  };
}
