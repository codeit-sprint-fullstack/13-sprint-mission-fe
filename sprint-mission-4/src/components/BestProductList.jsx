// import {
//   getProductList,
//   getProduct,
//   createProduct,
//   patchProduct,
//   deleteProduct,
// } from "../services/ProductService.js";
// import React, { useState, useEffect } from "react";
// import "../pages/Homepage.css";

// export default function BestProductList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       const res = await fetch(`https://panda-market-api.vercel.app/`);
//       const data = await res.json();
//       setUsers(data);
//     }
//     fetchUsers();
//   }, []);
//   return (
//     <div className="exercise">
//       <h3>문제 1: 사용자 목록 가져오기</h3>
//       <p>
//         <code>https://jsonplaceholder.typicode.com/users</code>에서 10명의
//         사용자를 불러와 화면에 표시하세요.
//       </p>

//       <ul className="practice-list">
//         {users.map((user) => (
//           <li key={user.id}>
//             <span>
//               <strong>{user.name}</strong>
//               <span
//                 style={{ color: "var(--text)", marginLeft: 8, fontSize: 13 }}
//               >
//                 {user.email}
//               </span>
//             </span>
//             <span className="badge">{user.company?.name}</span>
//           </li>
//         ))}
//       </ul>

//       <p className="expected">
//         기대 결과: 페이지 진입 시 사용자 10명이 이름·이메일·회사명과 함께
//         목록으로 보여야 합니다.
//       </p>
//     </div>
//   );
// }
import React from "react";

// export default function BestProductList() {
//   return (
//     <div>BestProductList</div>
//   )
// }

// 1. [함수 파트] 외부로 내보낼 수도 있는 로직 함수들
// 파일 상단에 작성하면 이 파일 안에서 자유롭게 쓸 수 있습니다.
export const checkConnection = () => {
  alert("연결 성공! 함수가 정상적으로 호출되었습니다. 🎉");
};

export const getSum = (a, b) => {
  return a + b;
};

// 2. [컴포넌트 파트] 화면을 그리는 메인 부분
export default function BestProductList() {
  const testValue = getSum(100, 200);

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f0f8ff",
        borderRadius: "15px",
        textAlign: "center",
        border: "2px dashed #007bff",
        margin: "20px",
      }}
    >
      <h1 style={{ color: "#007bff" }}>통합 테스트 페이지</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <h3>1. 함수 실행 확인</h3>
        <button
          onClick={checkConnection}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          클릭해서 함수 호출하기
        </button>
      </div>

      <div
        style={{ padding: "15px", background: "#fff", borderRadius: "10px" }}
      >
        <h3>2. 데이터 계산 확인</h3>
        <p>
          함수 결과값 (100 + 200): <strong>{testValue}</strong>
        </p>
      </div>

      <p style={{ marginTop: "20px", color: "#666" }}>
        ※ 이 화면이 보인다면 JSX와 JS 로직이 한 파일에서 잘 돌아가는 것입니다.
      </p>
    </div>
  );
}
