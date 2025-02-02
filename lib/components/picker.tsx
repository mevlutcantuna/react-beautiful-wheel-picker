import React, { useEffect } from "react";
import usePickerStore from "../store/usePicker";
import "../styles/index.css";

export interface PickerProps {
  children: React.ReactNode;
}

const Picker = ({ children }: PickerProps) => {
  const { setActive } = usePickerStore();

  useEffect(() => {
    setActive(true);
  }, []);

  return <div>{children}</div>;
};

export default Picker;
