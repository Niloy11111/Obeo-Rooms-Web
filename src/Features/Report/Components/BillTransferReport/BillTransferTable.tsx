import { ColumnDef } from "@tanstack/react-table";
import { IBillTransfer } from "../../types/report";
import { RTable } from "../shared/RTable/RTable";

const BillTransferTable = ({
  billTransfers,
}: {
  billTransfers: IBillTransfer[];
}) => {
  const billTransferColumns: ColumnDef<IBillTransfer>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.date}</span>
      ),
    },

    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.type}</span>
      ),
    },
    {
      accessorKey: "previousRegistrationId",
      header: "Previous Registration ID",
      cell: ({ row }) => <span>{row.original?.previousRegistrationId}</span>,
    },

    {
      accessorKey: "previousRoomNumber",
      header: "Previous Room Number",
      cell: ({ row }) => (
        <span className="capitalize">{row.original?.previousRoomNumber}</span>
      ),
    },

    {
      accessorKey: "transferredBillRegistrationId",
      header: "Transfered Bill Registration ID",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original?.transferredBillRegistrationId}
        </span>
      ),
    },
    {
      accessorKey: "transferredBillRoomNumber",
      header: "Transfered Bill Room Number",
      cell: ({ row }) => (
        <span className="">{row.original?.transferredBillRoomNumber}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="">{row.original?.amount}</span>,
    },

    {
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.remarks}</span>
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
