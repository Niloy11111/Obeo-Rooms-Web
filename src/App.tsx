import { Toaster } from "sonner";
import AirportPickupDropoff from "./Features/Report/Pages/AirportPickupDropoff";

function App() {
  return (
    <>
      <AirportPickupDropoff />

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
