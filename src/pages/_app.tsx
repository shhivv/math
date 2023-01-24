import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Karla } from "@next/font/google";
import { Red_Hat_Display } from "@next/font/google";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});
const rhd = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-rhd",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${karla.variable} ${rhd.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
