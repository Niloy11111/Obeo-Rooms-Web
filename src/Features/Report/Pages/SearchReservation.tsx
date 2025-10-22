import { useEffect, useState } from "react";

import "../Components/SearchReservation/search-reservation.css";

import { Button } from "../../../components/ui/button";

import { toast } from "sonner";
import SearchForm from "../Components/SearchReservation/SearchForm";
import SearchResultsTable from "../Components/SearchReservation/SearchResultsTable";
import useSearchReservationData from "../hooks/useSearchReservationData";
import { IReservation } from "../types/search-reservation";

const SearchReservation = () => {
  const { data: fetched } = useSearchReservationData(
    "/search-reservation.json"
  );
  const [originalData, setOriginalData] = useState<IReservation[]>([]);
  const [filteredData, setFilteredData] = useState<IReservation[]>([]);
  const [displayData, setDisplayData] = useState<IReservation[]>([]);

  useEffect(() => {
    if (Array.isArray(fetched) && fetched.length > 0) {
      setOriginalData(fetched as IReservation[]);
      setFilteredData(fetched as IReservation[]);
      setDisplayData(fetched as IReservation[]);
    }
  }, [fetched]);

  const handleDataUpdate = (
    original: IReservation[],
    filtered: IReservation[],
    display: IReservation[]
  ) => {
    setOriginalData(original);
    setFilteredData(filtered);
    setDisplayData(display);
  };

  const handleFilteredDataChange = (data: IReservation[]) => {
    setFilteredData(data);
  };

  const handleResetData = (data: IReservation[]) => {
    setFilteredData(data);
    setDisplayData(data);
  };

  const handlePageReset = () => {
    // This will be handled inside child components
  };

  const handleFinalSave = async () => {
    try {
      const snapshot = {
        results: displayData,
        timestamp: new Date().toISOString(),
      };

      toast.success("Console snapshot successfully!");

      console.log("Saving Search Snapshot:", snapshot);
      // You could dispatch to Redux or call an API here.
    } catch (err) {
      console.error("Error saving snapshot:", err);
      throw err;
    }
  };

  const handleFinalClear = async () => {
    try {
      setFilteredData(originalData);
      setDisplayData(originalData);
      console.log("Cleared search state; snapshot not saved.");
    } catch (err) {
      console.error("Error in final clear:", err);
      throw err;
    }
  };

  return (
    <div className="font-Roboto ">
      <div className="shadow-sm">
        <h1 className="text-xl bg-white  border-b border-gray-200 py-2 pl-5">
          Search Reservation
        </h1>

        <SearchForm
          originalData={originalData}
          onFilteredDataChange={handleFilteredDataChange}
          onResetData={handleResetData}
          onPageReset={handlePageReset}
        />
      </div>

      <SearchResultsTable
        filteredData={filteredData}
        originalData={originalData}
        onDataUpdate={handleDataUpdate}
      />

      {/* Bottom Save / Clear */}
      <div className="flex justify-center gap-3 z-50 my-10">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handleFinalSave}
        >
          Save
        </Button>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500"
          onClick={handleFinalClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default SearchReservation;
