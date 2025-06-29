import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/useContext"
import { HeroUIProvider } from "@heroui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </HeroUIProvider>
  );
}
