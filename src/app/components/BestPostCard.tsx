import Link from 'next/link';
import { getMockLikeCount } from '@/lib/articles';
import ArticleImage from '@/app/components/ArticleImage';
import type { Article } from '@/types';

interface BestPostCardProps {
  article: Article;
  rank: number;
}

function formatDate(str?: string): string {
  const date = new Date(str ?? '');
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function formatLike(n: number): string | number {
  return n > 9999 ? '9999+' : n;
}

export default function BestPostCard({ article, rank }: BestPostCardProps) {
  const nickname = article.writer?.nickname ?? '알 수 없음';
  const likeCount  = article.likeCount  ?? getMockLikeCount(article.id);
  const image      = article.image;

  return (
    <Link href={`/boards/${article.id}`} className="group block">
      <article className="relative h-[154px] rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:shadow-md">
        <span className="absolute left-6 top-0 inline-flex h-8 w-[94px] -translate-y-px items-center justify-center rounded-b-xl bg-[#3692FF] text-sm font-bold text-white">
          🏆 Best
        </span>
        <div className="mt-8 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[#1F2937] transition-colors group-hover:text-[#3692FF]">
              {article.title}
            </h3>
          </div>
          <ArticleImage
            src={image}
            alt=""
            width={48}
            height={48}
            className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
          />
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-[#9CA3AF]">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">
              {nickname?.[0] ?? "?"}
            </span>
            <span className="font-medium text-[#6B7280]">{nickname}</span>
            <span>♡ {formatLike(likeCount)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{formatDate(article.createdAt)}</span>
            <span className="text-xs text-slate-300">#{rank}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
