import AllProducts from "../components/items/AllProducts";
import styles from "./ItemPage.module.css";

// 페이지 컴포넌트는 "조립"만 담당.
// <main>: 페이지의 메인 콘텐츠 영역을 의미하는 시맨틱 태그.
// .container: Navbar/Footer와 동일한 max-width 1200px + 좌우 패딩 → 일관된 정렬.
export default function ItemPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AllProducts />
      </div>
    </main>
  );
}
