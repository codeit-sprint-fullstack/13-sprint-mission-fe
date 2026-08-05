import Link from 'next/link';
import { getMockNickname, getMockLikeCount } from '@/lib/articles';
import ArticleImage from '@/app/components/ArticleImage';
import type { Article } from '@/types';

interface PostCardProps {
  article: Article;
}

function formatDate(str?: string): string {
  const date = new Date(str ?? '');
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function formatLike(n: number): string | number {
  return n > 9999 ? '9999+' : n;
}

export default function PostCard({ article }: PostCardProps) {
  const nickname = article.writer?.nickname ?? getMockNickname(article.id);
  const likeCount  = article.likeCount  ?? getMockLikeCount(article.id);
  const image      = article.image;

  return (
    <Link href={`/boards/${article.id}`} className="group block border-b border-[#E5E7EB] py-6 last:border-0">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-xl font-semibold text-[#1F2937] transition-colors group-hover:text-[#3692FF]">
            {article.title}
          </h3>
          <div className="mt-12 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">
              {nickname?.[0] ?? "?"}
            </span>
            <span className="font-medium text-[#6B7280]">{nickname}</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
        <ArticleImage
          src={image}
          alt=""
          width={72}
          height={72}
          className="h-[72px] w-[72px] shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
        />
      </div>

      <div className="mt-[-22px] flex justify-end text-base text-[#6B7280]">
        <span>♡ {formatLike(likeCount)}</span>
      </div>
    </Link>
  );
}
