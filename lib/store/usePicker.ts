import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PickerStore = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const usePickerStore = create<PickerStore>()(
  devtools(
    (set) => ({
      active: false,
      setActive: (active: boolean) => set({ active }),
    }),
    {
      name: "picker",
    },
  ),
);

export default usePickerStore;
