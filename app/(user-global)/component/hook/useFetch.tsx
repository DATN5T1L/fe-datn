// hooks/useFetch.ts

import { useState } from "react";

interface FetchParams {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
}

interface UseFetchResponse<T> {
    data: T | null;
    error: string | null;
    fetchData: () => Promise<T | null>;
    loading: boolean;
}

const useFetch = <T,>({ url, method, headers = {}, body }: FetchParams): UseFetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, fetchData, loading };
};

export default useFetch;
