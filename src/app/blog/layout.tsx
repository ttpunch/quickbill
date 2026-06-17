import Link from 'next/link'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-line bg-paper/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand font-display text-base leading-none text-cream">Q</span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">QuikBil</span>
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted hover:text-ink transition-colors">All articles</Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
