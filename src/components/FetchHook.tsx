import { useState, useEffect } from "react";

export const useFetchData = (url: string) => {
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch data");
            const result = await res.json();
            setData(result);
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, [url]);

   return { data, setData, loading };
};
