import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="border-b  bg-[#E5F6FF] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16  items-center justify-between max-w-[87vw] mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/payLynk-logo.png"
            alt="payLynk Logo"
            width={100}
            height={100}
          />
          <span className="text-xl font-semibold text-black">PayLynk.</span>
        </div>

        <div className="flex items-center gap-4 content-start  text-white ">
          <Button
            size="lg"
            className="w-full font-bold rounded-full px-4 py-3 border-2 bg-slate-400 hover:bg-slate-600 transition-colors"
            asChild
          >
            <Link href="/">Iniciar Sesion</Link>
          </Button>
          <Button
            size="lg"
            className="w-full rounded-full font-bold px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
            asChild
          >
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
