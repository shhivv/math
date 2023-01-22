import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Inter } from '@next/font/google'
import { Red_Hat_Display } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const rhd = Red_Hat_Display({
  subsets: ['latin'],
  variable: "--font-rhd"
})

export default function App({ Component, pageProps }: AppProps) {
  return  <main className={`${inter.variable} ${rhd.variable} font-sans`}>
  <Component {...pageProps} />
</main>
}
