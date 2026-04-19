// Article Config

// IMPORT
import articleApis from "../ArticleService.js";

/**
 * 게시글 API 설정 (message + handler)
 * @type {{
 *   [key: string]: {
 *     message: string,
 *     handler: () => Promise<any>
 *   }
 * }}
 */
const articleConfig = {
  getArticleList: {
    message: "⏳ 게시글 목록 조회 중 ...",
    handler: () => {
      const params = new URLSearchParams({
        page: 1,
        pageSize: 15,
        // keyword: "",
      });
      return articleApis.getAll(`/articles?${params}`);
    },
  },
  getArticle: {
    message: "⏳ 게시글 상세 조회 중 ...",
    handler: () => articleApis.get(`/articles/6284`),
  },
  createArticle: {
    message: "⏳ 게시글 등록중 ...",
    handler: () => {
      const dummy = {
        image: "https://example.com/...",
        content: "게시글이 잘 등록 되었나요?",
        title: `🚀 새로운 게시글을 등록합니다!`,
      };
      return articleApis.post("/articles", dummy);
    },
  },
  patchArticle: {
    message: "⏳ 게시글 수정중 ...",
    handler: () => {
      const dummy = {
        image: "https://example.com/...",
        content: "수정된 게시글이 잘 등록 되었나요?",
        title: `✅ 수정된 게시글을 등록합니다.`,
      };
      return articleApis.patch("/articles/6300", dummy);
    },
  },
  deleteArticle: {
    message: "⏳ 게시글 삭제중 ...",
    handler: () => articleApis.delete("/articles/6281"),
  },
};

export default articleConfig;
