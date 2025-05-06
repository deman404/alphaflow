import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import LoggedInWelcome from "@/components/LoggedInWelcome";

import { supabase } from "../../supabaseClient";

const Signup = () => {
  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create an account with a backend
    toast.info(
      "Email signup functionality will be implemented with backend integration"
    );
  };

  const handleGoogleSignup = async () => {
    toast.info("You login with Google");
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

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
  if (!session) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col justify-center px-4 py-12">
          <Card className="w-full bg-card/50 backdrop-blur-sm border border-white/10">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Welcome to Alphaflow
              </CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-gray-100 border border-gray-200"
                onClick={handleGoogleSignup}
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>

              
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    return <LoggedInWelcome />;
  }
};

export default Signup;
