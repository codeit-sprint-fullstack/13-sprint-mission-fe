"use client";

import { clsx } from "clsx";
import { TailSpin } from "react-loader-spinner";

/**
 * 로딩 스피너
 * @param {string} size - 스피너 크기 (px), 기본 60
 * @param {string} className - 추가 클래스 (wrapper에 적용)
 * @param {boolean} fullHeight - true면 min-h-[350px]로 중앙 배치, false면 인라인(버튼 등)
 */
export default function LoadingDisplay({
  size = "60",
  className = "",
  fullHeight = true,
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        fullHeight ? "min-h-[350px] w-full" : "w-fit h-fit",
        className,
      )}
    >
      <TailSpin
        visible={true}
        height={size}
        width={size}
        color='var(--Primary-200)'
        ariaLabel='tail-spin-loading'
        radius='1'
      />
    </div>
  );
}
