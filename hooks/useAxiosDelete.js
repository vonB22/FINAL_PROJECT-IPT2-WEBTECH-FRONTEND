// hooks/useAxiosDelete.js
import { useState } from "react";
import apiClient from "@/lib/axios";

export function useAxiosDelete(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function del() {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.delete(url);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, del };
}
