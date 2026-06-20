import Input from "./Input";

export default function FormField({ title, children, ...inputProps }) {
  return (
    <section>
      <h2 className="text-secondary-800 font-bold text-[18px]/[26px] mb-[12px]">
        {title}
      </h2>
      <Input {...inputProps} />
      {children}
    </section>
  );
}
