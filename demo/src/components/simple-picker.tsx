import { useState } from "react";
import { Picker } from "react-beautiful-wheel-picker";

const SimplePicker = () => {
  const [count, setCount] = useState<number>(25);

  return (
    <div>
      <Picker>
        <Picker.Item
          onChange={(value: number) => setCount(value)}
          defaultValue={count}
          values={Array.from({ length: 100 }, (_, i) => ({
            value: i,
            label: i.toString(),
          }))}
        />
      </Picker>
    </div>
  );
};

export default SimplePicker;
