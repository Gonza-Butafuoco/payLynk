import { LandingHeader } from "@/components/landing/Header";
import { LandingFooter } from "@/components/landing/Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main
        className="flex-grow p-8 bg-cover bg-center sm:p-20"
        style={{ backgroundImage: "url('/assets/images/gradient.svg')" }}
      >
        <h1>
          <p
            className="font-bold text-white text-3xl text-center"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Bienvenido a nuestra página de inicio
          </p>
        </h1>
        <p className="text-center text-white mt-4">
          Este es el contenido principal de la página.
        </p>
      </main>
      <LandingFooter />
    </div>
  );
}
