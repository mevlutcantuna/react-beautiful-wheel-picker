import { useMemo, useState } from "react";
import { format, isToday } from "date-fns";
import { getDatesInRange } from "../utils";
import { Picker } from "react-beautiful-wheel-picker";

const ScrollableCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dates = useMemo(() => {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 180));
    const endDate = new Date(new Date().setDate(new Date().getDate() + 180));
    return getDatesInRange(startDate, endDate).map((date) => {
      return {
        value: format(date, "yyyy-MM-dd"),
        label: isToday(date) ? "Today" : format(date, "EEE MMM dd"),
      };
    });
  }, []);

  const hours = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => index).map((hour) => {
      return {
        value: hour.toString(),
        label: hour < 10 ? "0" + hour.toString() : hour.toString(),
      };
    });
  }, []);

  const minutes = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => index).map((minute) => {
      return {
        value: minute.toString(),
        label: (minute < 10 ? "0" : "") + minute.toString(),
      };
    });
  }, []);

  return (
    <div className={"flex w-full"}>
      <Picker>
        <Picker.Item
          className="picker-item"
          values={dates}
          defaultValue={format(date ?? new Date(), "yyyy-MM-dd")}
          onChange={(value: string) => {
            const selectedDate = new Date(value);
            const newDate = new Date(
              selectedDate.setHours(date.getHours(), date.getMinutes()),
            );
            if (!isNaN(newDate.getTime())) {
              setDate(newDate);
            }
          }}
          id="date-picker"
        />

        <Picker.Item
          className="picker-item"
          values={hours}
          defaultValue={
            date ? date.getHours().toString() : new Date().getHours().toString()
          }
          onChange={(value: string) => {
            const newDate = new Date(date.setHours(Number(value)));
            if (!isNaN(newDate.getTime())) {
              setDate(newDate);
            }
          }}
          id="hour-picker"
        />

        <Picker.Item
          className="picker-item"
          values={minutes}
          defaultValue={
            date
              ? date.getMinutes().toString()
              : new Date().getMinutes().toString()
          }
          onChange={(value: string) => {
            const newDate = new Date(date.setMinutes(Number(value)));
            if (!isNaN(newDate.getTime())) {
              setDate(newDate);
            }
          }}
          id="minute-picker"
        />
      </Picker>
    </div>
  );
};

export default ScrollableCalendar;
