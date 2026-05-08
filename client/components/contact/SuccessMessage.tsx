function SuccessMessage({ message }: Readonly<{ message: string }>) {
  return (
    <div className="border border-(--color-border-subtle) bg-(--color-bg-surface-subtle) px-4 py-3 text-sm text-(--color-fg-primary)">
      {message}
    </div>
  );
}

export default SuccessMessage;
