import { useReducer, useCallback } from 'react';

const historyReducer = (state, action) => {
  switch (action.type) {
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      };
    }
    case 'SET': {
      const newPresent =
        typeof action.payload === 'function' ? action.payload(state.present) : action.payload;
      if (newPresent === state.present) return state;

      const max = action.maxHistory || 30;
      const newPast = [...state.past, state.present];
      if (newPast.length > max) {
        newPast.splice(0, newPast.length - max);
      }

      return {
        past: newPast,
        present: newPresent,
        future: []
      };
    }
    case 'RESET': {
      return {
        past: [],
        present: action.payload,
        future: []
      };
    }
    default:
      return state;
  }
};

export const useUndoRedo = (initialPresent, maxHistory = 30) => {
  const [history, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialPresent,
    future: []
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const set = useCallback(
    (newPresent) => {
      dispatch({ type: 'SET', payload: newPresent, maxHistory });
    },
    [maxHistory]
  );

  const reset = useCallback((newInitial) => {
    dispatch({ type: 'RESET', payload: newInitial });
  }, []);

  return {
    state: history.present,
    set,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    historyLength: history.past.length
  };
};
