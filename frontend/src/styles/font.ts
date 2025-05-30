import { Inter, Space_Grotesk  , Roboto } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  weight: ["400", "700"],
});


export const roboto = Roboto({
  subsets: ["latin"],
  variable: '--font-roboto',
  weight: ["400", "500", "700"],
});

