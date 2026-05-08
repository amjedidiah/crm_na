import Link from "next/link";

function FloatingGiveButton() {
  return (
    <Link
      href="/give"
      className="fixed right-5 bottom-5 z-40 border border-(--color-border-accent) bg-(--color-bg-emphasis) px-4 py-3 text-xs tracking-[0.2em] text-(--color-fg-accent) uppercase md:hidden"
    >
      Give
    </Link>
  );
}

export default FloatingGiveButton;
