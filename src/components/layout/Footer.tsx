import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/Logo.png";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <Link href="/" className="font-display font-bold text-xl text-white transition-opacity hover:opacity-80 flex items-center gap-2">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image 
                src={Logo} 
                alt="Logo" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <span className="leading-none">CVMatch<span className="text-accent">.AI</span></span>
          </Link>
        </div>
        <p className="text-muted text-sm font-medium">© 2026 CVMatch.AI. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <Link href="/termos" className="text-muted hover:text-white transition-colors text-sm font-medium">Termos de Uso</Link>
          <Link href="/privacidade" className="text-muted hover:text-white transition-colors text-sm font-medium">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
