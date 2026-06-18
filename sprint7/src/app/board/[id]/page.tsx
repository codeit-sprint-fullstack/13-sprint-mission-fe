"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { commentService, Comment } from "../../../lib/api/comments";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  likeCount?: number; 
}

const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
};

const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

function CommentItem({ 
  data, 
  onUpdate, 
  onDelete 
}: { 
  data: Comment; 
  onUpdate: (id: number, content: string) => Promise<void>; 
  onDelete: (id: number) => Promise<void> 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  return (
    <div className="flex w-full max-w-[1200px] flex-col border-b border-[#E5E7EB] bg-[#FCFCFC] pb-[12px]">
      <div className="flex w-full items-start justify-between gap-[9px]">
        {isEditing ? (
          <div className="flex w-full flex-col gap-[16px]">
            <textarea 
              value={editContent} 
              onChange={(e) => setEditContent(e.target.value)} 
              className="flex h-[80px] w-full flex-1 resize-none items-start rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none" 
            />
            
            <div className="flex h-[47px] w-full items-end justify-between">
              <div className="flex items-center gap-[8px]">
                <div className="relative h-[32px] w-[32px] overflow-hidden rounded-full bg-gray-100">
                  <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#4B5563]">익명</span>
                  <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#9CA3AF]">{timeAgo(data.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-[4px]">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-[8px] font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#737373] transition-colors hover:text-gray-900"
                >
                  취소
                </button>
                <button 
                  onClick={async () => { 
                    await onUpdate(data.id, editContent); 
                    setIsEditing(false); 
                  }} 
                  className="flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#F3F4F6] transition-colors hover:bg-blue-600"
                >
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="flex-1 font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#1F2937] whitespace-pre-wrap">{data.content}</p>
        )}

        {!isEditing && (
          <div className="relative shrink-0">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative h-[24px] w-[24px]">
              <Image src="/images/ic_kebab.svg" alt="메뉴" fill className="object-contain" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-[32px] z-10 flex w-[139px] flex-col items-start overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-md">
                <button onClick={() => { setIsEditing(true); setIsMenuOpen(false); }} className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] hover:bg-gray-50">수정하기</button>
                {/* 댓글 삭제하기 버튼 색상 수정 완료: text-[#EF4444] -> text-[#6B7280] */}
                <button onClick={() => { onDelete(data.id); setIsMenuOpen(false); }} className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] hover:bg-gray-50">삭제하기</button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="mt-[24px] flex items-center">
          <div className="relative h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
          </div>
          <div className="ml-[8px] flex flex-col items-start gap-[4px]">
            <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#4B5563]">익명</span>
            <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#9CA3AF]">{formatDate(data.createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [likeCount, setLikeCount] = useState<number>(0);

  // --- 게시글 자체 수정/삭제 상태 ---
  const [isArticleMenuOpen, setIsArticleMenuOpen] = useState(false);
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const artRes = await fetch(`${API_BASE_URL}/articles/${id}`, { cache: 'no-store' });
      if (!artRes.ok) {
        router.push('/board');
        return;
      }
      const articleData = await artRes.json();
      setArticle(articleData);
      setLikeCount(articleData.likeCount || 0);

      const allComments = await commentService.getAllByArticleId(id);
      setComments(allComments);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 게시글 삭제 핸들러
  const handleArticleDelete = async () => {
    setIsArticleMenuOpen(false);
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("게시글 삭제 실패");
      alert("게시글이 삭제되었습니다.");
      router.push('/board');
    } catch (error) {
      console.error(error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 게시글 수정 핸들러
  const handleArticleUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent })
      });
      if (!res.ok) throw new Error("게시글 수정 실패");
      
      setIsArticleEditing(false);
      await fetchData(); 
    } catch (error) {
      console.error(error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await commentService.create(id, newComment);
      setNewComment("");
      await fetchData();
    } catch (error) {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleUpdate = async (commentId: number, content: string) => {
    try {
      await commentService.update(commentId, content);
      await fetchData();
    } catch (error) {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    try {
      await commentService.delete(commentId);
      await fetchData();
    } catch (error) {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleLikeClick = async () => {
    setLikeCount((prev) => prev + 1);
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${id}/like`, { method: 'POST' });
      if (!res.ok) throw new Error("좋아요 실패");
    } catch (error) {
      console.error(error);
      setLikeCount((prev) => prev - 1);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  if (isLoading) return <div className="mx-auto flex w-full max-w-[1200px] justify-center py-20 font-['Pretendard'] text-[#9CA3AF]">로딩 중...</div>;
  if (!article) return null;

  return (
    <div className="mx-auto max-w-[1200px] py-8 px-4">
      
      {/* 1. 상단 제목 & 케밥 메뉴 (수정 모드 분기) */}
      {isArticleEditing ? (
        <div className="mb-[24px] flex w-full flex-col">
          <input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            placeholder="제목을 입력해주세요"
            className="w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[20px] font-bold text-[#1F2937] outline-none placeholder:text-[#9CA3AF]" 
          />
        </div>
      ) : (
        <div className="mb-[24px] flex w-full items-start justify-between gap-[16px]">
          <h1 className="font-['Pretendard'] text-[20px] font-bold text-[#1F2937] break-all">{article.title}</h1>
          <div className="relative shrink-0">
            <button onClick={() => setIsArticleMenuOpen(!isArticleMenuOpen)} className="relative block h-[24px] w-[24px]">
              <Image src="/images/ic_kebab.svg" alt="메뉴" fill className="object-contain" />
            </button>
            {isArticleMenuOpen && (
              <div className="absolute right-0 top-[32px] z-10 flex w-[139px] flex-col items-start overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-md">
                <button onClick={() => { 
                  setIsArticleEditing(true); 
                  setEditTitle(article.title); 
                  setEditContent(article.content); 
                  setIsArticleMenuOpen(false); 
                }} className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] hover:bg-gray-50">수정하기</button>
                {/* 게시글 삭제하기 버튼 색상 수정 완료: text-[#EF4444] -> text-[#6B7280] */}
                <button onClick={handleArticleDelete} className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] hover:bg-gray-50">삭제하기</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. 작성자 프로필 및 좋아요 영역 */}
      {!isArticleEditing && (
        <>
          <div className="mb-[24px] flex items-center">
            <div className="relative mr-[16px] h-[32px] w-[32px] overflow-hidden rounded-full bg-gray-100">
              <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
            </div>
            <span className="mr-[8px] font-['Pretendard'] text-[14px] font-normal text-[#4B5563]">익명</span>
            <span className="mr-[32px] font-['Pretendard'] text-[14px] font-normal text-[#9CA3AF]">{formatDate(article.createdAt)}</span>
            <div className="mr-[32px] h-[14px] w-[1px] bg-[#E5E7EB]" />
            
            <button 
              onClick={handleLikeClick} 
              className="flex h-[36px] items-center gap-[6px] rounded-[18px] border border-[#E5E7EB] bg-white px-[12px] transition-colors hover:bg-gray-50 active:scale-95"
            >
              <div className="relative h-[18px] w-[18px]">
                <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
              </div>
              <span className="font-['Pretendard'] text-[14px] font-medium text-[#4B5563]">
                {likeCount}
              </span>
            </button>
          </div>
          <div className="mb-[24px] h-[1px] w-full bg-[#E5E7EB]" />
        </>
      )}

      {/* 3. 게시글 내용 영역 (수정 폼 전환 처리) */}
      {isArticleEditing ? (
        <div className="mb-[40px] flex w-full flex-col gap-[16px]">
          <textarea 
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
            placeholder="내용을 입력해주세요"
            className="flex h-[282px] w-full resize-none items-start rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]" 
          />
          <div className="flex justify-end gap-[8px]">
            <button 
              onClick={() => setIsArticleEditing(false)} 
              className="px-[16px] py-[8px] font-['Pretendard'] text-[16px] font-semibold text-[#737373] hover:text-gray-900"
            >
              취소
            </button>
            <button 
              onClick={handleArticleUpdate} 
              className="rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] font-['Pretendard'] text-[16px] font-semibold text-[#FFF] hover:bg-blue-600"
            >
              수정 완료
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-[40px] font-['Pretendard'] text-[18px] font-normal leading-[26px] text-[#1F2937] whitespace-pre-wrap">{article.content}</p>
      )}
      
      {/* 4. 댓글 영역 (게시글 수정 중일 때는 산만하지 않게 숨김 처리) */}
      {!isArticleEditing && (
        <>
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-['Pretendard'] text-[16px] font-semibold text-[#111827]">댓글달기</h2>
            <textarea 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              className="h-[104px] w-full resize-none rounded-[12px] bg-[#F3F4F6] p-[16px] font-['Pretendard'] text-[16px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]" 
              placeholder="댓글을 입력해주세요."
            />
            <div className="flex justify-end">
              <button 
                onClick={handleCommentSubmit} 
                disabled={!newComment.trim()}
                className={`flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] px-[23px] py-[12px] font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#F3F4F6] transition-colors ${
                  newComment.trim() ? 'bg-[#3692FF] hover:bg-blue-600' : 'cursor-not-allowed bg-[#9CA3AF]'
                }`}
              >
                등록
              </button>
            </div>
          </div>

          {comments.length === 0 ? (
            <div className="mt-[40px] flex w-full flex-col items-center justify-center">
              <div className="relative h-[150px] w-[150px] shrink-0">
                <Image src="/images/Img_reply_empty.svg" alt="댓글 없음" fill className="object-contain" />
              </div>
              <p className="mt-[16px] text-center font-['Pretendard'] text-[14px] font-normal leading-[22px] text-[#9CA3AF]">
                아직 댓글이 없어요,<br />
                지금 댓글을 달아보세요!
              </p>
            </div>
          ) : (
            <div className="mt-[40px] flex flex-col gap-[24px]">
              {comments.map((c) => <CommentItem key={c.id} data={c} onUpdate={handleUpdate} onDelete={handleDelete} />)}
            </div>
          )}

          <div className="mt-[48px] flex w-full justify-center">
            <Link href="/board" className="flex h-[48px] w-[240px] shrink-0 items-center justify-center gap-[8px] rounded-[40px] bg-[#3692FF] py-[12px] transition-colors hover:bg-blue-600">
              <span className="whitespace-nowrap text-center font-['Pretendard'] text-[18px] font-semibold leading-[26px] text-[#F3F4F6]">목록으로 돌아가기</span>
              <div className="relative h-[24px] w-[24px] shrink-0">
                <Image src="/images/ic_back.svg" alt="목록으로" fill className="object-contain" />
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}