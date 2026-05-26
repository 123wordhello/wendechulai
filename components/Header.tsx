import Link from "next/link";

interface HeaderProps {
  showNav?: boolean;
}

export function Header({ showNav = true }: HeaderProps) {
  return (
    <header className="border-b border-brand-100/80 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 has-[.admin-shell]:max-w-6xl">
        <Link href="/" className="group flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-soft"
            aria-hidden
          >
            问
          </span>
          <span className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
            问得出来
          </span>
        </Link>
        {showNav && (
          <nav className="flex items-center gap-3 text-sm sm:gap-4">
            <Link
              href="/explore"
              className="text-gray-600 hover:text-brand-600 transition-colors hidden sm:inline"
            >
              探索
            </Link>
            <Link
              href="/map"
              className="text-gray-600 hover:text-brand-600 transition-colors"
            >
              理解地图
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-brand-600 transition-colors hidden sm:inline"
            >
              训练体系
            </Link>
            <Link
              href="/admin/cards"
              className="text-gray-400 hover:text-brand-600 transition-colors hidden md:inline"
            >
              内容管理
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
