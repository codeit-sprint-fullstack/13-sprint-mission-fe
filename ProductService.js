const baseUrl = "https://panda-market-api-crud.vercel.app/products";

export async function getProductList(params) {
  const searchParams = new URLSearchParams(params);
  const url = `${baseUrl}?${searchParams}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`요청 실패! 상태: ${response.status}`);
    }
    const data = await response.json();
    console.log("제품목록", data);
  } catch (error) {
    console.error("요청 실패!", error.message);
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}/${productId}`);
    if (!response.ok) {
      throw new Error(`요청 실패! 상태: ${response.status}`);
    }
    const data = await response.json();
    console.log("제품", data);
  } catch (error) {
    console.error("요청 실패!", error.message);
    throw error;
  }
}

export async function createProduct() {
  const newProduct = {
    images: ["https://example.com/..."],
    tags: ["전자제품"],
    price: 0,
    description: "string",
    name: "상품 이름",
  };
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error(`요청 실패! 상태: ${response.status}`);
    }
    const data = await response.json();
    console.log("생성된 게시물", data);
  } catch (error) {
    console.error("요청 실패!", error.message);
    throw error;
  }
}

export async function patchProduct(productId) {
  const patchProduct = {
    name: "무선마우스",
    tags: ["컴퓨터용품"],
    price: 210000,
  };
  try {
    const response = await fetch(`${baseUrl}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchProduct),
    });
    if (!response.ok) {
      throw new Error(`요청 실패! 상태: ${response.status}`);
    }
    const data = await response.json();
    console.log("수정된 게시물", data);
  } catch (error) {
    console.error("요청 실패!", error.message);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`요청 실패! 상태: ${response.status}`);
    }
    console.log("게시물 삭제 성공 id:", productId);
  } catch (error) {
    console.error("요청 실패!", error.message);
    throw error;
  }
}
