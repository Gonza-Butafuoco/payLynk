"use client";
import { LandingHeader } from "@/components/landing/Header";
import { LandingFooter } from "@/components/landing/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TrustedCompanies from "@/components/landing/TrustedCompanies";

const textContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

// Variantes para el mockup del teléfono
const phoneMockupVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

// Variantes para la notificación "PAYLINK"
const notificationVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 } },
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-violet-700 to-yellow-500 overflow-hidden" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <LandingHeader />

      {/* Sección Hero */}
      <section className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24 pt-24 md:pt-32">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Columna Izquierda: Mockups de teléfono y monitor */}
          <motion.div
            className="relative flex justify-center lg:justify-end w-full"
            variants={phoneMockupVariants}
            initial="hidden"
            animate="show"
          >
            {/* Monitor más grande detrás */}
            <div className="relative w-[90vw] max-w-[340px] md:max-w-5xl md:w-[400px] md:h-[270px] lg:w-[600px] lg:h-[340px] h-[220px] bg-white rounded-xl shadow-xl !border-[4px] md:!border-[6px] border-black z-0 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/monitorimage.png"
                alt="Monitor Mockup"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Teléfono más pequeño delante */}
            <div className="absolute right-4 md:-right-10 top-14  w-[90px] h-[180px] sm:w-[120px] sm:h-[240px] md:w-[160px] md:h-[320px] bg-black rounded-[18px] sm:rounded-[24px] md:rounded-[28px] shadow-2xl z-10 !border-[4px] md:!border-[6px] border-black p-1 md:p-2 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/phoneimage.png"
                alt="Phone Mockup"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Logo Paylink más centrado y separado, adaptado a mobile */}
            <motion.div
              className="absolute -bottom-20 sm:-bottom-28 left-1/2 -translate-x-1/2 flex flex-row items-center"
              variants={notificationVariants}
              initial="hidden"
              animate="show"
            >
              <Image
                src="/assets/icons/payLynk-logo.png"
                alt="PayLynk Logo"
                width={60}
                height={60}
                className="object-contain sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]"
              />
              <span className="font-bold text-2xl sm:text-4xl md:text-5xl text-gray-950 ml-2">
                PayLink
              </span>
            </motion.div>
          </motion.div>

          {/* Columna Derecha: Contenido de texto y CTA */}
          <motion.div
            className="flex flex-col items-center md:!pl-4 !pt-12 md:!pt-0  md:items-start text-center md:text-left w-full"
            variants={textContainerVariants}
            initial="hidden"
            animate="show"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <motion.div
              className="inline-flex items-center bg-transparent shadow-xl  bg-opacity-20 rounded-lg !px-3 sm:px-4 !py-2 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-gray-800"
              variants={textItemVariants}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <p
                className="text-2xl sm:text-4xl md:text-3xl font-bold leading-tight !m-  text-gray-950"
              >
                ¡Presentamos PayLink!
              </p>
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-4xl !pt-3 lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-gray-950"
              variants={textItemVariants}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <p
                className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-gray-950"
              >
                TU ALIADO PARA PAGOS RAPIDOS <br/> Y SEGUROS 
              </p>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-950 !pt-3 !pb-8  max-w-xs sm:max-w-lg"
              variants={textItemVariants}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Con PayLink, puedes gestionar todas tus transacciones y pagos de manera
              rápida y segura. Desde tu teléfono o computadora, controla tus finanzas
              con facilidad y sin complicaciones.
            </motion.p>
            <motion.div
              className="bg-transparent hover:bg-purple-800 hover:text-[#6AF6FF] transition-all duration-500 text-2xl md:text-3xl !p-1 md:!p-2 shadow-xl rounded-xl !font-bold "
              variants={textItemVariants}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <Button
                size="lg"
                className="!m-2 !bg-transparent !border-0 focus:!ring-0 focus:!outline-none active:!ring-0 active:!outline-none shadow-none"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <Link href="/register" className="!bg-transparent border-0 focus:outline-none focus:ring-0 active:outline-none active:ring-0" style={{ fontFamily: "Roboto, sans-serif" }}>Abrir una Cuenta PayLink</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TrustedCompanies />
      <LandingFooter />
    </div>
  );
}
