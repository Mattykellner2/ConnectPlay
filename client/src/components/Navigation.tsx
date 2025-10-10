import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary" data-testid="link-home">
              ConnectPlay
            </a>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/partnerships">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-universities">
                Universities
              </span>
            </Link>
            <Link href="/become-speaker">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-professionals">
                Industry Professionals
              </span>
            </Link>
            <Link href="/about">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-about">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-contact">
                Contact
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="toggle-elevate"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/student-access">
              <Button variant="ghost" data-testid="button-student-login">
                Student Login
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" data-testid="button-admin-login">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
