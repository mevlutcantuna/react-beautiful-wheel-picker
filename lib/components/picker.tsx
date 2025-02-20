import React from "react";
import PickerContext from "../store/picker";
import Item from "./picker-item";

export interface PickerProps {
  children: React.ReactNode;
}

const Picker = ({ children }: PickerProps) => {
  return (
    <PickerContext.Provider value={true}>
      <div
        className={`flex items-center ${React.Children.count(children) > 1 ? "[&>div:last-child>.selected-highlight]:rounded-l-none [&>div:last-child>.selected-highlight]:rounded-r-lg [&>div:nth-child(1)>.selected-highlight]:rounded-l-lg [&>div:nth-child(1)>.selected-highlight]:rounded-r-none" : "[&>div>.selected-highlight]:rounded-lg"}`}
      >
        {children}
      </div>
    </PickerContext.Provider>
  );
};

Picker.Item = Item;

export default Picker;
