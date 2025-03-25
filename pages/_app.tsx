import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppLayout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ErrorBoundary from "@/components/Layout/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
