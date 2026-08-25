export type InputProps =
  | ({
      multiline?: boolean;
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
      className?: string;
    } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
      multiline: true;
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
      className?: string;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

export type FormFieldProps = InputProps & {
  title: string;
  errorMsg?: string;
  children?: React.ReactNode;
};
