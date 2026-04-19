// main.js

// IMPORT
import articleApis from "./api/ArticleService.js";
import productApis from "./api/ProductService.js";
import request from "./api/utils/request.js";
import articleConfig from "./api/config/articleConfig.js";
import productConfig from "./api/config/productConfig.js";

/**
 * API 버튼에 클릭 이벤트를 바인딩합니다.
 *
 * @param {string} id - 버튼 ID의 suffix (e.g. "getArticle")
 * @param {{ message: string, handler: () => Promise<any> }} config - API 실행 설정 객체
 */
function bindApiButton(id, config) {
  const btn = document.querySelector(`#api-${id}`);
  btn.addEventListener("click", () => {
    const configMessage = articleConfig;
    console.log(config.message);
    request(config.handler);
  });
}

/**
 * articleConfig와 productConfig를 합쳐
 * 각 API 버튼에 이벤트를 연결합니다.
 */
Object.entries({ ...articleConfig, ...productConfig }).forEach(
  ([key, config]) => {
    bindApiButton(key, config);
  },
);
