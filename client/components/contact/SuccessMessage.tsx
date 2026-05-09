function SuccessMessage({
  message,
  tone,
}: Readonly<{
  message: string;
  tone: "success" | "error";
}>) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={
        isError
          ? "border border-field-error bg-field-error px-4 py-3 text-sm text-fg-error"
          : "border border-(--border-default) bg-(--surface-muted) px-4 py-3 text-sm text-(--text-primary)"
      }
    >
      {isError ? (
        <span className="font-medium">Please review: </span>
      ) : null}
      {message}
    </div>
  );
}

export default SuccessMessage;
