import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { PostType } from "@/types/post";
import React from "react";

interface IPostFormProps {
  data: Pick<PostType, "title" | "content">;
  setData: React.Dispatch<
    React.SetStateAction<Pick<PostType, "title" | "content">>
  >;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export default function PostForm({ data, setData, onSubmit }: IPostFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="m-auto w-[1200px] py-[16px] flex-1 max-desktop:px-[20px] max-desktop:w-full"
    >
      <div className="flex justify-between items-center  mb-[32px]">
        <h1 className=" text-secondary-800 font-bold text-[20px]/[32px]">
          게시글 쓰기
        </h1>
        <Button
          type="submit"
          disabled={!data?.title || !data?.content}
          className="bg-primary text-white px-[23px] py-[12px] rounded-[8px]"
        >
          등록
        </Button>
      </div>
      <div className="flex flex-col gap-[24px] mb-[62px]">
        <FormField
          title="*제목"
          value={data?.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData((prev) => ({ ...prev, title: e.target.value }));
          }}
          placeholder="제목을 입력해주세요"
        />
        <FormField
          title="*내용"
          multiline={true}
          value={data?.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setData((prev) => ({ ...prev, content: e.target.value }));
          }}
          placeholder="내용을 입력해주세요"
          className="h-[282px]"
        />
      </div>
    </form>
  );
}
