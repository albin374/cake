import { useState, useCallback } from 'react';

export const useUndoRedo = (initialPresent, maxHistory = 30) => {
  const [past, setPast] = useState([]);
  const [present, setPresentState] = useState(initialPresent);
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    setPast((prevPast) => {
      const previous = prevPast[prevPast.length - 1];
      const newPast = prevPast.slice(0, prevPast.length - 1);
      
      setFuture((prevFuture) => [present, ...prevFuture]);
      setPresentState(previous);
      return newPast;
    });
  }, [canUndo, present]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setFuture((prevFuture) => {
      const next = prevFuture[0];
      const newFuture = prevFuture.slice(1);

      setPast((prevPast) => [...prevPast, present]);
      setPresentState(next);
      return newFuture;
    });
  }, [canRedo, present]);

  const set = useCallback((newPresent) => {
    setPresentState((currentPresent) => {
      const resolved = typeof newPresent === 'function' ? newPresent(currentPresent) : newPresent;
      if (resolved === currentPresent) return currentPresent;

      setPast((prevPast) => {
        const updated = [...prevPast, currentPresent];
        if (updated.length > maxHistory) {
          return updated.slice(updated.length - maxHistory);
        }
        return updated;
      });
      setFuture([]);
      return resolved;
    });
  }, [maxHistory]);

  const reset = useCallback((newInitial) => {
    setPast([]);
    setFuture([]);
    setPresentState(newInitial);
  }, []);

  return {
    state: present,
    set,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    historyLength: past.length
  };
};
