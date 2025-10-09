import { useEffect, useState } from "react";
import { IDrop } from "../../types/report";

const useDropOffReservation = (url: string) => {
  const [data, setData] = useState<IDrop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const jsonData = await res.json();

        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDropOffReservation;
