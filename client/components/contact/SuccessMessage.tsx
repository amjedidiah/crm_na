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
          ? "border border-red-800/35 bg-red-950/4 px-4 py-3 text-sm text-(--color-fg-primary)"
          : "border border-(--color-border-subtle) bg-(--color-bg-surface-subtle) px-4 py-3 text-sm text-(--color-fg-primary)"
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
