"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-title-md text-gray-800">문제가 발생했어요</h2>
      <p className="text-body-md text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-brand-blue text-white text-btn px-6 h-[42px] rounded-lg"
      >
        다시 시도
      </button>
    </div>
  );
}
