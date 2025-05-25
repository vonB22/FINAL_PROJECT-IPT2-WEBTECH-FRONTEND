// hooks/useAxiosPut.js
import { useState } from "react";
import apiClient from "@/lib/axios";

export function useAxiosPut(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function put(payload) {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.put(url, payload);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, put };
}
