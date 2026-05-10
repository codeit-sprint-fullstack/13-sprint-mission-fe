import React, { useState } from 'react';

export default function ProductList() {
  const [products] = useState([
    { _id: '1', name: '귀여운 판다 인형', price: 15000, description: '부드러운 촉감의 판다 인형입니다.' },
    { _id: '2', name: '대나무 칫솔 세트', price: 5000, description: '환경을 생각하는 친환경 대나무 칫솔' },
    { _id: '3', name: '판다 마우스패드', price: 8000, description: '손목이 편안한 푹신한 마우스패드' },
  ]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🐼 판매 중인 상품</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {products.map((product) => (
          <div 
            key={product._id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
              <p style={{ margin: '0', color: '#666' }}>{product.description}</p>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2b2b2b' }}>
              {product.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}