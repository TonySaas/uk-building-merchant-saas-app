import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Brand section */}
      <div className="relative hidden w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 md:block md:w-1/2">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/buildconnect123/1200/800')] bg-cover bg-center opacity-10"></div>
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="mb-8 flex items-center">
            <div className="mr-2 h-12 w-12 rounded-full bg-white"></div>
            <span className="text-3xl font-bold">BuildConnect</span>
          </div>
          <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight">
            Connecting the UK Building Merchant Ecosystem
          </h1>
          <p className="mb-8 max-w-md text-center text-lg text-blue-100">
            A unified platform bringing together suppliers, merchants, and
            consumers through exclusive special offers and promotions
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <img
                src="https://assets.polymet.ai/legal-white-266853"
                alt="Toolbank logo"
                className="mb-2 h-12 w-auto"
              />

              <span className="text-sm font-medium">Toolbank</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <img
                src="https://assets.polymet.ai/polite-lavender-543133"
                alt="NMBS logo"
                className="mb-2 h-12 w-auto"
              />

              <span className="text-sm font-medium">NMBS</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <img
                src="https://picsum.photos/seed/ibc/200/200"
                alt="IBC logo"
                className="mb-2 h-12 w-auto"
              />

              <span className="text-sm font-medium">IBC</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <img
                src="https://picsum.photos/seed/bmf/200/200"
                alt="BMF logo"
                className="mb-2 h-12 w-auto"
              />

              <span className="text-sm font-medium">BMF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth content */}
      <div className="flex w-full items-center justify-center bg-background p-4 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-center md:hidden">
            <Link to="/" className="flex items-center">
              <div className="mr-2 h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold">BuildConnect</span>
            </Link>
          </div>
          {children}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link to="#" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
