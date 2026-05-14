import React, { useState } from "react";
import "../css/RegisterPage.css";
import useProductValidation from "../hooks/productValidator";
import { useNavigate } from "react-router-dom";

const initialForm = {
   name: "",
   description: "",
   price: "",
   tags: [],
   tagInput: "",
   image: null, // File 또는 URL 문자열
};

// Vite 환경변수 사용
const API_URL = import.meta.env.VITE_API_URL;

function readFileAsDataUrl(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
   });
}

function getTagsWithInput(form) {
   const nextTag = form.tagInput.trim();
   if (!nextTag || form.tags.includes(nextTag)) return form.tags;
   return [...form.tags, nextTag];
}

export default function RegisterPage() {
   // 컴포넌트 이름 변경
   const navigate = useNavigate();
   const [form, setForm] = useState(initialForm);
   const [touched, setTouched] = useState({});
   const [submitError, setSubmitError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const formForValidation = {
      ...form,
      tags: getTagsWithInput(form),
   };

   const { errors, canSubmit } = useProductValidation(formForValidation);

   function updateField(event) {
      const { name, value } = event.target;
      setForm((current) => ({ ...current, [name]: value }));
   }

   function markTouched(event) {
      setTouched((current) => ({ ...current, [event.target.name]: true }));
   }

   function addTag() {
      const nextTag = form.tagInput.trim();
      if (!nextTag) return;
      setTouched((current) => ({ ...current, tags: true }));
      setForm((current) => ({
         ...current,
         tagInput: "",
         tags: current.tags.includes(nextTag)
            ? current.tags
            : [...current.tags, nextTag],
      }));
   }

   function handleTagKeyDown(event) {
      if (event.key === "Enter") {
         event.preventDefault();
         addTag();
      }
   }

   function removeTag(tag) {
      setForm((current) => ({
         ...current,
         tags: current.tags.filter((item) => item !== tag),
      }));
   }

   async function handleSubmit(event) {
      event.preventDefault();
      setTouched({
         name: true,
         description: true,
         price: true,
         tags: true,
         image: true,
      });
      const tags = getTagsWithInput(form);

      if (!canSubmit) return;

      try {
         setIsSubmitting(true);
         setSubmitError("");
         const image =
            form.image instanceof File
               ? await readFileAsDataUrl(form.image)
               : form.image.trim();
         const res = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               name: form.name.trim(),
               description: form.description.trim(),
               price: Number(form.price),
               tags,
               images: [image],
               ownerId: 1,
            }),
         });

         const responseText = await res.text();
         const product = responseText ? JSON.parse(responseText) : {};

         if (res.ok) {
            navigate("/items");
         } else {
            setSubmitError(product.message || "등록 실패");
         }
      } catch (err) {
         setSubmitError(
            err instanceof SyntaxError
               ? "서버 응답을 읽지 못했습니다. 잠시 후 다시 시도해 주세요."
               : err.message
         );
      } finally {
         setIsSubmitting(false);
      }
   }

   return (
      <section className="regi-container">
         <form onSubmit={handleSubmit}>
            <div className="regi-head">
               <h1 className="regi-title"> 상품 등록하기 </h1>
               <button
                  className={`regi-btn ${
                     isSubmitting || !canSubmit ? "disabled" : "active"
                  }`}
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
               >
                  {isSubmitting ? "등록 중..." : "등록"}
               </button>
               {submitError && <p className="error">{submitError}</p>}
            </div>

            <div className="item-name-pt">
               <h2 className="item-name">상품명</h2>
               <input
                  className="item-name-input"
                  type="text"
                  name="name"
                  placeholder="상품명을 입력해주세요"
                  value={form.name}
                  onChange={updateField}
                  onBlur={markTouched}
               />
               {touched.name && errors.name && (
                  <p className="error">{errors.name}</p>
               )}
            </div>

            <div className="item-desc-pt">
               <h3 className="item-desc">상품 소개</h3>
               <textarea
                  className="item-desc-input"
                  name="description"
                  placeholder="상품 소개를 입력해주세요"
                  value={form.description}
                  onChange={updateField}
                  onBlur={markTouched}
               />
               {touched.description && errors.description && (
                  <p className="error">{errors.description}</p>
               )}
            </div>

            <div className="item-price-pt">
               <h4 className="item-price">판매 가격</h4>
               <input
                  className="item-price-input"
                  type="text"
                  name="price"
                  placeholder="판매 가격을 입력해주세요"
                  value={form.price}
                  onChange={updateField}
                  onBlur={markTouched}
               />
               {touched.price && errors.price && (
                  <p className="error">{errors.price}</p>
               )}
            </div>

            <div className="item-tag-pt">
               <h5 className="item-tag-title">태그</h5>
               <input
                  className="item-tag-input"
                  type="text"
                  name="tagInput"
                  placeholder="태그를 입력 후 Enter"
                  value={form.tagInput}
                  onChange={updateField}
                  onKeyDown={handleTagKeyDown}
               />
               <div className="tag-container">
                  {form.tags.map((tag) => (
                     <button
                        key={tag}
                        type="button"
                        className="item-tag"
                        onClick={() => removeTag(tag)}
                     >
                        #{tag}
                     </button>
                  ))}
               </div>
               {touched.tags && errors.tags && (
                  <p className="error">{errors.tags}</p>
               )}
            </div>

            <div className="item-image-pt">
               <h5 className="item-image-title">상품 이미지</h5>
               {/* 파일 업로드 */}
               <input
                  className="item-image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                     setForm((current) => ({
                        ...current,
                        image: e.target.files[0],
                     }))
                  }
               />
               {/* URL 입력 */}
               <input
                  className="item-image-url-input"
                  type="text"
                  placeholder="이미지 URL을 입력해주세요"
                  value={typeof form.image === "string" ? form.image : ""}
                  onChange={(e) =>
                     setForm((current) => ({
                        ...current,
                        image: e.target.value,
                     }))
                  }
               />
               {touched.image && errors.image && (
                  <p className="error">{errors.image}</p>
               )}
            </div>
         </form>
      </section>
   );
}
