import { ColumnDef } from "@tanstack/react-table";
import { Download, Edit2, MoveDown, MoveUp, Trash2 } from "lucide-react";
import { IReservation } from "../../types/search-reservation";
import { RTable } from "../shared/RTable/RTable";

const SearchReservationTable = ({
  data,
  onEdit,
  onDelete,
  handlePrint,
  onSort,
  sortOrder,
}: {
  data?: IReservation[];
  onEdit: (row: IReservation) => void;
  onDelete: (id: number) => void;
  handlePrint: () => void;
  onSort: (order: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
}) => {
  const columns: ColumnDef<IReservation>[] = [
    {
      accessorKey: "serialNo",
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div className="block"></div>
            <div className="flex gap-5">
              <div className="">
                <h1>S/N</h1>
              </div>
              <div className="flex">
                <MoveUp
                  className={`h-4 w-4 cursor-pointer ${
                    sortOrder === "asc" ? "" : "text-gray-400"
                  }`}
                  onClick={() => onSort("asc")}
                />
                <MoveDown
                  onClick={() => onSort("desc")}
                  className={`cursor-pointer h-4 w-4 ${
                    sortOrder === "desc" ? "" : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col w-[90px]">
          <span className="text-sm truncate">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "reserveNo",
      header: "Reserv. No",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm  truncate">{row.original?.reserveNo}</span>
          <span className="text-xs text-gray-400">
            {row.original?.reserveDate}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "guestName",
      header: "Guest Name",
      cell: ({ row }) => <div className="">{row.original?.guestName}</div>,
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: ({ row }) => <div>{row.original?.mobile}</div>,
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => <div>{row.original?.company}</div>,
    },
    {
      accessorKey: "roomInfo",
      header: "Room Info",
      cell: ({ row }) => <div>{row.original?.roomInfo}</div>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => <div>{row.original?.createdBy}</div>,
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      cell: ({ row }) => <div>{row.original?.updatedBy}</div>,
    },
    {
      accessorKey: "checkIn",
      header: "Check In",
      cell: ({ row }) => <div>{row.original?.checkIn}</div>,
    },
    {
      accessorKey: "checkOut",
      header: "Check Out",
      cell: ({ row }) => <div>{row.original?.checkOut}</div>,
    },
    {
      accessorKey: "advance",
      header: "Advance",
      cell: ({ row }) => <div>{row.original?.advance ?? 0}</div>,
    },
    {
      accessorKey: "reservationStatus",
      header: "Reservation Status",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.reservationStatus}</span>
      ),
    },
    {
      accessorKey: "registrationStatus",
      header: "Registration Status",
      cell: ({ row }) => <div>{row.original?.registrationStatus}</div>,
    },
    {
      id: "action",
      header: "Action",
      accessorFn: (row) => row.id,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            {/* always show View */}

            <div className="flex gap-2">
              <button
                title="Edit"
                className="p-2 rounded bg-blue-600 text-white"
                onClick={() => onEdit(row.original)}
              >
                <Edit2 size={14} />
              </button>

              <button
                title="Delete"
                className="p-2 rounded bg-red-500 text-white"
                onClick={() => onDelete(row.original.id)}
              >
                <Trash2 size={14} />
              </button>
              <button
                title="Download"
                className="p-2 rounded bg-emerald-600 text-white"
                onClick={handlePrint}
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-5">
        <div className="flex-1 print:flex print:flex-wrap">
          <RTable
            name="searchReservation"
            columns={columns}
            data={data || []}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchReservationTable;
