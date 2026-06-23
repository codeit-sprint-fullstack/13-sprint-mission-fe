"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";

export default function PostDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFetchingEditData, setIsFetchingEditData] = useState(false);
  const [editPostData, setEditPostData] = useState({ title: "", content: "" });

  const DEFAULT_PROFILE_IMG = "/ic_profile.png";
  const MOCK_USER_NAME = "총명한 판다";

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postRes = await fetch(`http://localhost:4000/api/articles/${id}`);
        if (postRes.ok) setPost(await postRes.json());

        const commentsRes = await fetch(
          `http://localhost:4000/api/articles/${id}/comments`,
        );
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData.data || commentsData || []);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
    if (id) fetchPostDetail();
  }, [id]);

  const toggleDropdown = (dropdownId) => {
    setOpenDropdownId((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const handleDeletePost = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("게시글이 삭제되었습니다.");
        router.push("/board");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditModal = async () => {
    setOpenDropdownId(null);
    setIsEditModalOpen(true);
    setIsFetchingEditData(true);

    try {
      const res = await fetch(`http://localhost:4000/api/articles/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEditPostData({ title: data.title, content: data.content });
      }
    } catch (error) {
      console.error("수정 데이터 로딩 실패:", error);
      alert("데이터를 불러오는데 실패했습니다.");
      setIsEditModalOpen(false);
    } finally {
      setIsFetchingEditData(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!editPostData.title.trim() || !editPostData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPostData),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPost((prev) => ({
          ...prev,
          title: editPostData.title,
          content: editPostData.content,
        }));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/articles/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment }),
        },
      );
      if (res.ok) {
        const addedComment = await res.json();
        setComments((prev) => [addedComment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/articles/comments/${commentId}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentContent(comment.content);
    setOpenDropdownId(null);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editCommentContent.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/articles/comments/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editCommentContent }),
        },
      );
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, content: editCommentContent } : c,
          ),
        );
        setEditingCommentId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DropdownMenu = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-md w-32 z-10 overflow-hidden">
      <button
        onClick={onEdit}
        className="w-full text-center py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
      >
        수정하기
      </button>
      <button
        onClick={onDelete}
        className="w-full text-center py-3 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        삭제하기
      </button>
    </div>
  );

  if (!post)
    return <div className="p-10 text-center text-gray-500">로딩 중...</div>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 relative">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex justify-between items-start relative mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
          <button
            onClick={() => toggleDropdown("post")}
            className="text-gray-400 hover:text-gray-600 p-2 flex items-center justify-center"
          >
            <Image src="/ic_kebab.png" alt="메뉴" width={24} height={24} />
          </button>
          {openDropdownId === "post" && (
            <DropdownMenu
              onEdit={handleOpenEditModal}
              onDelete={handleDeletePost}
            />
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={post.image || DEFAULT_PROFILE_IMG}
                alt="프로필"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-gray-700">
              {post.author || MOCK_USER_NAME}
            </span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1">
            <span className="text-gray-400">♡</span> {post.likeCount || 123}
          </div>
        </div>

        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[150px]">
          {post.content}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">댓글달기</h3>
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500 rounded-xl p-4 min-h-[120px] outline-none resize-none pb-14"
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                newComment.trim()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              등록
            </button>
          </div>
        </div>
      </div>

      <div>
        {comments.length > 0 ? (
          <ul className="flex flex-col">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="py-6 border-b border-gray-100 flex gap-4 relative"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <Image
                    src={DEFAULT_PROFILE_IMG}
                    alt="프로필"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 pr-8">
                  {editingCommentId === comment.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={editCommentContent}
                        onChange={(e) => setEditCommentContent(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-md"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-md"
                        >
                          수정완료
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="font-medium text-gray-800 text-sm">
                          익명
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </>
                  )}
                </div>
                {!editingCommentId && (
                  <div className="absolute right-0 top-6">
                    <button
                      onClick={() => toggleDropdown(`comment-${comment.id}`)}
                      className="text-gray-400 hover:text-gray-600 p-2 flex items-center justify-center"
                    >
                      <Image
                        src="/ic_kebab.png"
                        alt="메뉴"
                        width={20}
                        height={20}
                      />
                    </button>
                    {openDropdownId === `comment-${comment.id}` && (
                      <DropdownMenu
                        onEdit={() => startEditComment(comment)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Image
              src="/Img_reply_empty.png"
              alt="댓글 아이콘"
              width={140}
              height={140}
            />
            <p>아직 댓글이 없어요,</p>
            <p>지금 댓글을 달아보세요!</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <Link href="/board">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 font-medium flex items-center gap-2 transition-all shadow-sm">
            목록으로 돌아가기
            <Image
              src="/ic_back.png"
              alt="목록으로 돌아가기 아이콘"
              width={24}
              height={24}
            />
          </button>
        </Link>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">게시글 수정</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {isFetchingEditData ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-medium">
                    데이터를 불러오는 중입니다...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editPostData.title}
                    onChange={(e) =>
                      setEditPostData({
                        ...editPostData,
                        title: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg p-3 outline-none"
                    placeholder="제목을 입력하세요"
                  />
                  <textarea
                    value={editPostData.content}
                    onChange={(e) =>
                      setEditPostData({
                        ...editPostData,
                        content: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg p-3 outline-none resize-none min-h-[200px]"
                    placeholder="내용을 입력하세요"
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleUpdatePost}
                      className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium transition-colors"
                    >
                      저장하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
