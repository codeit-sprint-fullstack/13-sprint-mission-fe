import { getProductList } from "./ProductService.js";

// 현재 정렬 상태를 저장할 변수 (기본값: 최신순)
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

// 데이터를 불러오고 렌더링하는 핵심 함수
async function loadProducts(orderBy = "recent") {
  try {
    // API 호출 시 정렬 기준(orderBy)을 전달 (API 명세에 맞게 파라미터 확인 필요)
    // 4개(베스트) + 8개(판매중)를 한 번에 보여주기 위해 넉넉히 12개 이상 가져옵니다.
    const data = await getProductList(1, 20, "", orderBy);

    let products =
      data && data.list ? data.list : Array.isArray(data) ? data : [];

    // 특정 이름 제외 필터링
    products = products.filter((item) => !item.name.includes("김대영"));

    if (products.length > 0) {
      // 1. 베스트 상품 (상위 4개)
      renderProducts(products.slice(0, 4), "bestProductList");

      // 2. 판매 중인 상품 (4개씩 2줄 = 8개)
      renderProducts(products.slice(0, 8), "productList");
    } else {
      document.getElementById("productList").innerHTML =
        "<p>표시할 상품이 없습니다.</p>";
    }
  } catch (err) {
    console.error("데이터 로드 중 에러 발생:", err);
  }
}

// 이벤트 리스너 설정
function setupEventListeners() {
  const sortSelect = document.getElementById("sortOrder");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentOrderBy = e.target.value; // 'recent' 또는 'favorite'
      loadProducts(currentOrderBy);
    });
  }
}

// 초기 실행
function init() {
  setupEventListeners();
  loadProducts(currentOrderBy);
}

init();
