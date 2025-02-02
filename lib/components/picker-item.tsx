import { useEffect } from "react";
import usePickerStore from "../store/usePicker";

export interface PickerItemProps {
  children: React.ReactNode;
}

const PickerItem = ({ children }: PickerItemProps) => {
  const { active } = usePickerStore();

  useEffect(() => {
    if (active) return;

    throw new Error("PickerItem must be used within a Picker component.");
  }, [active]);

  if (!active) return null;

  return <div>{children}</div>;
};

export default PickerItem;
