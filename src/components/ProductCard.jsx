import { useState } from 'react'

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=400&q=80', // 시계
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&h=400&q=80', // 운동화
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&h=400&q=80', // 선글라스
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&h=400&q=80', // 향수
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&h=400&q=80', // 카메라
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=400&q=80', // 나이키
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=400&q=80', // 헤드폰
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&h=400&q=80', // 이어폰
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=400&q=80', // 소파
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=400&h=400&q=80', // 에어팟
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&h=400&q=80', // 노트북
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&h=400&q=80', // 가방
  'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=400&h=400&q=80', // 자켓
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&h=400&q=80', // 화장품
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&h=400&q=80', // 키보드
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&h=400&q=80', // 스마트워치
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&h=400&q=80', // 장난감
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&h=400&q=80', // 키보드2
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=400&q=80', // 전자기기
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&h=400&q=80', // 운동화2
]

function getFallbackImage(id) {
  const idx = typeof id === 'number' ? id : String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`
  return `${Math.floor(diff / 2592000)}달 전`
}

function ImagePlaceholder() {
  return (
    <div className="img-placeholder">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
    </div>
  )
}

export default function ProductCard({ product, isBest = false }) {
  const fallback = getFallbackImage(product.id)
  const [imgSrc, setImgSrc] = useState(product.images?.[0] || fallback)
  const tags = (product.tags || []).slice(0, 2)

  function handleError() {
    if (imgSrc !== fallback) setImgSrc(fallback)
  }

  return (
    <li className={`product-card${isBest ? ' best' : ''}`}>
      <div className="card-img-wrap">
        <img src={imgSrc} alt={product.name} onError={handleError} />
      </div>
      <div className="card-body">
        <div className="card-tags">
          {tags.map((t) => <span key={t} className="tag"># {t}</span>)}
        </div>
        <p className="card-name">{product.name}</p>
        <p className="card-price">{product.price.toLocaleString()}원</p>
        <div className="card-footer">
          <span className="card-like">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {product.favoriteCount ?? 0}
          </span>
          <span className="card-date">{timeAgo(product.createdAt)}</span>
        </div>
      </div>
    </li>
  )
}
