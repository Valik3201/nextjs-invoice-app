import { useState } from "react";

export const useToggleState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggleState = () => setState((prevState) => !prevState);

  return { state, toggleState };
};
