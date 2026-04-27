import { getProductList } from './services/ProductService.js';

const PAGE_SIZE = 10;
const BEST_SIZE = 4;

let currentPage = 1;
let currentKeyword = '';
let currentOrder = 'recent';
let totalPages = 1;

const bestList = document.getElementById('best-list');
const productList = document.getElementById('product-list');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  return `${Math.floor(diff / 2592000)}달 전`;
}

const noImageHTML = `
  <div class="img-placeholder">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  </div>`;

function createCard(product, isBest = false) {
  const li = document.createElement('li');
  li.className = 'product-card' + (isBest ? ' best' : '');

  const imgSrc = product.images?.[0] || `https://picsum.photos/seed/${product.id}/400/400`;
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'card-img-wrap';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = product.name;
  img.addEventListener('error', () => { imgWrapper.innerHTML = noImageHTML; });
  imgWrapper.appendChild(img);

  const tags = (product.tags || []).slice(0, 2).map((t) => `<span class="tag"># ${t}</span>`).join('');

  const body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML = `
    ${tags ? `<div class="card-tags">${tags}</div>` : '<div class="card-tags"></div>'}
    <p class="card-name">${product.name}</p>
    <p class="card-price">${product.price.toLocaleString()}원</p>
    <div class="card-footer">
      <span class="card-like">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        ${product.favoriteCount ?? 0}
      </span>
      <span class="card-date">${timeAgo(product.createdAt)}</span>
    </div>
  `;

  li.appendChild(imgWrapper);
  li.appendChild(body);
  return li;
}

async function renderBest() {
  const data = await getProductList({ page: 1, pageSize: BEST_SIZE, orderBy: 'favorite' });
  bestList.innerHTML = '';

  if (!data) { bestList.innerHTML = '<li class="empty">데이터를 불러오지 못했습니다.</li>'; return; }
  if (!data.list?.length) { bestList.innerHTML = '<li class="empty">베스트 상품이 없습니다.</li>'; return; }

  data.list.forEach((product) => bestList.appendChild(createCard(product, true)));
}

async function renderProducts() {
  productList.innerHTML = '<li class="empty">불러오는 중...</li>';
  pagination.innerHTML = '';

  const data = await getProductList({
    page: currentPage,
    pageSize: PAGE_SIZE,
    keyword: currentKeyword,
    orderBy: currentOrder,
  });

  productList.innerHTML = '';

  if (!data) { productList.innerHTML = '<li class="empty">데이터를 불러오지 못했습니다.</li>'; return; }
  if (!data.list?.length) { productList.innerHTML = '<li class="empty">검색 결과가 없습니다.</li>'; return; }

  totalPages = Math.ceil(data.totalCount / PAGE_SIZE);
  data.list.forEach((product) => productList.appendChild(createCard(product)));
  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = '';

  const addBtn = (label, page, isActive = false, disabled = false) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    if (isActive) btn.classList.add('active');
    btn.disabled = disabled;
    if (!disabled && !isActive) {
      btn.addEventListener('click', () => { currentPage = page; renderProducts(); });
    }
    pagination.appendChild(btn);
  };

  const addEllipsis = () => {
    const span = document.createElement('span');
    span.textContent = '···';
    span.className = 'pagination-ellipsis';
    pagination.appendChild(span);
  };

  addBtn('‹', currentPage - 1, false, currentPage === 1);

  const range = new Set([1, totalPages]);
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= totalPages) range.add(i);
  }

  let prev = 0;
  for (const page of [...range].sort((a, b) => a - b)) {
    if (page - prev > 1) addEllipsis();
    addBtn(page, page, page === currentPage);
    prev = page;
  }

  addBtn('›', currentPage + 1, false, currentPage === totalPages);
}

let searchTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentKeyword = e.target.value.trim();
    currentPage = 1;
    renderProducts();
  }, 400);
});

sortSelect.addEventListener('change', (e) => {
  currentOrder = e.target.value;
  currentPage = 1;
  renderProducts();
});

renderBest();
renderProducts();
