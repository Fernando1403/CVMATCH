import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-white transition-opacity hover:opacity-80">
            CVMatch<span className="text-accent">.AI</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="/como-funciona" className="text-muted hover:text-white transition-colors font-medium">Como funciona</Link>
          <Link href="/diferenciais" className="text-muted hover:text-white transition-colors font-medium">Diferenciais</Link>
          <Link href="/planos" className="text-muted hover:text-white transition-colors font-medium">Planos</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-white hover:text-accent transition-colors font-medium">Entrar</Link>
          <Link href="/auth/cadastro" className="bg-accent hover:bg-accent-hover text-background px-5 py-2.5 rounded-full font-bold transition-colors">
            Começar Grátis
          </Link>
        </div>
      </div>
    </header>
  );
}
