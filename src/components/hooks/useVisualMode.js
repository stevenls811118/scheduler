import { useState } from "react";

const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(prevHistory => [...prevHistory, newMode]);
      setMode(newMode);
    } else {
      setHistory(prevHistory => [...prevHistory.slice(0, -1), newMode]);
      setMode(newMode);
    }
  }

  const back = () => {
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    } else {
      setMode(history[history.length - 1]);
    }
  }
  return {mode, history, transition, back};
};

export default useVisualMode;