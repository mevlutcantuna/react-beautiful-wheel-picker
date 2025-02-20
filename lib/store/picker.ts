import { createContext, useContext } from "react";

const PickerContext = createContext<boolean | undefined>(undefined);

export default PickerContext;

export const usePicker = () => {
  const context = useContext(PickerContext);
  if (!context) {
    throw new Error("usePicker must be used within a Picker");
  }
  return context;
};
