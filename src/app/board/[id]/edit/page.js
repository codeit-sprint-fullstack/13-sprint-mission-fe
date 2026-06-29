"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm from "@/app/components/PostForm";

export default function EditPage() {
  const params = useParams();
  const id = params?.id;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/articles/${id}/edit`,
        );
        if (!response.ok) throw new Error("데이터 로드 실패");
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
        alert("데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        데이터를 불러오는 중...
      </div>
    );

  return <PostForm id={id} initialData={initialData} />;
}
