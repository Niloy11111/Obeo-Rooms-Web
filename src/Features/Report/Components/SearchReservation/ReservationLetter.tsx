import { ReservationData } from "../../types/search-reservation";
import { reservationData } from "./const.search-reservation";

const ReservationLetter = () => {
  const { hotel, reservation, rooms, mealPlan, guestRemarks, policy } =
    reservationData as ReservationData;

  const currency = (val: number | bigint) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
    }).format(val);

  const roomsTotal = rooms.reduce((s, r) => s + r.tariff * r.qty * r.nights, 0);

  return (
    <div className=" text-sm leading-tight ">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-wider">{hotel.name}</h1>
        <div className="text-gray-500 text-[9px] italic">{hotel.tagline}</div>
        <div className="text-[9px] mt-2">
          {hotel.addressLines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>

      {/* Reservation Letter Header */}
      <div className="mt-10  bg-gray-300 py-1.5 px-3 font-bold mb-3">
        Reservation Letter
      </div>

      {/* Reservation Info - 2 columns */}
      <div className="grid grid-cols-2 gap-8 mb-3">
        <div className="space-y-0.5">
          <div>
            <span className="font-bold">Reservation Number :</span>{" "}
            {reservation.number}{" "}
            <span className="inline-block bg-green-600 text-white px-2 py-0.5  rounded ml-1">
              {reservation.status}
            </span>
          </div>
          <div>
            <span className="font-bold">Kind Attention :</span>{" "}
            {reservation.guest.name}
          </div>
          <div>
            <span className="font-bold">Email :</span> {reservation.guest.email}
          </div>
          <div>
            <span className="font-bold">Mobile Number :</span>{" "}
            {reservation.guest.phone}
          </div>
        </div>

        <div className="space-y-0.5">
          <div>
            <span className="font-bold">Print Date :</span>{" "}
            {reservation.printDate}
          </div>
          <div>
            <span className="font-bold">Organization :</span>
          </div>
          <div>
            <span className="font-bold">Address :</span>
          </div>
          <div>
            <span className="font-bold">Reservation Creator:</span>{" "}
            {reservation.createdBy}
          </div>
          <div>
            <span className="font-bold">Reservation Created Date :</span>{" "}
            {reservation.createdAt}
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-3">
        <div className="font-bold">Subject: Room Reservation Letter</div>
        <div className="mt-0.5">
          We truly appreciate your kind patronage in choosing{" "}
          <span className="font-bold">STUDIO23</span>. Please refer to the
          details of your Reservation outlined below.
        </div>
      </div>

      {/* Reservation Details Header */}
      <div className="bg-gray-300 py-1.5 px-3 font-bold mb-3">
        Reservation Details :-
      </div>

      {/* Guest Details - 3 columns */}
      <div className="grid grid-cols-3 gap-6 mb-3">
        <div className="space-y-0.5">
          <div>
            <span className="font-bold">Guest Name:</span>{" "}
            {reservation.guest.name}
          </div>
          <div>
            <span className="font-bold">Phone:</span> {reservation.guest.phone}
          </div>
          <div>
            <span className="font-bold">Arrival Date :</span>{" "}
            {reservation.arrivalDate}
          </div>
          <div>
            <span className="font-bold">Departure Date :</span>{" "}
            {reservation.departureDate}
          </div>
        </div>

        <div className="space-y-0.5">
          <div>
            <span className="font-bold">Reservation Mode :</span>{" "}
            {reservation.reservationMode}
          </div>
          <div>
            <span className="font-bold">Room Night :</span>{" "}
            {reservation.roomNight}
          </div>
          <div>
            <span className="font-bold">Adult + Child :</span> 2 + 0 = 2
          </div>
        </div>

        <div className="space-y-0.5">
          <div>
            <span className="font-bold">Airport Pick-up :</span>{" "}
            {reservation.airportPickUp}
          </div>
          <div>
            <span className="font-bold">Flight/ETA :</span>
          </div>
          <div>
            <span className="font-bold">Airport Drop :</span>{" "}
            {reservation.airportDrop}
          </div>
          <div>
            <span className="font-bold">Flight/ETD :</span>
          </div>
        </div>
      </div>

      {/* Room Table */}
      <div className="mb-3">
        <table className=" w-full border-collapse border border-gray-400">
          <thead className="text-sm">
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 py-1 text-left font-bold">
                Room Type
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Arrival Date
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Departure Date
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Room Tariff
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Room Qty
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Room Nights
              </th>
              <th className="border border-gray-400 px-2 py-1 font-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((r, idx) => (
              <tr key={idx}>
                <td className="border border-gray-400 px-2 py-1">{r.type}</td>
                <td className="border border-gray-400 px-2 py-1 text-center">
                  {r.arrivalDate}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-center">
                  {r.departureDate}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {currency(r.tariff)}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-center">
                  {r.qty}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-center">
                  {r.nights}
                </td>
                <td className="border border-gray-400 px-2 py-1 text-right">
                  {(r.tariff * r.qty * r.nights).toLocaleString("en-BD")}
                </td>
              </tr>
            ))}

            <tr className="">
              <td colSpan={6} className="border-0 px-2 py-1"></td>
              <td className=" w-[120px] border-0 px-2 py-1">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{currency(roomsTotal)}</span>
                </div>
              </td>
            </tr>
            <tr className="  border border-t border-gray-300">
              <td colSpan={6} className="border-0 px-2 py-1"></td>
              <td className=" w-[120px] border-0 px-2 py-1">
                <div className="flex justify-between font-bold ">
                  <span>Due:</span>
                  <span>{currency(roomsTotal)}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Meal Plan */}
      <div className="bg-gray-300 py-1.5 px-3 font-bold mb-2">
        Meal Plan : {mealPlan}
      </div>

      {/* Guest Remarks */}
      <div className="bg-gray-300 py-1.5 px-3 font-bold mb-3">
        Guest Remarks : {guestRemarks}
      </div>

      {/* Policy */}
      <div className="mb-4">
        <div className="font-bold mb-1.5">Reservation Policy:</div>
        <ul className="list-disc pl-5 space-y-0.5">
          {policy?.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mb-6">
        <h1 className="text-base font-bold">With Warmest Regards</h1>
        <div className="mt-4 mb-1">----------------------------</div>
        <div className="font-bold">Al Aminul Haq</div>
      </div>

      {/* Hotel Address */}
      <div className="text-center border-t pt-3">
        <div className="font-bold mb-1">Hotel Address:</div>
        <div className="text-base">{hotel.addressLines.join(" | ")}</div>
      </div>
    </div>
  );
};

export default ReservationLetter;
