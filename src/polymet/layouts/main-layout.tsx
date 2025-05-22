import { ReactNode } from "react";
import Header from "@/polymet/components/header";
import Footer from "@/polymet/components/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
