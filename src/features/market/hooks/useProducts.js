import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts({ page, pageSize, keyword, sort }) {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const res = await getProducts({
        page,
        pageSize,
        keyword,
        sort,
      });

      if (!ignore) {
        setData(res.list || []);
        setTotalCount(res.totalCount || 0);
      }
    }

    fetchData();
    return () => (ignore = true);
  }, [page, pageSize, keyword, sort]);

  return { data, totalCount };
}
