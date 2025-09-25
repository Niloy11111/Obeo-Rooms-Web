import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./Redux/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AirportPickupDropoff from "./Features/Report/Pages/AirportPickupDropoff.tsx";
import BillAdjustmentReport from "./Features/Report/Pages/BillAdjustmentReport.tsx";
import Home from "./home/Home.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/report/airport-pickup-dropoff",
        element: <AirportPickupDropoff />,
      },
      {
        path: "/report/bill-adjustment-report",
        element: <BillAdjustmentReport />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
