import { useEffect, useState } from "react";
import ProductsApi from "@/service/ProductsService";

const products = new ProductsApi();

export function useGetProduct(options = {}) {
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams({
      page: 1,
      pageSize: 4,
      orderBy: "recent",
      keyword: "",
      ...options,
    });

    async function getApi() {
      try {
        const result = await products.getProductList(params);
        setProductList(result.list);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error(error.message);
      }
    }
    getApi();
  }, [options.orderBy, options.pageSize, options.keyword, options.page]);

  return { productList, totalCount };
}
