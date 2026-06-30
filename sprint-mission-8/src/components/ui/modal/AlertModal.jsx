import React from "react";
import Button from "../Button";

export default function AlertModal({ close, content }) {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-center items-center w-81.75 h-55 tablet:w-135 tablet:h-62.5">
        <div className="flex flex-col gap-10.5 tablet:gap-10">
          <div>{content}</div>
          <Button
            size={"small-48"}
            onClick={close}
            className={"w-30 tablet:w-41.25"}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
