// main.js

// IMPORT
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./api/ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./api/ProductService.js";

/**
 * @ panda-market-api
 * 함수 인자 변경 후 화면에서 버튼을 꼭 클릭해 주세요!
 */
const getArticleListApiBtn = document.querySelector("#api-getArticleList");
const getArticleApiBtn = document.querySelector("#api-getArticle");
const createArticleApiBtn = document.querySelector("#api-createArticle");
const patchArticleApiBtn = document.querySelector("#api-patchArticle");
const deleteArticleApiBtn = document.querySelector("#api-deleteArticle");
const getProductListApiBtn = document.querySelector("#api-getProductList");
const getProductApiBtn = document.querySelector("#api-getProduct");
const createProductApiBtn = document.querySelector("#api-createProduct");
const patchProductApiBtn = document.querySelector("#api-patchProduct");
const deleteProductApiBtn = document.querySelector("#api-deleteProduct");

// 게시글 목록 조회
getArticleListApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 게시글 목록 조회 중 ...");
  getArticleList(1, 15)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 게시글 상세 조회
getArticleApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 게시글 상세 조회 중 ...");
  getArticle(6127)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 게시글 등록
createArticleApiBtn.addEventListener("click", (btn) => {
  const randomNum = Math.ceil(Math.random() * 10);
  const dummy = {
    image: "https://example.com/...",
    content: "게시글이 잘 등록 되었나요?",
    title: `🚀 새로운 게시글을 등록합니다! (${randomNum})`,
  };
  console.log("⏳ 게시글 등록중 ...");
  createArticle(dummy)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 게시글 수정
patchArticleApiBtn.addEventListener("click", (btn) => {
  const randomNum = Math.ceil(Math.random() * 10);
  const dummy = {
    image: "https://example.com/...",
    content: "수정된 게시글이 잘 등록 되었나요?",
    title: `✅ 수정된 게시글을 등록합니다. (${randomNum})`,
  };
  console.log("⏳ 게시글 수정중 ...");
  patchArticle(6127, dummy)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 게시글 삭제
deleteArticleApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 게시글 삭제중 ...");
  deleteArticle(6127)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 상품 목록 조회
getProductListApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 상품 목록 조회중 ...");
  getProductList(1, 20)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 상품 상세 조회
getProductApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 상품 상세 조회중 ...");
  getProduct(3616)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 상품 등록
createProductApiBtn.addEventListener("click", (btn) => {
  const randomNum = Math.ceil(Math.random() * 10);
  const dummy = {
    images: ["https://example.com/..."],
    tags: ["전자 제품"],
    price: 9999999,
    description: "멋진 스타일링을 원하신다면 다이슨 에어랩을 강력 추천합니다.",
    name: `🚀 다이슨 에어랩 (${randomNum})`,
  };
  console.log("⏳ 상품 등록중 ...");
  createProduct(dummy)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 상품 수정
patchProductApiBtn.addEventListener("click", (btn) => {
  const randomNum = Math.ceil(Math.random() * 10);
  const dummy = {
    images: ["https://example.com/..."],
    tags: ["전자 제품"],
    price: 7777777,
    description: "멋진 스타일링을 원하신다면 다이슨 에어랩을 강력 추천합니다.",
    name: `🚀 수정된 다이슨 에어랩 (${randomNum})`,
  };
  console.log("⏳ 상품 수정중 ...");
  patchProduct(3616, dummy)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});

// 게시글 삭제
deleteProductApiBtn.addEventListener("click", (btn) => {
  console.log("⏳ 상품 삭제중 ...");
  deleteProduct(3616)
    .then((data) => {
      console.log("✅ 완료", data);
    })
    .catch((error) => {
      console.log("❌ 실패", error);
    });
});
