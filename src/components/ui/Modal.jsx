import Button from "./Button";

export default function Modal({ text, disabled, ...buttonProps }) {
  return (
    <div
      className={`fixed flex h-dvh w-dvw items-center justify-center bg-black/70 z-500 ${disabled && "hidden"}`}
    >
      <div className="w-[540px] h-[250px] flex flex-col items-center justify-center gap-[4.7rem] rounded-[0.8rem] bg-white p-[28px] text-[1.6rem] font-medium">
        <p className="text-[16px] font-medium">{text}</p>
        <Button variant="rectangle" {...buttonProps} className="bg-primary">
          확인
        </Button>
      </div>
    </div>
  );
}
