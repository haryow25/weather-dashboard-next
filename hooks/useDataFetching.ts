import { useState, useEffect, useCallback } from "react";

interface UseDataFetchingOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit;
}

function useDataFetching<T>(
  url: string,
  options: UseDataFetchingOptions = {}
): {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  fetchData: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, fetchData };
}

export default useDataFetching;
