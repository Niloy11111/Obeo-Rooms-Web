import { ColumnDef } from "@tanstack/react-table";

import { IBillTransfer } from "../types/report";
import { RTable } from "./RTable/RTable";
const BillTransferTable = ({
  billTransfers,
}: {
  billTransfers: IBillTransfer[];
}) => {
  const billTransferColumns: ColumnDef<IBillTransfer>[] = [
    {
      accessorKey: "transferId",
      header: "Transfer ID",
      cell: ({ row }) => (
        <div className=" flex items-center max-w-max mx-auto">
          <span className="truncate">{row?.original?.transferId}</span>
        </div>
      ),
    },
    {
      accessorKey: "sourceInfo",
      header: "Source Information",
      cell: ({ row }) => (
        <div className="flex flex-col ">
          <p className="">{row?.original?.sourceInfo.guestInfo}</p>
          <p className="">{row?.original?.sourceInfo.companyInfo}</p>
        </div>
      ),
    },
    {
      accessorKey: "destinationInfo",
      header: "Destination Information",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="">{row?.original?.destinationInfo?.guestInfo}</p>
          <p className="">{row?.original?.destinationInfo?.companyInfo}</p>
        </div>
      ),
    },
    {
      accessorKey: "transferAmount",
      header: "Transfer Amount",
      cell: ({ row }) => <span>{row.original?.transferAmount}</span>,
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
              : row.original?.status === "cancelled"
              ? "text-orange-500"
              : "text-gray-500"
          }`}
        >
          {row.original?.status}
        </span>
      ),
    },
    {
      accessorKey: "transferDate",
      header: "	Transfer Date",
      cell: ({ row }) => <span className="">{row.original?.transferDate}</span>,
    },
    {
      accessorKey: "processedBy",
      header: "Processed By",
      cell: ({ row }) => <span className="">{row.original?.processedBy}</span>,
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
            name="billTransferReport"
            columns={billTransferColumns}
            data={billTransfers || []}
          />
        </div>
      </div>
    </div>
  );
};

export default BillTransferTable;
