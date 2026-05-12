import styles from "@/styles/PageNation.module.css";
import leftArrow from "@/assets/icons/btn_left .png";
import rightArrow from "@/assets/icons/btn_right.png";

export default function PageNation({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const PAGE_BLOCK = 5;

  const currentBlock = Math.ceil(currentPage / PAGE_BLOCK);
  const startPage = (currentBlock - 1) * PAGE_BLOCK + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pageNation}>
      <button
        className={styles.arrowBtn}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <img src={leftArrow} alt="왼쪽 화살표 버튼" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrowBtn}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <img src={rightArrow} alt="오른쪽 화살표 버튼" />
      </button>
    </div>
  );
}
