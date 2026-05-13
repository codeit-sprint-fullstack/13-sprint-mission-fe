import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export default function Items() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 10;
  const keyword = searchParams.get("keyword") ?? "";

  useEffect(() => {
    async function getProducts() {
      try {
        const params = new URLSearchParams({ page, pageSize });
        if (keyword) params.set("나 keyword :", keyword);

        const response = await fetch(
          `https://one3-sprint-mission-be-156g.onrender.com/products?${params}`,
        );
        const result = await response.json();
        setData(result.products ?? []);
      } catch (error) {
        console.error("나 에러:", error);
      }
    }

    getProducts();
  }, [page, pageSize, keyword]);

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} {item.createdAt}
          </li>
        ))}
      </ul>
    </>
  );
}
