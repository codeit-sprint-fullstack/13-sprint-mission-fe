export function renderNavBar() {
  const header = document.querySelector(".navbar");
  if (!header) return;

  header.innerHTML = `
  <link rel="stylesheet" href="./navbar.css" />
    <div class="container nav-inner">
      <div class="nav-left">
        <a href="/home.html" class="logo-wrap">
          <img src="./images/pandalogo.svg" class="logo-image" alt="로고" />
        </a>
        <nav class="nav-menu">
          <a href="/articles.html">자유게시판</a>
          <a href="/product.html" class="active">중고마켓</a>
        </nav>
      </div>
      <div class="nav-right">
        <a href="/addproduct.html" class="add-button">내 상품 등록하기</a>
        <a href="/login.html" class="login-button">로그인</a>
      </div>
    </div>
  `;
}
