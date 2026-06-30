import React from "react";
import AlertModal from "./AlertModal";

export default function Modal({ close, type, content }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {type === "alert" ? (
          <AlertModal content={content} close={close} />
        ) : (
          <div className="rounded-lg bg-white p-6">컨펌 모달 아직</div>
        )}
      </div>
    </div>
  );
}
