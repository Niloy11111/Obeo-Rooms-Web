import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { IRoomDetails } from "../types/report";
import { RTable } from "./RTable/RTable";

const RoomDetailsTable = ({
  roomDetails,
  onDelete,
}: {
  roomDetails: IRoomDetails[];
  onDelete?: (index: number) => void;
}) => {
  const roomDetailsColumns: ColumnDef<IRoomDetails>[] = [
    {
      accessorKey: "index",
      header: "S/N",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "roomTypes",
      header: "Room Type",
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.roomTypes}</span>
      ),
    },
    {
      accessorKey: "roomQuantity",
      header: "Qty",
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.roomQuantity}</span>
      ),
    },
    {
      accessorKey: "roomNumber",
      header: "Room Number",
      cell: ({ row }) => <span>{row.original?.roomNumber}</span>,
    },
    {
      accessorKey: "adultPerRoom",
      header: "Adult",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.adultPerRoom}</span>
      ),
    },
    {
      accessorKey: "childPerRoom",
      header: "Child",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.childPerRoom}</span>
      ),
    },
    {
      accessorKey: "roomCheckInDate",
      header: "CheckIn Date",
      cell: ({ row }) => (
        <span>
          {row.original?.roomCheckInDate
            ? new Date(row.original.roomCheckInDate).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "roomCheckOutDate",
      header: "Checkout Date",
      cell: ({ row }) => (
        <span>
          {row.original?.roomCheckOutDate
            ? new Date(row.original.roomCheckOutDate).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "numberOfNight",
      header: "No. Of Night",
      cell: ({ row }) => <span>{row.original?.numberOfNight}</span>,
    },
    {
      accessorKey: "extraBed",
      header: "Extra Bed",
      cell: ({ row }) => <span>{row.original?.extraBed ? "Yes" : "No"}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete?.(row.index)}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-5">
        <div className="flex-1">
          <RTable
            name="roomDetailsReport"
            columns={roomDetailsColumns}
            data={roomDetails || []}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsTable;
