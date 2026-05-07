function SuccessMessage({ message }: Readonly<{ message: string }>) {
  return (
    <div className="border border-(--border) bg-(--cream) px-4 py-3 text-sm text-(--text)">
      {message}
    </div>
  );
}

export default SuccessMessage;
