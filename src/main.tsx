import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Favicon from "react-favicon";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import AirportPickupDropoff from "./Features/Report/Pages/AirportPickupDropoff.tsx";
import AirportPickupDropTab from "./Features/Report/Pages/AirportPickupDropTab.tsx";
import BillAdjustmentReport from "./Features/Report/Pages/BillAdjustmentReport.tsx";
import BillTransferReport from "./Features/Report/Pages/BillTransferReport.tsx";

import AdvancePaymentTab from "./Features/Report/Pages/AdvancePaymentTab.tsx";
import ComplimentaryItemTab from "./Features/Report/Pages/ComplimentaryItemTab.tsx";
import RoomReservation from "./Features/Report/Pages/RoomReservation.tsx";
import Home from "./home/Home.tsx";
import "./index.css";
import { persistor, store } from "./Redux/store.ts";
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
      {
        path: "/report/bill-transper-report",
        element: <BillTransferReport />,
      },
      {
        path: "/report/room-reservation",
        element: <RoomReservation />,
      },
      {
        path: "/report/airport-pickup-drop-tab",
        element: <AirportPickupDropTab />,
      },
      {
        path: "/report/complementary-item",
        element: <ComplimentaryItemTab />,
      },
      {
        path: "/report/Advance-payment",
        element: <AdvancePaymentTab />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Favicon url="/favicon.png" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
