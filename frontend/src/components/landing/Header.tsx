'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";

export function LandingHeader() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Ítems de navegación
  const navItems = [
    { href: "#features", label: "Características", section: "features" },
    { href: "#solutions", label: "Soluciones", section: "solutions" },
    { href: "#customers", label: "Clientes", section: "customers" },
    { href: "#resources", label: "Recursos", section: "resources" },
    { href: "#pricing", label: "Precios", section: "pricing" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Para establecer el estado inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <header className="h-16 bg-gray-950"></header>
    );
  }

  return (
    <header
      id="main-header"
      className={
        `border-b fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/30 backdrop-blur-md shadow-md text-black' 
            : 'bg-gray-950 text-white'
        }`
      }
    >
      <nav className="container flex h-16 items-center justify-between px-4 sm:px-8 max-w-full pr-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center lg:gap-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <Image
              src="/assets/icons/payLynk-logo.png"
              alt="PayLynk Logo"
              width={60}
              height={60}
              className={`object-contain transition-all duration-500 `}
            />
            <span
              className="text-xl lg:text-2xl font-medium transition-all duration-500"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              PayLink
            </span>
          </Link>
          {/* Navegación para pantallas grandes */}
          <div className="hidden md:flex items-center gap-6 !ml-10">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={item.href}
                onClick={e => handleScrollToSection(e, item.section)}
                className="hover:opacity-80 transition-opacity font-medium  duration-500"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Botones de acción para pantallas grandes */}
        <div className="hidden md:flex items-center gap-4 !pr-6">
          <Button
            size="lg"
            className={`rounded-xs text-xs text-center lg:text-lg w-24 lg:w-36 font-semibold px-6 py-3 transition-all duration-500 ${
              scrolled
                ? 'bg-white !text-black hover:bg-gray-200'
                : 'bg-white !text-black hover:bg-slate-400'
            }`}
            asChild
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <Link href="/login" style={{ fontFamily: 'Roboto, sans-serif' }}>Iniciar Sesión</Link>
          </Button>
          <Button
            size="lg"
            className={`rounded-xs w-24 text-xs lg:text-lg lg:w-36 px-8 font-semibold py-4 transition-all duration-500 ${
              scrolled
                ? 'bg-[#5899fc] text-white hover:bg-[#257af9]'
                : 'bg-gray-950 !text-[#FECA72] hover:bg-purple-700 hover:!text-white'
            }`}
            asChild
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <Link href="/register" style={{ fontFamily: 'Roboto, sans-serif' }}>Registrarse</Link>
          </Button>
        </div>

        {/* Menú hamburguesa para mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`bg-transparent hover:bg-white hover:bg-opacity-20 transition-all duration-500 ${
                  scrolled 
                    ? 'border-black text-black' 
                    : 'border-white text-white'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <MenuIcon className="" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-violet-700 to-yellow-500 text-white border-none h-screen max-h-screen" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <nav className="flex flex-col space-y-4 pt-8 h-full justify-between" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div className="flex flex-col !pt-20 items-center gap-12">
                  {navItems.map((item) => (
                  <Button
                    key={item.section}
                    variant="secondary"
                    className="w-32 h-12 pt-8 rounded-xl bg-transparent text-white text-lg shadow-xl hover:bg-purple-900 transition-colors"
                    asChild
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    <a
                    href={item.href}
                    onClick={e => handleScrollToSection(e, item.section)}
                    className="flex items-center justify-center"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                    {item.label}
                    </a>
                  </Button>
                  ))}
                </div>
                <div className="flex flex-col gap-6 items-center !pb-10">
                  <Button
                    variant="ghost"
                    className="bg-transparent text-lg !text-black w-36 h-12 hover:bg-white hover:!text-black transition-all duration-500"
                    asChild
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    <Link href="/login" style={{ fontFamily: 'Roboto, sans-serif' }}>Iniciar Sesión</Link>
                  </Button>
                  <Button
                    className="bg-transparent text-lg !text-black hover:bg-purple-900 hover:!text-white transition-all duration-500 w-36 h-12"
                    asChild
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    <Link href="/register" style={{ fontFamily: 'Roboto, sans-serif' }}>Registrarse</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}