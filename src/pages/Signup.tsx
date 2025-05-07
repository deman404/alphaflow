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
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) handleNewUser(session.user);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN" && session) {
        await handleNewUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNewUser = async (user, retries = 3) => {
    try {
      const { error } = await supabase
        .from('profile')
        .upsert({
          user_id: user.id,
          name: user.user_metadata?.full_name || user.email,
          email: user.email,
          company: null
        }, { onConflict: 'user_id' });
  
      if (error) throw error;
      
    } catch (error) {
      if (retries > 0 && error.message.includes('permission denied')) {
        // Wait 500ms and try again
        await new Promise(resolve => setTimeout(resolve, 500));
        return handleNewUser(user, retries - 1);
      }
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // Redirect to current origin
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

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
                onClick={handleGoogleLogin}
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
