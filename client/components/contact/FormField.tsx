import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { textarea?: false };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { textarea: true };

type FormFieldProps = InputProps | TextareaProps;

function FormField(props: FormFieldProps) {
  if (props.textarea) {
    const { label, name, textarea, className, ...rest } = props;
    return (
      <label className="grid gap-2">
        <span className="text-sm text-(--muted)">{label}</span>
        <textarea
          name={name}
          className="min-h-32 border border-(--border) bg-white px-4 py-3"
          {...rest}
        />
      </label>
    );
  }

  const { label, name, className, ...rest } = props;

  return (
    <label className="grid gap-2">
      <span className="text-sm text-(--muted)">{label}</span>
      <input
        name={name}
        className="border border-(--border) bg-white px-4 py-3"
        {...rest}
      />
    </label>
  );
}

export default FormField;
