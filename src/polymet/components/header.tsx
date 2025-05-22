import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold">BuildConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Organizations
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Features
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Organizations
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              About
            </Link>
            <Link
              to="#"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Contact
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1">
                Log In
              </Button>
              <Button className="flex-1">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
