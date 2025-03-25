import { ReactNode } from "react";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import { useRouter } from "next/router";
import { SEO } from "./SEO";
import ErrorBoundary from "./ErrorBoundary";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export const AppLayout = ({ 
  children,
  title,
  description,
  keywords,
  ogImage 
}: AppLayoutProps) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        ogImage={ogImage}
      />
      <div className="min-h-screen flex flex-col bg-blue-50/30 dark:bg-gray-900">
        <Nav />
        <main className={`flex-grow ${!isHomePage ? "pt-16" : ""}`}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </>
  );
};
