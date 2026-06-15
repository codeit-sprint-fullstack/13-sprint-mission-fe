(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiUrl",
    ()=>apiUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const apiBaseUrl = ("TURBOPACK compile-time value", "http://127.0.0.1:4000/api") || "";
function apiUrl(path) {
    return ("TURBOPACK compile-time truthy", 1) ? `${apiBaseUrl}${path}` : "TURBOPACK unreachable";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/meta.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "getDisplayMeta",
    ()=>getDisplayMeta
]);
const names = [
    "총명한판다",
    "활발한판다",
    "차분한판다",
    "든든한판다",
    "느긋한판다"
];
function getDisplayMeta(id) {
    const number = Number(id) || 1;
    return {
        nickname: names[number % names.length],
        likes: number % 2 === 0 ? "8743" : "9999+"
    };
}
function formatDate(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PostDetail.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/meta.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const defaultImage = "/images/default-product.svg";
function PostDetail(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(78);
    if ($[0] !== "813012b5bd1f6a60aa4d6c527f5824fb6b6c24e65742d74ecedea88cf9e0d7c0") {
        for(let $i = 0; $i < 78; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "813012b5bd1f6a60aa4d6c527f5824fb6b6c24e65742d74ecedea88cf9e0d7c0";
    }
    const { postId } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== postId || $[2] !== router) {
        t1 = async function fetchPost() {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}`), {
                cache: "no-store"
            });
            if (!response.ok) {
                router.replace("/freeboard");
                return;
            }
            const article = await response.json();
            const commentsResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}/comments?limit=50`), {
                cache: "no-store"
            });
            const commentsData = commentsResponse.ok ? await commentsResponse.json() : {
                data: []
            };
            setPost({
                ...article,
                comments: commentsData.data || []
            });
        };
        $[1] = postId;
        $[2] = router;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const fetchPost = t1;
    let t2;
    if ($[4] !== fetchPost) {
        t2 = ({
            "PostDetail[useEffect()]": ()=>{
                fetchPost();
            }
        })["PostDetail[useEffect()]"];
        $[4] = fetchPost;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== postId) {
        t3 = [
            postId
        ];
        $[6] = postId;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[8] !== post) {
        t4 = post ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDisplayMeta"])(post.id) : null;
        $[8] = post;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const meta = t4;
    let t5;
    if ($[10] !== commentText) {
        t5 = commentText.trim();
        $[10] = commentText;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const canComment = t5.length > 0;
    let t6;
    if ($[12] !== postId || $[13] !== router) {
        t6 = async function handleDeletePost() {
            const response_0 = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}`), {
                method: "DELETE"
            });
            if (response_0.ok) {
                router.push("/freeboard");
                router.refresh();
            }
        };
        $[12] = postId;
        $[13] = router;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const handleDeletePost = t6;
    let t7;
    if ($[15] !== canComment || $[16] !== commentText || $[17] !== fetchPost || $[18] !== postId) {
        t7 = async function handleCreateComment(event) {
            event.preventDefault();
            if (!canComment) {
                return;
            }
            const response_1 = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}/comments`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: commentText
                })
            });
            if (response_1.ok) {
                setCommentText("");
                fetchPost();
            }
        };
        $[15] = canComment;
        $[16] = commentText;
        $[17] = fetchPost;
        $[18] = postId;
        $[19] = t7;
    } else {
        t7 = $[19];
    }
    const handleCreateComment = t7;
    if (!post || !meta) {
        let t8;
        if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto max-w-[900px] px-5 pb-16 pt-7 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "my-7 text-center text-gray-400",
                    children: "게시글을 불러오는 중입니다."
                }, void 0, false, {
                    fileName: "[project]/src/components/PostDetail.js",
                    lineNumber: 143,
                    columnNumber: 79
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PostDetail.js",
                lineNumber: 143,
                columnNumber: 12
            }, this);
            $[20] = t8;
        } else {
            t8 = $[20];
        }
        return t8;
    }
    let t8;
    if ($[21] !== post.title) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mb-3 text-2xl font-bold leading-[1.4]",
            children: post.title
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 152,
            columnNumber: 10
        }, this);
        $[21] = post.title;
        $[22] = t8;
    } else {
        t8 = $[22];
    }
    let t9;
    if ($[23] !== meta.nickname) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: meta.nickname
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 160,
            columnNumber: 10
        }, this);
        $[23] = meta.nickname;
        $[24] = t9;
    } else {
        t9 = $[24];
    }
    let t10;
    if ($[25] !== post.createdAt) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(post.createdAt);
        $[25] = post.createdAt;
        $[26] = t10;
    } else {
        t10 = $[26];
    }
    let t11;
    if ($[27] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[27] = t10;
        $[28] = t11;
    } else {
        t11 = $[28];
    }
    let t12;
    if ($[29] !== meta.likes) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "❤️ ",
                meta.likes
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 184,
            columnNumber: 11
        }, this);
        $[29] = meta.likes;
        $[30] = t12;
    } else {
        t12 = $[30];
    }
    let t13;
    if ($[31] !== t11 || $[32] !== t12 || $[33] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-[13px] text-gray-400",
            children: [
                t9,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 192,
            columnNumber: 11
        }, this);
        $[31] = t11;
        $[32] = t12;
        $[33] = t9;
        $[34] = t13;
    } else {
        t13 = $[34];
    }
    let t14;
    if ($[35] !== t13 || $[36] !== t8) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t8,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[35] = t13;
        $[36] = t8;
        $[37] = t14;
    } else {
        t14 = $[37];
    }
    const t15 = `/freeboard/${post.id}/edit`;
    let t16;
    if ($[38] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700",
            href: t15,
            children: "수정"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[38] = t15;
        $[39] = t16;
    } else {
        t16 = $[39];
    }
    let t17;
    if ($[40] !== handleDeletePost) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-red-500",
            type: "button",
            onClick: handleDeletePost,
            children: "삭제"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 220,
            columnNumber: 11
        }, this);
        $[40] = handleDeletePost;
        $[41] = t17;
    } else {
        t17 = $[41];
    }
    let t18;
    if ($[42] !== t16 || $[43] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[42] = t16;
        $[43] = t17;
        $[44] = t18;
    } else {
        t18 = $[44];
    }
    let t19;
    if ($[45] !== t14 || $[46] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",
            children: [
                t14,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 237,
            columnNumber: 11
        }, this);
        $[45] = t14;
        $[46] = t18;
        $[47] = t19;
    } else {
        t19 = $[47];
    }
    const t20 = post.imageUrl || defaultImage;
    let t21;
    if ($[48] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            className: "size-[120px] rounded-lg border border-gray-200 object-cover",
            src: t20,
            alt: ""
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 247,
            columnNumber: 11
        }, this);
        $[48] = t20;
        $[49] = t21;
    } else {
        t21 = $[49];
    }
    let t22;
    if ($[50] !== post.content) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-6 whitespace-pre-wrap leading-[1.8] text-gray-700",
            children: post.content
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 255,
            columnNumber: 11
        }, this);
        $[50] = post.content;
        $[51] = t22;
    } else {
        t22 = $[51];
    }
    let t23;
    if ($[52] !== t19 || $[53] !== t21 || $[54] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "border-b border-gray-200 py-7",
            children: [
                t19,
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[52] = t19;
        $[53] = t21;
        $[54] = t22;
        $[55] = t23;
    } else {
        t23 = $[55];
    }
    let t24;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            id: "comments-heading",
            className: "mb-5 text-xl font-bold",
            children: "댓글"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[56] = t24;
    } else {
        t24 = $[56];
    }
    let t25;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "PostDetail[<input>.onChange]": (event_0)=>setCommentText(event_0.target.value)
        })["PostDetail[<input>.onChange]"];
        $[57] = t25;
    } else {
        t25 = $[57];
    }
    let t26;
    if ($[58] !== commentText) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "h-[42px] w-full rounded-lg border-0 bg-gray-100 px-3.5 text-gray-900 outline-none placeholder:text-gray-400",
            value: commentText,
            onChange: t25,
            placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 289,
            columnNumber: 11
        }, this);
        $[58] = commentText;
        $[59] = t26;
    } else {
        t26 = $[59];
    }
    const t27 = !canComment;
    let t28;
    if ($[60] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex h-[42px] min-w-[72px] items-center justify-center rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600 disabled:bg-gray-400",
            type: "submit",
            disabled: t27,
            children: "등록"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[60] = t27;
        $[61] = t28;
    } else {
        t28 = $[61];
    }
    let t29;
    if ($[62] !== handleCreateComment || $[63] !== t26 || $[64] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "mb-[18px] grid grid-cols-1 gap-3 sm:grid-cols-[1fr_72px]",
            onSubmit: handleCreateComment,
            children: [
                t26,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 306,
            columnNumber: 11
        }, this);
        $[62] = handleCreateComment;
        $[63] = t26;
        $[64] = t28;
        $[65] = t29;
    } else {
        t29 = $[65];
    }
    let t30;
    if ($[66] !== fetchPost || $[67] !== post.comments || $[68] !== post.id) {
        t30 = post.comments.length > 0 ? post.comments.map({
            "PostDetail[post.comments.map()]": (comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                    postId: post.id,
                    comment: comment,
                    onChange: fetchPost
                }, comment.id, false, {
                    fileName: "[project]/src/components/PostDetail.js",
                    lineNumber: 317,
                    columnNumber: 53
                }, this)
        }["PostDetail[post.comments.map()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "my-7 text-center text-gray-400",
            children: "아직 댓글이 없습니다."
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 318,
            columnNumber: 45
        }, this);
        $[66] = fetchPost;
        $[67] = post.comments;
        $[68] = post.id;
        $[69] = t30;
    } else {
        t30 = $[69];
    }
    let t31;
    if ($[70] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-2.5",
            children: t30
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 328,
            columnNumber: 11
        }, this);
        $[70] = t30;
        $[71] = t31;
    } else {
        t31 = $[71];
    }
    let t32;
    if ($[72] !== t29 || $[73] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "pt-7",
            "aria-labelledby": "comments-heading",
            children: [
                t24,
                t29,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 336,
            columnNumber: 11
        }, this);
        $[72] = t29;
        $[73] = t31;
        $[74] = t32;
    } else {
        t32 = $[74];
    }
    let t33;
    if ($[75] !== t23 || $[76] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mx-auto max-w-[900px] px-5 pb-16 pt-7 sm:px-6",
            children: [
                t23,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 345,
            columnNumber: 11
        }, this);
        $[75] = t23;
        $[76] = t32;
        $[77] = t33;
    } else {
        t33 = $[77];
    }
    return t33;
}
_s(PostDetail, "lW/u3HARin938bsBkDxPfY8rg34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PostDetail;
function CommentItem(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "813012b5bd1f6a60aa4d6c527f5824fb6b6c24e65742d74ecedea88cf9e0d7c0") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "813012b5bd1f6a60aa4d6c527f5824fb6b6c24e65742d74ecedea88cf9e0d7c0";
    }
    const { postId, comment, onChange } = t0;
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(comment.content);
    let t1;
    if ($[1] !== comment.id || $[2] !== onChange || $[3] !== postId || $[4] !== value) {
        t1 = async function updateComment() {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}/comments/${comment.id}`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: value
                })
            });
            if (response.ok) {
                setEditing(false);
                onChange();
            }
        };
        $[1] = comment.id;
        $[2] = onChange;
        $[3] = postId;
        $[4] = value;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const updateComment = t1;
    let t2;
    if ($[6] !== comment.id || $[7] !== onChange || $[8] !== postId) {
        t2 = async function deleteComment() {
            const response_0 = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}/comments/${comment.id}`), {
                method: "DELETE"
            });
            if (response_0.ok) {
                onChange();
            }
        };
        $[6] = comment.id;
        $[7] = onChange;
        $[8] = postId;
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    const deleteComment = t2;
    let t3;
    if ($[10] !== comment.content || $[11] !== editing || $[12] !== value) {
        t3 = editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "h-[42px] w-full rounded-lg border-0 bg-gray-100 px-3.5 text-gray-900 outline-none",
            value: value,
            onChange: {
                "CommentItem[<input>.onChange]": (event)=>setValue(event.target.value)
            }["CommentItem[<input>.onChange]"]
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 415,
            columnNumber: 20
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-gray-700",
            children: comment.content
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 417,
            columnNumber: 46
        }, this);
        $[10] = comment.content;
        $[11] = editing;
        $[12] = value;
        $[13] = t3;
    } else {
        t3 = $[13];
    }
    let t4;
    if ($[14] !== editing || $[15] !== updateComment || $[16] !== value) {
        t4 = editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700 disabled:text-gray-300",
            type: "button",
            onClick: updateComment,
            disabled: !value.trim(),
            children: "저장"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 427,
            columnNumber: 20
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700 disabled:text-gray-300",
            type: "button",
            onClick: {
                "CommentItem[<button>.onClick]": ()=>setEditing(true)
            }["CommentItem[<button>.onClick]"],
            children: "수정"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 427,
            columnNumber: 274
        }, this);
        $[14] = editing;
        $[15] = updateComment;
        $[16] = value;
        $[17] = t4;
    } else {
        t4 = $[17];
    }
    let t5;
    if ($[18] !== deleteComment) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-red-500",
            type: "button",
            onClick: deleteComment,
            children: "삭제"
        }, void 0, false, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 439,
            columnNumber: 10
        }, this);
        $[18] = deleteComment;
        $[19] = t5;
    } else {
        t5 = $[19];
    }
    let t6;
    if ($[20] !== t4 || $[21] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 447,
            columnNumber: 10
        }, this);
        $[20] = t4;
        $[21] = t5;
        $[22] = t6;
    } else {
        t6 = $[22];
    }
    let t7;
    if ($[23] !== t3 || $[24] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 items-center gap-3 rounded-lg border border-gray-200 p-3.5 sm:grid-cols-[1fr_auto]",
            children: [
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostDetail.js",
            lineNumber: 456,
            columnNumber: 10
        }, this);
        $[23] = t3;
        $[24] = t6;
        $[25] = t7;
    } else {
        t7 = $[25];
    }
    return t7;
}
_s1(CommentItem, "oanjXATY62XIoxFNxFdQ6tst02Q=");
_c1 = CommentItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "PostDetail");
__turbopack_context__.k.register(_c1, "CommentItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_1mou8oj._.js.map