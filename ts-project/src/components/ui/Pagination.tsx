import Button from "./Button";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { getTotalPage, getRange } from "@/utils/pagination";

interface IPaginationProps {
  currentPage: number;
  totalCount: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  totalCount,
  onChange,
}: IPaginationProps) {
  const size = useResponsiveWidth();
  const pageSize = size === "mobile" ? 4 : size === "tablet" ? 6 : 10;

  const totalPage = getTotalPage(pageSize, totalCount);
  const numbers = getRange(currentPage, totalPage);

  return (
    <div className="mx-auto mt-[43px] flex w-fit justify-center gap-[4px]">
      <Button
        disabled={false}
        variant="circle"
        onClick={() => {
          if (currentPage > 1) onChange((prev) => prev - 1);
        }}
      >
        <div className="m-auto flex h-[16px] w-[16px] items-center justify-center text-[12px] font-bold">
          <p>{"<"}</p>
        </div>
      </Button>

      {numbers.map((n, i) => (
        <Button
          key={i}
          disabled={false}
          variant="circle"
          onClick={() => {
            onChange(n);
          }}
          className={`${n === currentPage && "bg-primary text-secondary-100"}`}
        >
          <div className="m-auto flex h-[16px] w-[16px] items-center justify-center text-[12px] font-bold">
            <p>{n}</p>
          </div>
        </Button>
      ))}

      <Button
        disabled={false}
        variant="circle"
        onClick={() => {
          if (currentPage < totalPage) onChange((prev) => prev + 1);
        }}
      >
        <div className="m-auto flex h-[16px] w-[16px] items-center justify-center text-[12px] font-bold">
          <p>{">"}</p>
        </div>
      </Button>
    </div>
  );
}
