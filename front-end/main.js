import { getProductList } from "./ProductService.js";

let currentOrderBy = "recent";
let currentPage = 1;
const pageSize = 10;

export function renderProducts(products, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;

  if (!products || !Array.isArray(products) || products.length === 0) {
    container.innerHTML = `<p class="no-data">등록된 상품이 없습니다.</p>`;
    return;
  }

  container.innerHTML = products
    .map((item) => {
      const productId = item.id || item._id;
      const imageUrl =
        "https://via.assets.so/img.jpg?w=400&h=400&tc=white&bg=cecece&t=No+Image";

      return `
        <div class="card" onclick="location.href='./product-detail.html?id=${productId}'" style="cursor:pointer">
          <div class="image-wrapper">
            <img src="${imageUrl}" alt="${item.name}" />
          </div>
          <div class="info">
            <p class="title"><strong>${item.name}</strong></p>
            <p class="price">${(item.price || 0).toLocaleString()}원</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderPagination(totalCount) {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(totalCount / pageSize);
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button type="button" class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  container.innerHTML = html;

  container.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const targetPage = parseInt(e.target.dataset.page);
      if (currentPage === targetPage) return;

      currentPage = targetPage;
      loadProductList(currentOrderBy);
    });
  });
}

async function loadProductList(orderBy) {
  try {
    const searchVal = document.getElementById("searchInput")?.value || "";

    const data = await getProductList({
      page: currentPage,
      pageSize: pageSize,
      keyword: searchVal,
      orderBy: orderBy,
    });

    const products = Array.isArray(data) ? data : data.list || [];
    const totalCount = data.totalCount || 50;

    renderProducts(products, "productList");
    renderPagination(totalCount);

    if (products.length > 0 && currentPage === 1) {
      renderProducts(products.slice(0, 4), "bestProductList");
    }
  } catch (err) {
    console.error("데이터 로드 실패:", err);
  }
}

function setupEventListeners() {
  const sortSelect = document.getElementById("sortOrder");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentOrderBy = e.target.value;
      currentPage = 1;
      loadProductList(currentOrderBy);
    });
  }

  const searchBtn = document.querySelector(".add-button");
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = 1;
      loadProductList(currentOrderBy);
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        currentPage = 1;
        loadProductList(currentOrderBy);
      }
    });
  }
}

function init() {
  setupEventListeners();
  loadProductList(currentOrderBy);
}

init();
