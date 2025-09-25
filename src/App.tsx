import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="">
        <Outlet></Outlet>

        <Toaster position="top-right" richColors />
      </div>
    </>
  );
}

export default App;
