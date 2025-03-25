import { ReactNode } from "react";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import { useRouter } from "next/router";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-blue-50/30">
      <Nav />
      <main className={`flex-grow ${!isHomePage ? "pt-16" : ""}`}>
      {/* <main> */}
        {children}
      </main>
      <Footer />
    </div>
  );
};
