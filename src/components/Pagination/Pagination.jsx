import { Button } from "@/components";
import { useResponsiveWidth } from "@/hooks";
import { getTotalPage, getRange } from "@/utils/pagination";
import styles from "./Pagination.module.css";

const PAGINATION_LENGTH = 5;

export default function Pagination({ currentPage, totalCount, onChange }) {
  const size = useResponsiveWidth();
  const pageSize = size === "mobile" ? 4 : size === "tablet" ? 6 : 10;

  const totalPage = getTotalPage(pageSize, totalCount);
  const numbers = getRange(currentPage, totalPage);
  return (
    <div className={styles.pagination}>
      <Button
        variant="circle"
        onClick={() => {
          if (currentPage > 1) onChange((prev) => prev - 1);
        }}
      >
        <div className={styles.btnTxt}>
          <p>{"<"}</p>
        </div>
      </Button>
      {numbers.map((n, i) => (
        <Button
          variant={n === currentPage ? "circle-selected" : "circle"}
          onClick={() => {
            onChange(n);
          }}
          key={i}
        >
          <div className={styles.btnTxt}>
            <p>{n}</p>
          </div>
        </Button>
      ))}
      <Button
        variant="circle"
        onClick={() => {
          if (currentPage < totalPage) onChange((prev) => prev + 1);
        }}
      >
        <div className={styles.btnTxt}>
          <p>{">"}</p>
        </div>
      </Button>
    </div>
  );
}
