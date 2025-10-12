import { useEffect, useState } from "react";
import { IPickUp } from "../types/report";

const usePickupReservation = (url: string, filterCompleted: boolean = true) => {
  const [data, setData] = useState<IPickUp[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        const filtered = filterCompleted
          ? jsonData.filter((item: IPickUp) => item.status !== "completed")
          : jsonData;
        setData(filtered);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, filterCompleted]);

  return { data, loading, error };
};

export default usePickupReservation;

// const reFetch = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch(url);
//     const jsonData = await res.json();
//     const filtered = filterCompleted
//       ? jsonData.filter((item: IPickUp) => item.status !== "completed")
//       : jsonData;
//     setData(filtered);
//   } catch (err) {
//     setError(err as Error);
//   }
//   setLoading(false);
// };
