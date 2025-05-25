// hooks/useAxiosPost.js
import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

export function useAxiosPost(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback prevents unnecessary re-creations of the post function
  const post = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiClient.post(url, payload);
        setData(res.data);
        return res.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, post };
}

export default useAxiosPost;
