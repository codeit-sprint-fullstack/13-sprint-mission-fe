"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchClient } from "../../../lib/api/fetchClient";

// 날짜 포맷팅 함수 (YYYY. MM. DD)
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
};

// 상대 시간 계산 함수
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  createdAt: string;
  favoriteCount: number;
  isFavorite?: boolean;
  image?: string;
  images?: string[];
  ownerId?: number;
  ownerNickname?: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

// ----------------------------------------------------
// 1. 상품 전용 댓글 아이템 컴포넌트
// ----------------------------------------------------
function ProductCommentItem({ data, onUpdate, onDelete }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);
  const authorName = data.writer?.nickname || "익명";

  return (
    <div className="flex w-full flex-col border-b border-[#E5E7EB] py-[16px]">
      <div className="flex w-full items-start justify-between gap-[16px]">
        {isEditing ? (
          <div className="flex w-full flex-col gap-[12px]">
            <textarea 
              value={editContent} 
              onChange={(e) => setEditContent(e.target.value)} 
              className="flex h-[80px] w-full resize-none rounded-[12px] bg-[#F3F4F6] px-[16px] py-[12px] font-['Pretendard'] text-[14px] outline-none" 
            />
            <div className="flex justify-end gap-[20px]">
              <button onClick={() => setIsEditing(false)} className="text-[14px] font-semibold text-[#737373]">취소</button>
              <button 
                onClick={async () => { await onUpdate(data.id, editContent); setIsEditing(false); }} 
                className="rounded-[8px] bg-[#3692FF] px-[16px] py-[8px] text-[14px] font-semibold text-white"
              >
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <p className="flex-1 font-['Pretendard'] text-[14px] text-[#1F2937] whitespace-pre-wrap">{data.content}</p>
        )}

        {!isEditing && (
          <div className="relative shrink-0">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-[24px] w-[24px]">
              <Image src="/images/ic_kebab.svg" alt="메뉴" width={24} height={24} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-[32px] z-10 flex w-[140px] flex-col shadow-md rounded-[8px]">
                <button 
                  onClick={() => { setIsEditing(true); setIsMenuOpen(false); }} 
                  className="flex h-[46px] w-full items-center justify-center gap-[10px] rounded-t-[8px] border-l border-r border-t border-[#D1D5DB] bg-[#FFF] px-0 pb-[12px] pt-[16px] font-['Pretendard'] text-[14px] text-[#6B7280] hover:bg-gray-50"
                >
                  수정하기
                </button>
                <button 
                  onClick={const_handleDelete => { onDelete(data.id); setIsMenuOpen(false); }} 
                  className="flex h-[46px] w-full items-center justify-center gap-[10px] rounded-b-[8px] border-b border-l border-r border-[#D1D5DB] bg-[#FFF] px-[17px] pb-[16px] pt-[12px] font-['Pretendard'] text-[14px] text-[#6B7280] hover:bg-gray-50"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {!isEditing && (
        <div className="mt-[12px] flex items-center">
          <div className="relative h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
          </div>
          
          <div className="ml-[8px] flex flex-col justify-center">
            <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#4B5563]">
              {authorName}
            </span>
            <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#9CA3AF]">
              {timeAgo(data.createdAt)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. 상품 상세 페이지 메인 컴포넌트
// ----------------------------------------------------
export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const prodRes = await fetchClient(`/products/${id}`);
      const prodData = await prodRes.json();
      setProduct(prodData);
      setIsFavorite(prodData.isFavorite || false);
      setFavoriteCount(prodData.favoriteCount || 0);

      const commRes = await fetchClient(`/products/${id}/comments?limit=100`);
      const commData = await commRes.json();
      setComments(commData.list || commData.data || commData || []);
    } catch (error) {
      alert("존재하지 않거나 삭제된 상품입니다.");
      router.push('/items');
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFavorite = async () => {
    const prevIsFavorite = isFavorite;
    const prevCount = favoriteCount;
    setIsFavorite(!prevIsFavorite);
    setFavoriteCount(prevCount + (prevIsFavorite ? -1 : 1));
    try {
      if (prevIsFavorite) {
        await fetchClient(`/products/${id}/favorite`, { method: 'DELETE' });
      } else {
        await fetchClient(`/products/${id}/favorite`, { method: 'POST' });
      }
    } catch (error) {
      setIsFavorite(prevIsFavorite);
      setFavoriteCount(prevCount);
      alert("관심 상품 등록에 실패했습니다. (로그인이 필요합니다)");
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm("정말 이 상품을 삭제하시겠습니까?")) return;
    try {
      await fetchClient(`/products/${id}`, { method: 'DELETE' });
      alert("상품이 삭제되었습니다.");
      router.push('/items');
    } catch (error) {
      alert("본인이 등록한 상품만 삭제할 수 있습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await fetchClient(`/products/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: newComment }),
      });
      setNewComment("");
      await fetchData();
    } catch (error) {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await fetchClient(`/comments/${commentId}`, { method: 'PATCH', body: JSON.stringify({ content }) });
      await fetchData();
    } catch (error) {
      alert("본인의 댓글만 수정할 수 있습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await fetchClient(`/comments/${commentId}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      alert("본인의 댓글만 삭제할 수 있습니다.");
    }
  };

  if (isLoading) return <div className="flex w-full justify-center py-20 text-[#9CA3AF]">상품 정보를 불러오는 중입니다...</div>;
  if (!product) return null;

  const thumbnail = product.image || (product.images && product.images[0]) || "/images/image 71.svg";

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-[24px] py-[32px] pb-[80px]">
      
      <div className="flex w-full flex-col gap-[24px] md:flex-row md:gap-[32px]">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-gray-50 md:w-[480px]">
          <Image src={thumbnail} alt={product.name} fill className="object-cover" priority />
        </div>
        
        <div className="flex w-full flex-col py-[12px]">
          <div className="flex flex-col items-start gap-[16px]">
            <div className="flex w-full items-start justify-between">
              <h1 className="font-['Pretendard'] text-[24px] font-bold text-[#1F2937] md:text-[32px]">{product.name}</h1>
              <div className="relative shrink-0">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-[32px] w-[32px]">
                  <Image src="/images/ic_kebab.svg" alt="메뉴" width={32} height={32} />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-[40px] z-10 flex w-[140px] flex-col rounded-[8px] border border-[#E5E7EB] bg-white shadow-md">
                    <Link href={`/items/${id}/edit`} className="px-[16px] py-[12px] text-[16px] text-[#6B7280] hover:bg-gray-50">수정하기</Link>
                    <button onClick={handleDeleteProduct} className="px-[16px] py-[12px] text-left text-[16px] text-[#6B7280] hover:bg-gray-50">삭제하기</button>
                  </div>
                )}
              </div>
            </div>
            
            <span className="font-['Pretendard'] text-[32px] font-bold text-[#1F2937] md:text-[40px]">
              {product.price.toLocaleString()}원
            </span>
          </div>

          <div className="mt-[16px] flex w-full flex-col border-t border-[#E5E7EB] pt-[24px]">
            <h3 className="font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#4B5563]">
              상품 소개
            </h3>
            
            <p className="mt-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#4B5563] whitespace-pre-wrap">
              {product.description}
            </p>
            
            <h3 className="mt-[24px] font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#4B5563]">
              상품 태그
            </h3>
            
            {product.tags && product.tags.length > 0 && (
              <div className="mt-[16px] flex flex-wrap gap-[8px]">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="rounded-[20px] bg-[#F3F4F6] px-[12px] py-[6px] font-['Pretendard'] text-[14px] text-[#4B5563]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-[62px] flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
                </div>
                <div className="ml-[16px] flex flex-col justify-center">
                  <span className="font-['Pretendard'] text-[14px] font-medium leading-[24px] text-[#4B5563]">
                    {product.ownerNickname || "익명"}
                  </span>
                  <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#9CA3AF]">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-[40px] w-[1px] bg-[#E5E7EB]" />
                <button 
                  onClick={handleFavorite}
                  className={`ml-[24px] flex h-[40px] flex-row items-center gap-[4px] rounded-full border px-[12px] py-[4px] transition-colors active:scale-95 ${
                    isFavorite 
                      ? "border-[#F74747] bg-[#F74747] text-white" 
                      : "border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50"
                  }`}
                >
                  <div className="relative h-[24px] w-[24px]">
                    <Image 
                      src="/images/ic_heart.svg" 
                      alt="좋아요" 
                      fill 
                      className={`object-contain ${isFavorite ? "brightness-0 invert" : ""}`} 
                    />
                  </div>
                  <span className="font-['Pretendard'] text-[16px] font-medium leading-[26px]">
                    {favoriteCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-[40px] w-full border-t border-[#E5E7EB]" />

      <div className="flex w-full flex-col">
        <h2 className="font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#111827]">
          문의하기
        </h2>
        
        <div className="mt-[9px] mb-[40px] flex w-full flex-col gap-[16px]">
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            className="flex h-[104px] w-full items-start gap-[10px] resize-none rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[14px] md:text-[16px] outline-none placeholder:text-[#9CA3AF] placeholder:whitespace-pre-wrap" 
          />
          <button 
            onClick={handleCommentSubmit} 
            disabled={!newComment.trim()}
            className={`self-end rounded-[8px] px-[24px] py-[12px] font-['Pretendard'] text-[16px] font-semibold text-white transition-colors ${
              newComment.trim() ? "bg-[#3692FF] hover:bg-blue-600" : "cursor-not-allowed bg-[#9CA3AF]"
            }`}
          >
            등록
          </button>
        </div>

        {/* 💡 [명세 완벽 반영] comments가 없을 때의 Empty State UI 최적화 */}
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[40px]">
            <Image src="/images/Img_inquiry_empty.svg" alt="문의 없음" width={150} height={150} />
            <span className="mt-[16px] font-['Pretendard'] text-[14px] font-normal text-[#9CA3AF]">
              아직 문의가 없어요
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            {comments.map((comment) => (
              <ProductCommentItem 
                key={comment.id} 
                data={comment} 
                onUpdate={handleUpdateComment} 
                onDelete={handleDeleteComment} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-[64px] flex w-full justify-center">
        <Link 
          href="/items" 
          className="flex h-[48px] w-[240px] items-center justify-center gap-[8px] rounded-[40px] bg-[#3692FF] px-[64px] py-[12px] transition-colors hover:bg-blue-600"
        >
          <span className="whitespace-nowrap font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-white">
            목록으로 돌아가기
          </span>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image src="/images/ic_back.svg" alt="목록으로" fill className="object-contain" />
          </div>
        </Link>
      </div>

    </div>
  );
}