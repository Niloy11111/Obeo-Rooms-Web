/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { cn } from "../../../../lib/utils";
import { IReservation } from "../../types/search-reservation";
import EditReservationModal, { EditValues } from "./EditReservationModal";
import ReservationLetter from "./ReservationLetter";
import SearchReservationTable from "./SearchReservationTable";

interface SearchResultsTableProps {
  filteredData: IReservation[];
  originalData: IReservation[];
  onDataUpdate: (
    original: IReservation[],
    filtered: IReservation[],
    display: IReservation[]
  ) => void;
}

const SearchResultsTable = ({
  filteredData,
  originalData,
  onDataUpdate,
}: SearchResultsTableProps) => {
  const ComponentPdf = useRef(null);
  const [displayData, setDisplayData] = useState<IReservation[]>(filteredData);
  const [editingItem, setEditingItem] = useState<IReservation | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showCount, setShowCount] = useState<number>(10);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setDisplayData(filteredData);
    setTableSearch("");
    setCurrentPage(1);
    setSortOrder("asc"); // Reset sort order when data changes
  }, [filteredData]);

  useEffect(() => {
    (async () => {
      try {
        await handleTableSearch(tableSearch, filteredData);
      } catch {
        // swallow - already logged in handler
      }
    })();
  }, [filteredData]);

  const handleDelete = async (id: number) => {
    try {
      toast.warning("Are you sure you want to delete this reservation?", {
        action: {
          label: "Delete",
          onClick: () => {
            const nextOriginal = originalData.filter((r) => r.id !== id);
            const nextFiltered = filteredData.filter((r) => r.id !== id);
            const nextDisplay = displayData.filter((r) => r.id !== id);
            onDataUpdate(nextOriginal, nextFiltered, nextDisplay);
            setDisplayData(nextDisplay);
            toast.success("Reservation deleted successfully!");
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            toast.info("Deletion cancelled");
          },
        },
      });
    } catch (err) {
      console.error("Error deleting reservation:", err);
      toast.error("Failed to delete reservation");
      throw err;
    }
  };

  const handleEditSave = async (updated: EditValues) => {
    try {
      const nextOriginal = originalData.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      );
      const nextFiltered = filteredData.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      );
      const nextDisplay = displayData.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      );
      onDataUpdate(nextOriginal, nextFiltered, nextDisplay);
      setDisplayData(nextDisplay);
      setEditingItem(null);
    } catch (err) {
      console.error("Error saving edited reservation:", err);
      throw err;
    }
  };

  const handleTableSearch = async (query: string, baseData = filteredData) => {
    try {
      setTableSearch(query);
      if (!query || query.trim() === "") {
        setDisplayData(baseData);
        setCurrentPage(1);
        return;
      }

      const q = query.trim().toLowerCase();

      const searched = baseData.filter((r) => {
        const haystack = [
          r.reserveNo,
          r.reserveDate,
          r.guestName,
          r.mobile,
          r.company,
          r.roomInfo,
          r.createdBy,
          r.updatedBy,
          r.checkIn,
          r.checkOut,
          r.reservationStatus,
          r.registrationStatus,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });

      setDisplayData(searched);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error searching table:", err);
      throw err;
    }
  };

  const generatePDF = useReactToPrint({
    content: () => ComponentPdf.current,
    documentTitle: "",
    onAfterPrint: () => toast.success("PDF generated successfully!"),
  });

  const handlePrint = () => {
    generatePDF();
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  // Pagination calculations - first slice, then sort
  const totalPages = Math.ceil(displayData.length / showCount);
  const startIndex = (currentPage - 1) * showCount;
  const endIndex = startIndex + showCount;

  // Get the current page data first
  const currentPageData = displayData.slice(startIndex, endIndex);

  // Then apply sorting only to current page
  const paginatedData = [...currentPageData].sort((a, b) => {
    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleShowCountChange = (value: string) => {
    setShowCount(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="mt-4 bg-white shadow-sm rounded-md p-4">
        <div className="flex flex-col sm:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div className="flex  sm:justify-normal justify-center items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <Select
              onValueChange={handleShowCountChange}
              defaultValue={String(showCount)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="flex items-center gap-2 sm:justify-normal justify-center sm:mt-0 mt-4">
            <label className="text-sm text-gray-600">Search:</label>
            <Input
              value={tableSearch}
              onChange={(e) => handleTableSearch(e.target.value)}
              placeholder="Search table..."
              className="w-56"
            />
          </div>
        </div>
        <div
          ref={ComponentPdf}
          className="w-full hidden print:block print-full-page"
        >
          <ReservationLetter />
        </div>
        <SearchReservationTable
          data={paginatedData}
          onEdit={(item) => setEditingItem(item)}
          onDelete={handleDelete}
          handlePrint={handlePrint}
          onSort={handleSort}
          sortOrder={sortOrder}
        />

        {/* Pagination */}
        <div className="mt-4 flex sm:flex-row flex-col justify-between items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Showing {displayData.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, displayData.length)} of {displayData.length}{" "}
            entries
          </div>

          <nav className="inline-flex flex-wrap items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "px-3 py-1 rounded border text-gray-700",
                currentPage === 1
                  ? "bg-gray-100 cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-gray-50"
              )}
            >
              Previous
            </button>

            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-1 text-gray-700"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={cn(
                    "px-3 py-1 rounded border",
                    currentPage === page
                      ? "bg-[#10a37f] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={cn(
                "px-3 py-1 rounded text-white",
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-400 cursor-not-allowed opacity-50"
                  : "bg-[#10a37f] hover:bg-[#0d8c6c]"
              )}
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {editingItem && (
        <EditReservationModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default SearchResultsTable;
