import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { IGuestDetails } from "../../types/report";
import { RTable } from "../shared/RTable/RTable";

const GuestDetailsTable = ({
  guestDetails,
  onDelete,
}: {
  guestDetails: IGuestDetails[];
  onDelete?: (index: number) => void;
}) => {
  const guestDetailsColumns: ColumnDef<IGuestDetails>[] = [
    {
      accessorKey: "index",
      header: "S/N",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "fullGuestName",
      header: "Guest Name",
      cell: ({ row }) => (
        <span className="truncate">
          {row?.original?.fullGuestName ||
            `${row?.original?.firstName || ""} ${
              row?.original?.lastName || ""
            }`.trim()}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="truncate">{row.original?.email || "-"}</span>
      ),
    },
    {
      accessorKey: "roomNumber",
      header: "Room Number",
      cell: ({ row }) => <span>{row.original?.roomNumber || "-"}</span>,
    },
    {
      accessorKey: "isContactPerson",
      header: "Is Contact Person",
      cell: ({ row }) => (
        <span>{row.original?.isContactPerson ? "Yes" : "No"}</span>
      ),
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
            name="guestDetailsReport"
            columns={guestDetailsColumns}
            data={guestDetails || []}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsTable;
