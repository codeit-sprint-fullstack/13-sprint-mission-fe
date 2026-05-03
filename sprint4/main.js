import { getProductList } from "./ProductService.js";

let currentOrderBy = "recent";

export function renderProducts(products, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;

  container.innerHTML = products
    .map((item) => {
      const imageUrl =
        Array.isArray(item.images) && item.images.length > 0
          ? item.images[0]
          : "./아직도 똑같음_files/130-200x200.jpg";

      return `
        <div class="card">
          <div class="image-wrapper">
            <img src="${imageUrl}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300'"/>
          </div>
          <div class="info">
            <p class="title">${item.name}</p>
            <p class="price">${(item.price || 10000).toLocaleString()}원</p>
            <div class="favorite-count">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>${item.favoriteCount || 0}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

async function loadProducts(orderBy = "recent") {
  try {
    const data = await getProductList(1, 20, "", orderBy);

    let products =
      data && data.list ? data.list : Array.isArray(data) ? data : [];

    products = products.filter((item) => !item.name.includes("김대영"));

    if (products.length > 0) {
      renderProducts(products.slice(0, 4), "bestProductList");

      renderProducts(products.slice(0, 8), "productList");
    } else {
      document.getElementById("productList").innerHTML =
        "<p>표시할 상품이 없습니다.</p>";
    }
  } catch (err) {
    console.error("데이터 로드 중 에러 발생:", err);
  }
}
function setupEventListeners() {
  const sortSelect = document.getElementById("sortOrder");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentOrderBy = e.target.value;
      loadProducts(currentOrderBy);
    });
  }
}

function init() {
  setupEventListeners();
  loadProducts(currentOrderBy);
}

init();
