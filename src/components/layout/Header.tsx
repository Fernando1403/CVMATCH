"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-white transition-opacity hover:opacity-80 flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src={Logo}
                alt="Logo CVMatch.AI"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="leading-none">CVMatch<span className="text-accent">.AI</span></span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/como-funciona" className="text-muted hover:text-white transition-colors font-medium">Como funciona</Link>
          <Link href="/diferenciais" className="text-muted hover:text-white transition-colors font-medium">Diferenciais</Link>
          <Link href="/planos" className="text-muted hover:text-white transition-colors font-medium">Planos</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login" className="text-white hover:text-accent transition-colors font-medium">Entrar</Link>
          <Link href="/auth/cadastro" className="bg-accent hover:bg-accent-hover text-background px-5 py-2.5 rounded-full font-bold transition-colors">
            Começar Grátis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-20 left-0 w-full flex flex-col p-6 gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            <Link
              href="/como-funciona"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Como funciona
            </Link>
            <Link
              href="/diferenciais"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Diferenciais
            </Link>
            <Link
              href="/planos"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
          </nav>
          <hr className="border-border" />
          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="text-lg text-white hover:text-accent transition-colors font-medium text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/auth/cadastro"
              className="bg-accent hover:bg-accent-hover text-background px-5 py-4 rounded-xl font-bold transition-colors text-center text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
