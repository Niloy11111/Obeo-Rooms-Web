import { ColumnDef } from "@tanstack/react-table";
import { IPickUp } from "../types/report";
import { RTable } from "./RTable/RTable";
const BillAdjustmentTable = ({
  pickupInformation,
}: {
  pickupInformation: IPickUp[];
}) => {
  const billAdjustedColumns: ColumnDef<IPickUp>[] = [
    {
      accessorKey: "reservationNo",
      header: "Reservation No.",
      cell: ({ row }) => (
        <div className=" flex items-center max-w-max mx-auto">
          <span className="truncate">{row?.original?.reservationNo}</span>
        </div>
      ),
    },
    {
      accessorKey: "guestInfo",
      header: "Guest Information",
      cell: ({ row }) => <span>{row?.original?.guestInfo}</span>,
    },
    {
      accessorKey: "originalAmount",
      header: "Original Amount",
      cell: ({ row }) => <span>{row?.original?.originalAmount}</span>,
    },
    {
      accessorKey: "adjustedAmount",
      header: "Adjusted Amount",
      cell: ({ row }) => <span>{row.original?.adjustedAmount}</span>,
    },
    {
      accessorKey: "adjustmentType",
      header: "Adjustment Type",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.adjustmentType}</span>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.reason}</span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`capitalize font-medium ${
            row.original?.status === "pending"
              ? "text-yellow-500"
              : row.original?.status === "approved"
              ? "text-green-500"
              : row.original?.status === "rejected"
              ? "text-red-500"
              : row.original?.status === "completed"
              ? "text-blue-500"
              : "text-gray-500"
          }`}
        >
          {row.original?.status}
        </span>
      ),
    },
    {
      accessorKey: "adjustmentDate",
      header: "Adjusted Date",
      cell: ({ row }) => (
        <span className="">{row.original?.adjustmentDate}</span>
      ),
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
            columns={billAdjustedColumns}
            data={pickupInformation || []}
          />
        </div>
      </div>
    </div>
  );
};

export default BillAdjustmentTable;
