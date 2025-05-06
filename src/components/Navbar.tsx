import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md py-4 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">
            Alpha<span className="text-primary">.flow</span>
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Pricing
          </a>
        </div>

        {session ? (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-primary/50 hover:border-primary"
                asChild
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-primary/50 hover:border-primary"
                asChild
              >
                <Link to="/signup">Login</Link>
              </Button>
            </div>
          </>
        )}

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10 animate-fade-in">
          <div className="container flex flex-col py-4 gap-4">
            <a
              href="#features"
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="p-2 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
