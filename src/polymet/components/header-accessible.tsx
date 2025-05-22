import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";

export default function HeaderAccessible() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme based on localStorage or system preference
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center"
            aria-label="BuildConnect Home"
          >
            <div
              className="mr-2 h-8 w-8 rounded-full bg-primary"
              aria-hidden="true"
            ></div>
            <span className="text-xl font-bold">BuildConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center space-x-6 md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            to="#"
            className="text-sm font-medium hover:text-primary"
            aria-current={currentPath === "/features" ? "page" : undefined}
          >
            Features
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:text-primary"
            aria-current={currentPath === "/organizations" ? "page" : undefined}
          >
            Organizations
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:text-primary"
            aria-current={currentPath === "/pricing" ? "page" : undefined}
          >
            Pricing
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:text-primary"
            aria-current={currentPath === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:text-primary"
            aria-current={currentPath === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button
              variant="outline"
              className="focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Log In
            </Button>
            <Button className="focus-visible:ring-2 focus-visible:ring-offset-2">
              Sign Up
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="container mx-auto px-4 pb-4 md:hidden"
          onKeyDown={handleKeyDown}
        >
          <nav
            className="flex flex-col space-y-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-current={currentPath === "/features" ? "page" : undefined}
            >
              Features
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-current={
                currentPath === "/organizations" ? "page" : undefined
              }
            >
              Organizations
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-current={currentPath === "/pricing" ? "page" : undefined}
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-current={currentPath === "/about" ? "page" : undefined}
            >
              About
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-current={currentPath === "/contact" ? "page" : undefined}
            >
              Contact
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                Log In
              </Button>
              <Button className="flex-1 focus-visible:ring-2 focus-visible:ring-offset-2">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
