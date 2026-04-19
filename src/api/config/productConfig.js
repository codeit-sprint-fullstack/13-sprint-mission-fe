// Product Config

// IMPORT
import productApis from "../ProductService.js";

/**
 * 상품 API 설정 (message + handler)
 * @type {{
 *   [key: string]: {
 *     message: string,
 *     handler: () => Promise<any>
 *   }
 * }}
 */
const productConfig = {
  getProductList: {
    message: "⏳ 상품 목록 조회중 ...",
    handler: () => {
      const params = new URLSearchParams({
        page: 1,
        pageSize: 15,
        keyword: "",
      });
      return productApis.getAll(`/products?${params}`);
    },
  },
  getProduct: {
    message: "⏳ 상품 상세 조회중 ...",
    handler: () => productApis.get(`/products/3769`),
  },
  createProduct: {
    message: "⏳ 상품 등록중 ...",
    handler: () => {
      const dummy = {
        images: ["https://example.com/..."],
        tags: ["전자 제품"],
        price: 9999999,
        description:
          "멋진 스타일링을 원하신다면 다이슨 에어랩을 강력 추천합니다.",
        name: `🚀 다이슨 에어랩`,
      };
      return productApis.post(`/products`, dummy);
    },
  },
  patchProduct: {
    message: "⏳ 상품 수정중 ...",
    handler: () => {
      const dummy = {
        images: ["https://example.com/..."],
        tags: ["전자 제품"],
        price: 7777777,
        description:
          "멋진 스타일링을 원하신다면 다이슨 에어랩을 강력 추천합니다.",
        name: `🚀 수정된 다이슨 에어랩`,
      };
      return productApis.patch(`/products/3769`, dummy);
    },
  },
  deleteProduct: {
    message: "⏳ 상품 삭제중 ...",
    handler: () => productApis.delete(`/products/3770`),
  },
};

export default productConfig;
