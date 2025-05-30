import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header
      className="border-b  backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="container bg-gray-950 flex h-16 items-center justify-between px-4 sm:px-8 max-w-full pr-4 " >
      {/* Logo Section */}
      <Link href="/" className="flex items-center lg:gap-2">
        <Image
        src="/assets/icons/payLynk-logo.png"
        alt="PayLynk Logo"
        width={60}
        height={60}
        className="object-contain"
        />
        <span
        className="text-xl lg:text-2xl font-medium  text-white"
        style={{ fontFamily: "Roboto, sans-serif" }}
        >
        PayLynk
        </span>
      </Link>

      <div>

      </div>

      {/* Navigation Buttons */}
      <div className=" flex items-center justify-end w-full gap-4 lg:gap-8 !pr-4">
        <Button
        size="lg"
        className="rounded-xs text-xs text-center lg:text-lg  w-24 lg:w-36 bg-white hover:bg-slate-400 transition-colors font-semibold px-6 py-3"
        asChild
        style={{ fontFamily: "Roboto, sans-serif" }}
        >
        <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button
        size="lg"
        className="rounded-xs !text-[#FECA72] w-24 text-xs lg:text-lg lg:w-36 bg-gray-950 hover:bg-purple-900 hover:!text-white transition-colors px-8 font-semibold py-4 "
        asChild
        style={{ fontFamily: "Roboto, sans-serif" }}
        >
        <Link href="/register">Registrarse</Link>
        </Button>
      </div>
      </nav>
    </header>
  );
}
