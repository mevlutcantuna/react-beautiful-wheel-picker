# React Beautiful Wheel Picker

[![npm version](https://img.shields.io/npm/v/react-beautiful-wheel-picker.svg)](https://www.npmjs.com/package/react-beautiful-wheel-picker)
[![react version](https://img.shields.io/badge/react-19.0.0-blue)](https://reactjs.org/)
[![tailwindcss version](https://img.shields.io/badge/tailwindcss-4.0.8-blue)](https://tailwindcss.com/)

A highly customizable and user-friendly wheel picker component for React applications.

Check out the live [Demo Project](https://react-beautiful-wheel-picker.vercel.app/) to see the React Beautiful Wheel Picker in action and explore its features!

![React Beautiful Wheel Picker Demo](https://github.com/mevlutcantuna/react-beautiful-wheel-picker/blob/main/screenshots/demo-1.gif)

To install the React Beautiful Wheel Picker, run the following command:

```bash
npm install react-beautiful-wheel-picker
```

## Usage

```tsx
import { Picker } from "react-beautiful-wheel-picker";

<Picker>
  <Picker.Item values={[]} />
</Picker>;
```

## Props

### Picker.Item

| Prop           | Type                   | Default    | Description                                                  |
| -------------- | ---------------------- | ---------- | ------------------------------------------------------------ |
| `values`       | `PickerItem[]`         | `[]`       | The items to display in the picker.                          |
| `defaultValue` | `any`                  | `""`       | The default value of the picker.                             |
| `onChange`     | `(value: any) => void` | `() => {}` | The callback function that is called when the value changes. |

### Picker

| Prop                         | Type              | Default | Description                                            |
| ---------------------------- | ----------------- | ------- | ------------------------------------------------------ |
| `children`                   | `React.ReactNode` | `null`  | The children of the picker.                            |
| `className`                  | `string`          | `""`    | The className of the picker.                           |
| `containerClassName`         | `string`          | `""`    | The className of the container of the picker.          |
| `selectedHighlightClassName` | `string`          | `""`    | The className of the selected highlight of the picker. |
| `overlayClassName`           | `string`          | `""`    | The className of the overlay of the picker.            |

## License

This project is licensed under the MIT License.
