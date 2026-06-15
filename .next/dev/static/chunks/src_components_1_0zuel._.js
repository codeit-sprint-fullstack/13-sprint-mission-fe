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
"[project]/src/components/PostForm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PostForm(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "6b1a216d8e77101efc15c899c4b3dc0fdf7b087391dba3134d7c2debdd3c8a1f") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1a216d8e77101efc15c899c4b3dc0fdf7b087391dba3134d7c2debdd3c8a1f";
    }
    const { mode, postId } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isEdit = mode === "edit";
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] !== content || $[2] !== saving || $[3] !== title) {
        t1 = title.trim() && content.trim() && !saving;
        $[1] = content;
        $[2] = saving;
        $[3] = title;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const canSubmit = t1;
    let t2;
    let t3;
    if ($[5] !== isEdit || $[6] !== postId || $[7] !== router) {
        t2 = ({
            "PostForm[useEffect()]": ()=>{
                if (!isEdit) {
                    return;
                }
                const fetchPost = async function fetchPost() {
                    const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}`), {
                        cache: "no-store"
                    });
                    if (!response.ok) {
                        router.replace("/freeboard");
                        return;
                    }
                    const post = await response.json();
                    setTitle(post.title);
                    setContent(post.content);
                };
                fetchPost();
            }
        })["PostForm[useEffect()]"];
        t3 = [
            isEdit,
            postId,
            router
        ];
        $[5] = isEdit;
        $[6] = postId;
        $[7] = router;
        $[8] = t2;
        $[9] = t3;
    } else {
        t2 = $[8];
        t3 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[10] !== canSubmit || $[11] !== content || $[12] !== isEdit || $[13] !== postId || $[14] !== router || $[15] !== title) {
        t4 = async function handleSubmit(event) {
            event.preventDefault();
            if (!canSubmit) {
                return;
            }
            setSaving(true);
            const response_0 = await fetch(isEdit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])(`/articles/${postId}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrl"])("/articles"), {
                method: isEdit ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
            if (response_0.ok) {
                const post_0 = await response_0.json();
                router.push(`/freeboard/${post_0.id}`);
                router.refresh();
                return;
            }
            setSaving(false);
        };
        $[10] = canSubmit;
        $[11] = content;
        $[12] = isEdit;
        $[13] = postId;
        $[14] = router;
        $[15] = title;
        $[16] = t4;
    } else {
        t4 = $[16];
    }
    const handleSubmit = t4;
    const t5 = isEdit ? "\uAC8C\uC2DC\uAE00 \uC218\uC815" : "\uAC8C\uC2DC\uAE00 \uC4F0\uAE30";
    let t6;
    if ($[17] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-lg font-bold",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[17] = t5;
        $[18] = t6;
    } else {
        t6 = $[18];
    }
    const t7 = !canSubmit;
    const t8 = isEdit ? "\uC218\uC815" : "\uB4F1\uB85D";
    let t9;
    if ($[19] !== t7 || $[20] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "h-[34px] min-w-[62px] rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600 disabled:bg-gray-400",
            type: "submit",
            disabled: t7,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 119,
            columnNumber: 10
        }, this);
        $[19] = t7;
        $[20] = t8;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    let t10;
    if ($[22] !== t6 || $[23] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-[26px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
            children: [
                t6,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 128,
            columnNumber: 11
        }, this);
        $[22] = t6;
        $[23] = t9;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    let t11;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "mb-3 block",
            children: "*제목"
        }, void 0, false, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "PostForm[<input>.onChange]": (event_0)=>setTitle(event_0.target.value)
        })["PostForm[<input>.onChange]"];
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    let t13;
    if ($[27] !== title) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "mb-[22px] block text-sm font-extrabold",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "h-[52px] w-full rounded-lg border-0 bg-gray-100 px-[18px] text-gray-900 outline-none placeholder:text-gray-400",
                    value: title,
                    onChange: t12,
                    placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"
                }, void 0, false, {
                    fileName: "[project]/src/components/PostForm.js",
                    lineNumber: 153,
                    columnNumber: 74
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[27] = title;
        $[28] = t13;
    } else {
        t13 = $[28];
    }
    let t14;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "mb-3 block",
            children: "*내용"
        }, void 0, false, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "PostForm[<textarea>.onChange]": (event_1)=>setContent(event_1.target.value)
        })["PostForm[<textarea>.onChange]"];
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    let t16;
    if ($[31] !== content) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "mb-[22px] block text-sm font-extrabold",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    className: "min-h-[190px] w-full resize-y rounded-lg border-0 bg-gray-100 p-[18px] text-gray-900 outline-none placeholder:text-gray-400",
                    value: content,
                    onChange: t15,
                    placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"
                }, void 0, false, {
                    fileName: "[project]/src/components/PostForm.js",
                    lineNumber: 177,
                    columnNumber: 74
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[31] = content;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== handleSubmit || $[34] !== t10 || $[35] !== t13 || $[36] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "mx-auto max-w-[1040px] px-5 pb-16 pt-7 sm:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "mx-auto max-w-[840px]",
                onSubmit: handleSubmit,
                children: [
                    t10,
                    t13,
                    t16
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PostForm.js",
                lineNumber: 185,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/PostForm.js",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[33] = handleSubmit;
        $[34] = t10;
        $[35] = t13;
        $[36] = t16;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    return t17;
}
_s(PostForm, "WrfJ5C4xJ1di8BkNmlA40eaSfM8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PostForm;
var _c;
__turbopack_context__.k.register(_c, "PostForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_1_0zuel._.js.map