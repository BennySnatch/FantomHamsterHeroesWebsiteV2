import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AppContextProvider } from "../context/AppContext";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
export default MyApp;
