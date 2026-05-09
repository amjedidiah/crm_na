import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  /** Shown under the control; sets aria-invalid when present. */
  error?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { textarea?: false };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { textarea: true };

type FormFieldProps = InputProps | TextareaProps;

const invalidFieldClass =
  "border-red-800/35 bg-red-950/[0.04] aria-invalid:border-red-800/45";

function FormField(props: FormFieldProps) {
  if (props.textarea) {
    const { label, name, textarea, className, error, id, ...rest } = props;
    const fieldId = id ?? name;
    const errId = error ? `${fieldId}-error` : undefined;
    return (
      <label className="grid gap-2">
        <span className="text-sm text-(--color-fg-secondary)">{label}</span>
        <textarea
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={errId}
          className={`min-h-32 border border-(--color-border-subtle) bg-(--color-bg-input) px-4 py-3 text-(--color-fg-primary) ${error ? invalidFieldClass : ""} ${className ?? ""}`}
          {...rest}
        />
        {error ? (
          <span id={errId} className="text-sm text-red-900/90 dark:text-red-200/90" role="alert">
            {error}
          </span>
        ) : null}
      </label>
    );
  }

  const { label, name, className, error, id, ...rest } = props;
  const fieldId = id ?? name;
  const errId = error ? `${fieldId}-error` : undefined;

  return (
    <label className="grid gap-2">
      <span className="text-sm text-(--color-fg-secondary)">{label}</span>
      <input
        id={fieldId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errId}
        className={`border border-(--color-border-subtle) bg-(--color-bg-input) px-4 py-3 text-(--color-fg-primary) ${error ? invalidFieldClass : ""} ${className ?? ""}`}
        {...rest}
      />
      {error ? (
        <span id={errId} className="text-sm text-red-900/90 dark:text-red-200/90" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default FormField;
