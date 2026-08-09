import Button from "./Button";

interface IModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled: boolean;
}

export default function Modal({ text, disabled, ...buttonProps }: IModalProps) {
  return (
    <div
      className={`fixed flex inset-0 items-center justify-center bg-black/70 z-500 ${disabled && "hidden"}`}
    >
      <div className="w-[540px] h-[250px] flex flex-col items-center justify-center gap-[4.7rem] rounded-[0.8rem] bg-white p-[28px] text-[1.6rem] font-medium">
        <p className="text-[16px] font-medium">{text}</p>
        <Button
          variant="rectangle"
          disabled={false}
          {...buttonProps}
          className="bg-primary"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
