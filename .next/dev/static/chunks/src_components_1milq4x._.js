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
"[project]/src/components/BoardPage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/meta.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const defaultImage = "/images/default-product.svg";
function BoardPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [bestPosts, setBestPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("latest");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t2;
    let t3;
    if ($[3] !== query || $[4] !== sort) {
        t2 = ({
            "BoardPage[useEffect()]": ()=>{
                const fetchPosts = async function fetchPosts() {
                    setLoading(true);
                    const params = new URLSearchParams({
                        sort,
                        limit: "20"
                    });
                    if (query.trim()) {
                        params.set("keyword", query.trim());
                    }
                    const response = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])("/articles")}?${params.toString()}`, {
                        cache: "no-store"
                    });
                    const data = await response.json();
                    setPosts(data.data || []);
                    setLoading(false);
                };
                fetchPosts();
            }
        })["BoardPage[useEffect()]"];
        t3 = [
            query,
            sort
        ];
        $[3] = query;
        $[4] = sort;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "BoardPage[useEffect()]": ()=>{
                const fetchBestPosts = async function fetchBestPosts() {
                    const response_0 = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])("/articles")}?sort=latest&limit=3`, {
                        cache: "no-store"
                    });
                    const data_0 = await response_0.json();
                    setBestPosts(data_0.data || []);
                };
                fetchBestPosts();
            }
        })["BoardPage[useEffect()]"];
        t5 = [];
        $[7] = t4;
        $[8] = t5;
    } else {
        t4 = $[7];
        t5 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    bb0: {
        if (loading) {
            t6 = "\uAC8C\uC2DC\uAE00\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.";
            break bb0;
        }
        t6 = query.trim() ? "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uB4F1\uB85D\uB41C \uAC8C\uC2DC\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.";
    }
    const emptyMessage = t6;
    let t7;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            id: "best-heading",
            className: "mb-5 text-xl font-bold",
            children: "베스트 게시글"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] !== bestPosts) {
        t8 = bestPosts.map(_BoardPageBestPostsMap);
        $[10] = bestPosts;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-labelledby": "best-heading",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[46px] grid grid-cols-1 gap-[22px] md:grid-cols-3",
                    children: t8
                }, void 0, false, {
                    fileName: "[project]/src/components/BoardPage.js",
                    lineNumber: 119,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 119,
            columnNumber: 10
        }, this);
        $[12] = t8;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-5 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "posts-heading",
                    className: "text-xl font-bold",
                    children: "게시글"
                }, void 0, false, {
                    fileName: "[project]/src/components/BoardPage.js",
                    lineNumber: 127,
                    columnNumber: 67
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/freeboard/new",
                    className: "inline-flex h-[42px] min-w-[72px] items-center justify-center rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600",
                    children: "글쓰기"
                }, void 0, false, {
                    fileName: "[project]/src/components/BoardPage.js",
                    lineNumber: 127,
                    columnNumber: 128
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            "aria-hidden": "true",
            children: "⌕"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "BoardPage[<input>.onChange]": (event)=>setQuery(event.target.value)
        })["BoardPage[<input>.onChange]"];
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] !== query) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex h-[42px] items-center gap-2 rounded-lg bg-gray-100 px-4 text-gray-400",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400",
                    value: query,
                    onChange: t12,
                    placeholder: "\uAC80\uC0C9\uD560 \uC0C1\uD488\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"
                }, void 0, false, {
                    fileName: "[project]/src/components/BoardPage.js",
                    lineNumber: 150,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[17] = query;
        $[18] = t13;
    } else {
        t13 = $[18];
    }
    let t14;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "BoardPage[<select>.onChange]": (event_0)=>setSort(event_0.target.value)
        })["BoardPage[<select>.onChange]"];
        $[19] = t14;
    } else {
        t14 = $[19];
    }
    let t15;
    let t16;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "latest",
            children: "최신순"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "oldest",
            children: "오래된순"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[20] = t15;
        $[21] = t16;
    } else {
        t15 = $[20];
        t16 = $[21];
    }
    let t17;
    if ($[22] !== sort) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            className: "h-[42px] rounded-lg border border-gray-200 bg-white px-3 text-gray-900 outline-none",
            value: sort,
            onChange: t14,
            "aria-label": "\uAC8C\uC2DC\uAE00 \uC815\uB82C",
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        $[22] = sort;
        $[23] = t17;
    } else {
        t17 = $[23];
    }
    let t18;
    if ($[24] !== t13 || $[25] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_112px]",
            children: [
                t13,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[24] = t13;
        $[25] = t17;
        $[26] = t18;
    } else {
        t18 = $[26];
    }
    let t19;
    if ($[27] !== emptyMessage || $[28] !== posts) {
        t19 = posts.length > 0 ? posts.map(_BoardPagePostsMap) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "my-7 text-center text-gray-400",
            children: emptyMessage
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 195,
            columnNumber: 62
        }, this);
        $[27] = emptyMessage;
        $[28] = posts;
        $[29] = t19;
    } else {
        t19 = $[29];
    }
    let t20;
    if ($[30] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b border-gray-200",
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[30] = t19;
        $[31] = t20;
    } else {
        t20 = $[31];
    }
    let t21;
    if ($[32] !== t18 || $[33] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-labelledby": "posts-heading",
            children: [
                t10,
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[32] = t18;
        $[33] = t20;
        $[34] = t21;
    } else {
        t21 = $[34];
    }
    let t22;
    if ($[35] !== t21 || $[36] !== t9) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-[1040px] px-5 pb-16 pt-7 sm:px-6",
                children: [
                    t9,
                    t21
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BoardPage.js",
                lineNumber: 221,
                columnNumber: 20
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 221,
            columnNumber: 11
        }, this);
        $[35] = t21;
        $[36] = t9;
        $[37] = t22;
    } else {
        t22 = $[37];
    }
    return t22;
}
_s(BoardPage, "RrHAkYt/WZqMQzgcBW8vBdUtCK8=");
_c = BoardPage;
function _BoardPagePostsMap(post_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostRow, {
        post: post_0
    }, post_0.id, false, {
        fileName: "[project]/src/components/BoardPage.js",
        lineNumber: 231,
        columnNumber: 10
    }, this);
}
function _BoardPageBestPostsMap(post) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BestCard, {
        post: post
    }, post.id, false, {
        fileName: "[project]/src/components/BoardPage.js",
        lineNumber: 234,
        columnNumber: 10
    }, this);
}
function BestCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(27);
    if ($[0] !== "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1") {
        for(let $i = 0; $i < 27; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1";
    }
    const { post } = t0;
    let t1;
    if ($[1] !== post.id) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDisplayMeta"])(post.id);
        $[1] = post.id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const meta = t1;
    const t2 = `/freeboard/${post.id}`;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute left-5 top-0 inline-flex h-7 min-w-[82px] items-center justify-center rounded-b-xl bg-blue-500 text-[13px] font-extrabold text-white",
            children: "🏅 Best"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 259,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] !== post.title) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[17px] font-bold leading-[1.55]",
            children: post.title
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 266,
            columnNumber: 10
        }, this);
        $[4] = post.title;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const t5 = post.imageUrl || defaultImage;
    let t6;
    if ($[6] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            className: "size-14 rounded-md border border-gray-200 bg-white object-cover",
            src: t5,
            alt: ""
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 275,
            columnNumber: 10
        }, this);
        $[6] = t5;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] !== t4 || $[9] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-[1fr_56px] items-center gap-4",
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 283,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== meta.nickname) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: meta.nickname
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 292,
            columnNumber: 10
        }, this);
        $[11] = meta.nickname;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== meta.likes) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "❤️ ",
                meta.likes
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 300,
            columnNumber: 10
        }, this);
        $[13] = meta.likes;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== post.createdAt) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(post.createdAt);
        $[15] = post.createdAt;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
            className: "ml-auto",
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 316,
            columnNumber: 11
        }, this);
        $[17] = t10;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== t11 || $[20] !== t8 || $[21] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-[13px] text-gray-400",
            children: [
                t8,
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[19] = t11;
        $[20] = t8;
        $[21] = t9;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== t12 || $[24] !== t2 || $[25] !== t7) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "relative flex min-h-[136px] flex-col gap-[18px] rounded-lg bg-gray-50 px-5 pb-[18px] pt-[42px]",
            href: t2,
            children: [
                t3,
                t7,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 334,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t2;
        $[25] = t7;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    return t13;
}
_c1 = BestCard;
function PostRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(29);
    if ($[0] !== "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1") {
        for(let $i = 0; $i < 29; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c5ccb09fa6503a72d766d95d0a27e5638ed821ce2550ce8f59830dbb0754f3d1";
    }
    const { post } = t0;
    let t1;
    if ($[1] !== post.id) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDisplayMeta"])(post.id);
        $[1] = post.id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const meta = t1;
    const t2 = `/freeboard/${post.id}`;
    let t3;
    if ($[3] !== post.title) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[17px] font-bold leading-[1.55]",
            children: post.title
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 367,
            columnNumber: 10
        }, this);
        $[3] = post.title;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "grid size-5 place-items-center rounded-full bg-gray-200 text-xs",
            children: "🐼"
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 375,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== meta.nickname) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: meta.nickname
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 382,
            columnNumber: 10
        }, this);
        $[6] = meta.nickname;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== post.createdAt) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$meta$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(post.createdAt);
        $[8] = post.createdAt;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 398,
            columnNumber: 10
        }, this);
        $[10] = t6;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t5 || $[13] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-[13px] text-gray-400",
            children: [
                t4,
                t5,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 406,
            columnNumber: 10
        }, this);
        $[12] = t5;
        $[13] = t7;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== t3 || $[16] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-w-0 flex-col justify-between gap-5",
            children: [
                t3,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 415,
            columnNumber: 10
        }, this);
        $[15] = t3;
        $[16] = t8;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    const t10 = post.imageUrl || defaultImage;
    let t11;
    if ($[18] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            className: "size-14 rounded-md border border-gray-200 bg-white object-cover",
            src: t10,
            alt: ""
        }, void 0, false, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 425,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== meta.likes) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "❤️ ",
                meta.likes
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 433,
            columnNumber: 11
        }, this);
        $[20] = meta.likes;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t11 || $[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-row items-center justify-between text-sm text-gray-400 sm:flex-col sm:items-end",
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 441,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== t13 || $[26] !== t2 || $[27] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "grid min-h-[132px] grid-cols-1 gap-5 border-t border-gray-200 py-[22px] sm:grid-cols-[1fr_88px] sm:gap-6",
            href: t2,
            children: [
                t9,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BoardPage.js",
            lineNumber: 450,
            columnNumber: 11
        }, this);
        $[25] = t13;
        $[26] = t2;
        $[27] = t9;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    return t14;
}
_c2 = PostRow;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BoardPage");
__turbopack_context__.k.register(_c1, "BestCard");
__turbopack_context__.k.register(_c2, "PostRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_1milq4x._.js.map