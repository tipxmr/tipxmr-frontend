import { useCallback, useRef, useState } from "react";

const id = (x) => x;

export function useThunkReducer(reducer, initialArg, init = id) {
  const [internalState, setInternalState] = useState(init(initialArg));

  const state = useRef(internalState);
  const getState = useCallback(() => state.current, [state]);
  const setState = useCallback(
    (nextState) => {
      state.current = nextState;
      setInternalState(nextState);
    },
    [state, setInternalState]
  );

  const reduce = useCallback(
    (action) => {
      return reducer(getState(), action);
    },
    [reducer, getState]
  );

  const dispatch = useCallback(
    (action) => {
      return typeof action === "function"
        ? action(dispatch, getState)
        : setState(reduce(action));
    },
    [getState, setState, reduce]
  );

  return [internalState, dispatch];
}

export default useThunkReducer;
