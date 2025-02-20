import CalendarPicker from "./components/calendar-picker";
import SimplePicker from "./components/simple-picker";

function App() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "space-between",
        gap: "15rem",
        width: "100%",
      }}
    >
      <SimplePicker />
      <CalendarPicker />
    </div>
  );
}

export default App;
