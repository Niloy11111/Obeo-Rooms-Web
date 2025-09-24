import { ColumnDef } from "@tanstack/react-table";
import { IDrop, IPickUp } from "../types/report";
import { RTable } from "./RTable/RTable";
const ReportTable = ({
  pickupReservations,
  dropReservations,
}: {
  pickupReservations: IPickUp[];
  dropReservations: IDrop[];
}) => {
  const pickUpColumns: ColumnDef<IPickUp>[] = [
    {
      accessorKey: "reservationsNo",
      header: "Reservations No",
      cell: ({ row }) => (
        <div className=" flex items-center  max-w-max mx-auto">
          {/* <img src="" alt="" /> */}
          <span className="truncate ">{row?.original?.reservationNo}</span>
        </div>
      ),
    },
    {
      accessorKey: "guestInfo",
      header: "Guest Information",
      cell: ({ row }) => <span>{row?.original?.guestInfo}</span>,
    },
    {
      accessorKey: "companyInfo",
      header: "Company Info",
      cell: ({ row }) => <span>{row?.original?.companyInfo}</span>,
    },
    {
      accessorKey: "flightInfo",
      header: "Flight Info",
      cell: ({ row }) => <span>{row.original?.flightInfo}</span>,
    },
  ];

  const dropColumns: ColumnDef<IDrop>[] = [
    {
      accessorKey: "roomNo",
      header: "Room No.",
      cell: ({ row }) => (
        <div className=" flex items-center max-w-max mx-auto">
          <span className="truncate">{row?.original?.roomNo}</span>
        </div>
      ),
    },
    {
      accessorKey: "guestInfo",
      header: "Guest Information",
      cell: ({ row }) => <span>{row?.original?.guestInfo}</span>,
    },
    {
      accessorKey: "companyInfo",
      header: "Company Info",
      cell: ({ row }) => <span>{row?.original?.companyInfo}</span>,
    },
    {
      accessorKey: "flightInfo",
      header: "Flight Info",
      cell: ({ row }) => <span>{row.original?.flightInfo}</span>,
    },
  ];

  return (
    <div>
      <div
        className="flex xl:flex-row
        flex-col gap-5"
      >
        <div className="flex-1 ">
          <RTable
            name="pickup"
            columns={pickUpColumns}
            data={pickupReservations || []}
          />
        </div>
        <div className="flex-1">
          <RTable
            name="drop"
            columns={dropColumns}
            data={dropReservations || []}
          />
        </div>
      </div>

      {/* <TablePagination totalPage={2} /> */}
    </div>
  );
};

export default ReportTable;
