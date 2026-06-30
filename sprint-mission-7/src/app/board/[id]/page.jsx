"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { TextArea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DropDown from "@/components/ui/DropDown";
import Profile from "../../../../public/icons/profile.svg";
import Back from "../../../../public/icons/back.svg";
import ReplyEmpty from "../../../../public/icons/reply_empty.svg";

export default function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [content, setContent] = useState("");
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(true);

  // 인라인 수정 상태
  const [editingId, setEditingId] = useState(null); // 수정 중인 댓글 id
  const [editContent, setEditContent] = useState("");

  const router = useRouter();

  // 댓글 불러오는 함수
  const getReplies = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `http://localhost:4000/boards/${id}/replies`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error("fetch 실패:", error);
    }
  }, [id]);

  // 게시글 불러오기
  useEffect(() => {
    if (!id) return;

    const getBoard = async () => {
      try {
        const response = await fetch(`http://localhost:4000/boards/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBoard(data);
      } catch (error) {
        console.error("fetch 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    getBoard();
  }, [id]);

  // 댓글 최초 로드
  useEffect(() => {
    getReplies();
  }, [getReplies]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:4000/boards/${id}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContent("");
      await getReplies();
    } catch (error) {
      console.error(error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  // 수정 시작: 해당 댓글을 수정 모드로 + 기존 내용 채우기
  const startEdit = (reply) => {
    setEditingId(reply.id);
    setEditContent(reply.content);
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  // 수정 저장
  const submitEdit = async (replyId) => {
    if (!editContent.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/replies/${replyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      if (!res.ok) throw new Error("수정 실패");

      cancelEdit(); // 수정 모드 종료 + 입력값 초기화
      await getReplies(); // 목록 갱신
    } catch (err) {
      console.error(err);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const deleteReply = async (replyId) => {
    try {
      const res = await fetch(`http://localhost:4000/replies/${replyId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      await getReplies();
    } catch (err) {
      console.error(err);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  if (loading) return <div>불러오는 중...</div>;
  if (!board) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-[1200px] m-auto p-4 tablet:pt-4 px-6 min-h-300">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 min-w-0 break-words">{board.title}</div>
          <div className="shrink-0"></div>
        </div>
        <div>
          <div className="flex py-4 gap-4 items-center ">
            <Image src={Profile} height={32} width={32} alt="프로필" />
            <div className="">
              임시 회원{" "}
              <span className="">
                {format(new Date(board.createdAt), "yyyy.MM.dd")}{" "}
              </span>
            </div>
            <div className="">좋아요</div>
          </div>
        </div>
      </div>

      <div className="mt-4">{board.content}</div>

      <div className="mt-8">댓글달기</div>
      <div className="mt-[9px]">
        <TextArea
          placeholder={"댓글을 입력해주세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></TextArea>
      </div>
      <div className="flex justify-end mt-4">
        <Button size={"small"} variant={"secondary"} onClick={handleSubmit}>
          등록
        </Button>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {replies === null ? (
          // 1) 아직 불러오는 중
          <div className="py-10 text-center text-sm text-gray-400">
            댓글을 불러오는 중...
          </div>
        ) : replies.length === 0 ? (
          // 2) 댓글이 하나도 없을 때 (빈 화면)
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Image src={ReplyEmpty} width={120} height={120} alt="" />
            <p className="text-sm text-gray-400">
              아직 댓글이 없어요.
              <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        ) : (
          // 3) 댓글이 있을 때
          replies.map((reply) => (
            <div
              key={reply.id}
              className="pb-3 border-b bg-[#fcfcfc] border-gray-300"
            >
              {editingId === reply.id ? (
                <div className="flex flex-col gap-2">
                  <TextArea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      size={"small"}
                      variant={"secondary"}
                      onClick={cancelEdit}
                    >
                      취소
                    </Button>
                    <Button size={"small"} onClick={() => submitEdit(reply.id)}>
                      저장
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>{reply.content}</div>
                  <DropDown
                    onEdit={() => startEdit(reply)}
                    onDelete={() => deleteReply(reply.id)}
                  />
                </div>
              )}

              <div className="mt-6">
                <div className="flex">
                  <Image src={Profile} height={32} width={32} alt="프로필" />
                  <div className="ml-2">
                    <div className="text-xs text-[#4B5563]">ssss</div>
                    <div className="text-xs text-[#9CA3AF]">
                      {format(new Date(reply.createdAt), "yyyy.MM.dd")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => router.push("/board")}>
          목록으로 돌아가기{"    "}
          <Image src={Back} height={24} width={24} alt="뒤로가기" />
        </Button>
      </div>
    </div>
  );
}
