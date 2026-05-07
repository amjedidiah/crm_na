import Link from "next/link";

function FloatingGiveButton() {
  return (
    <Link
      href="/give"
      className="fixed right-5 bottom-5 z-40 border border-(--gold) bg-(--navy) px-4 py-3 text-xs tracking-[0.2em] text-(--gold) uppercase md:hidden"
    >
      Give
    </Link>
  );
}

export default FloatingGiveButton;
