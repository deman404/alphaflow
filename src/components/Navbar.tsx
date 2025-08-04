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
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"}>
            <span className="text-2xl font-bold text-gray-900">
              Alpha<span className="text-primary">Flow</span>
            </span>
          </Link>
        </div>

        {session ? (
          <>
            <div className=" md:flex items-center gap-4">
              <Button variant="default" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className=" md:flex items-center gap-4">
              <Button variant="default" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
