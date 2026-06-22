"use client";
import React, { useEffect, useState } from "react";
import ArticleFrom from "../../components/ArticleFrom";
import { useParams, useRouter } from "next/navigation";
import { getArticle, updateArticle } from "@/api/article";

export default function ArticleEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    async function fetchOriginalArticle() {
      try {
        const data = await getArticle(id);
        if (data && data.success) {
          // ArticleForm이 받아먹을 수 있게 { title, content } 형태로 가공해서 넣어주기
          setEditData({
            title: data.data.title.replace(/\.$/, ""),
            content: data.data.content,
          });
        } else {
          alert("게시글을 불러올 수 없습니다.");
          router.push("/articles");
        }
      } catch (error) {
        console.error("기존 데이터 셋업 실패:", error);
      }
    }
    fetchOriginalArticle();
  }, [id, router]);

  const handleEditSubmit = async (formData) => {
    try {
      const data = await updateArticle(id, formData);

      if (data && data.success) {
        alert("수정이 완료되었습니다! 🎉");
        router.push(`/articles/${id}`);
      }
    } catch (error) {
      alert("수정에 실패했습니다: " + error.message);
    }
  };
  return (
    <main className="mt-[86px] mx-auto mb-18 ">
      <ArticleFrom onSubmit={handleEditSubmit} editData={editData} />
    </main>
  );
}
