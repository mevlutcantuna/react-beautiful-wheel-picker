import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { cn } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";
import { usePicker } from "../store/picker";

export interface PickerItem {
  value: string | Date | number;
  label: string;
  disabled?: boolean;
}

export interface PickerItemProps {
  values: PickerItem[];
  defaultValue: string | Date | number;
  onChange: (value: string | Date | number) => void;
  className?: string;
  containerClassName?: string;
  selectedHighlightClassName?: string;
  overlayClassName?: string;
  id?: string;
  hasOverlay?: boolean;
  overlayColor?: string;
}

const Picker = ({
  values,
  defaultValue,
  onChange,
  className,
  containerClassName,
  selectedHighlightClassName,
  overlayClassName,
  id: idProp,
  hasOverlay = true,
  overlayColor = "white",
}: PickerItemProps) => {
  const isPicker = usePicker();
  const id = idProp ?? uuidv4();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | Date | number>(
    defaultValue,
  );

  const updatedValues = useMemo(() => {
    const updatedValues = [
      { value: "empty-1", label: "empty", disabled: true },
      { value: "empty-2", label: "empty", disabled: true },
      ...values,
      { value: "empty-3", label: "empty", disabled: true },
      { value: "empty-4", label: "empty", disabled: true },
    ];
    return updatedValues;
  }, [values]);

  const onScrollEnd = useMemo(
    () => debounce((func: () => void) => func(), 100),
    [],
  );

  const getCenterValue = useCallback(
    (event: Event | React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      const scrollTop = target.scrollTop;
      const itemHeight = 32; // Assuming each item has a height of 32px
      const height = itemHeight * 5;
      const centerIndex = Math.floor(height / itemHeight / 2); // 5 items divided by 2
      return updatedValues[Math.round(scrollTop / itemHeight) + centerIndex]
        ?.value;
    },
    [updatedValues],
  );

  const getPickerElementByIndex = useCallback(
    (index: number) => {
      return document.getElementById(`wheel-picker-item-${id}-${index}`);
    },
    [id],
  );

  const handleScrollEnd = useCallback(
    (event: Event | React.UIEvent<HTMLDivElement>) => {
      const centerValue = getCenterValue(event);
      const indexOfCenterValue = updatedValues.findIndex(
        (item) => item.value === centerValue,
      );

      if (centerValue && indexOfCenterValue !== -1) {
        const selectedElement = getPickerElementByIndex(indexOfCenterValue);

        selectedElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        onChange(centerValue);
        setSelectedValue(centerValue);
      }
    },
    [getCenterValue, getPickerElementByIndex, onChange, updatedValues],
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const centerValue = getCenterValue(e);
    const indexOfCenterValue = updatedValues.findIndex(
      (item) => item.value === centerValue,
    );

    const showingFirstItem = getPickerElementByIndex(indexOfCenterValue - 2);
    const showingSecondItem = getPickerElementByIndex(indexOfCenterValue - 1);
    const showingThirdItem = getPickerElementByIndex(indexOfCenterValue);
    const showingFourthItem = getPickerElementByIndex(indexOfCenterValue + 1);
    const showingFifthItem = getPickerElementByIndex(indexOfCenterValue + 2);

    if (showingFirstItem) {
      showingFirstItem.style.transform = "rotateX(45deg) translateY(4px)";
    }

    if (showingSecondItem) {
      showingSecondItem.style.transform = "rotateX(30deg) translateY(0px)";
    }

    if (showingThirdItem) {
      showingThirdItem.style.transform = "rotateX(0deg) translateY(0px)";
    }

    if (showingFourthItem) {
      showingFourthItem.style.transform = "rotateX(-30deg) translateY(0px)";
    }

    if (showingFifthItem) {
      showingFifthItem.style.transform = "rotateX(-45deg) translateY(-4px)";
    }

    onScrollEnd(() => handleScrollEnd(e));
  };

  useEffect(() => {
    // Scroll to the value if it's not the default date
    if (!defaultValue) return;

    const indexOfValue = updatedValues.findIndex(
      (item) => item.value === defaultValue,
    );

    const element = getPickerElementByIndex(indexOfValue);

    if (element) {
      element.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, []);

  if (!isPicker) {
    return;
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div
        onScrollCapture={handleScroll}
        ref={containerRef}
        className={cn(
          "no-scrollbar flex h-40 flex-col overflow-y-scroll bg-white",
          containerClassName,
        )}
      >
        <div
          style={
            hasOverlay
              ? {
                  background: `linear-gradient(${overlayColor}, rgba(209, 213, 219, 0) 52%, rgba(209, 213, 219, 0) 0, ${overlayColor})`,
                }
              : {}
          }
          className={cn(
            "pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 h-full w-full",
            overlayClassName,
          )}
        ></div>

        {updatedValues.map((item, key) => (
          <button
            aria-selected={item.value.toString() === selectedValue.toString()}
            data-selected={item.value.toString() === selectedValue.toString()}
            data-testid={`wheel-picker-item-${id}-${key}`}
            type="button"
            disabled={item.disabled ?? false}
            id={`wheel-picker-item-${id}-${key}`}
            className={cn(
              "flex h-8 min-h-8 w-full cursor-pointer items-center justify-center px-3 text-black opacity-200 transition-[transform] duration-100",
              {
                "opacity-40":
                  item.value.toString() !== selectedValue.toString(),
              },
              className,
            )}
            key={item.value.toString()}
            onClick={(e) => {
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              setSelectedValue(item.value);
              onChange(item.value);
            }}
          >
            {item.label === "empty" ? null : item.label}
          </button>
        ))}
      </div>
      <div
        className={cn(
          "selected-highlight pointer-events-none absolute bottom-1/2 h-8 w-full translate-y-1/2 bg-gray-400 opacity-10",
          selectedHighlightClassName,
        )}
      ></div>
    </div>
  );
};

export default Picker;
