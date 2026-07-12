/** 상품 API */

// GET /products
export async function getAllProducts({
  // TODO: 직접 만든 API로 변경 시, params명 수정
  pageSize = 10,
  page = 1,
  orderBy = "recent",
  keyword = "",
}) {
  try {
    const query = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      orderBy,
      keyword,
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${query}`,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    const { products } = await response.json();
    return products;
  } catch (error) {
    throw new Error(`❌ 게시글 조회 실패 :`, { cause: error });
  }
}

// GET /products/:id
export async function getProductById(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    );

    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(`❌ 게시글 조회 실패 :`, { cause: error });
  }
}

// POST /products
export async function createProduct(body) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error("❌ 게시글 등록 실패", { cause: error });
  }
}

// PATCH /products/:id
export async function updateProducts(id, body) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error("❌ 게시글 수정 실패", { cause: error });
  }
}

// DELETE /products/:id
export async function deleteProduct(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    revalidatePath(`/products/${id}`, "page");
    return { success: true };
  } catch (error) {
    throw new Error("❌ 게시글 삭제 실패", { cause: error });
  }
}
