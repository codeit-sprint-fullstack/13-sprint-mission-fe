import React, { useState } from 'react';
import { useWindowSize } from "./hooks/useWindowSize";

export default function ProductAdd({ onBack }) {
  const windowWidth = useWindowSize();

  let containerWidth = '1000px'; 
  if (windowWidth <= 767) {
    containerWidth = '100%';    
  } else if (windowWidth <= 1199) {
    containerWidth = '696px';   
  }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isNameError = formData.name.length > 10;
  const isDescError = formData.description.length > 0 && formData.description.length < 10;
  const isPriceError = formData.price.length > 0 && isNaN(Number(formData.price));
  const isTagsError = formData.tags.length > 5;

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.tags) {
      alert("모든 입력란을 채워주세요!");
      return; 
    }

    if (isNameError || isDescError || isPriceError || isTagsError) {
      alert("입력란 밑의 빨간색 경고 문구를 확인하고 수정해주세요!");
      return;
    }

    alert("완벽합니다! 상품 등록 완료! 🎉");
  };

  return (
    <main style={{ padding: '40px 20px', width: containerWidth, margin: '0 auto' }}>
      
      {/* 1️⃣ 상단 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>상품 등록하기</h2>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '12px 36px',
            backgroundColor: '#9CA3AF', 
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          등록
        </button>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 2️⃣ 상품명 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '18px', fontWeight: 'bold' }}>상품명</label>
          <input
            type="text"
            name="name"
            placeholder="상품명을 입력해주세요"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: '16px',
              backgroundColor: '#F3F4F6', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px'
            }}
          />
          {isNameError && <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>10자 이내로 입력해주세요</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '18px', fontWeight: 'bold' }}>상품 소개</label>
          <textarea
            name="description"
            placeholder="상품 소개를 입력해주세요"
            rows="10" 
            value={formData.description}
            onChange={handleChange}
            style={{
              padding: '16px',
              backgroundColor: '#F3F4F6', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              resize: 'none'
            }}
          />
          {isDescError && <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>10자 이상 입력해주세요</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '18px', fontWeight: 'bold' }}>판매가격</label>
          <input
            type="text"
            name="price"
            placeholder="판매가격을 입력해주세요"
            value={formData.price}
            onChange={handleChange}
            style={{
              padding: '16px',
              backgroundColor: '#F3F4F6', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px'
            }}
          />
          {isPriceError && <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>숫자로 입력해주세요</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '18px', fontWeight: 'bold' }}>태그</label>
          <input
            type="text"
            name="tags"
            placeholder="태그를 입력해주세요"
            value={formData.tags}
            onChange={handleChange}
            style={{
              padding: '16px',
              backgroundColor: '#F3F4F6', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px'
            }}
          />
          {isTagsError && <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>5글자 이내로 입력해주세요</span>}
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#F3F4F6',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#374151'
              }}
            >
              <span>#티셔츠</span>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#9CA3AF', 
                  color: '#ffffff', 
                  borderRadius: '50%',
                  fontSize: '12px',
                  cursor: 'pointer',
                  paddingBottom: '2px'
                }}
              >
                x
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* 뒤로 가기 버튼 */}
      <button 
        onClick={onBack} 
        style={{ marginTop: '40px', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textDecoration: 'underline' }}
      >
        뒤로 가기
      </button>
    </main>
  );
}