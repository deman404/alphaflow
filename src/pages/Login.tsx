import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../../services/auth";

import LandingPage from "@/components/LandingPage";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData;
      const { user, error } = await AuthService.login(email, password);

      if (error) {
        throw new Error(error);
      }

      if (!user) {
        throw new Error("Login failed");
      }

      if (!user.emailVerified) {
        toast.warning(
          "Please verify your email address. Check your inbox for the verification link."
        );
        await AuthService.resendVerification();
      }

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";

      if (
        error.message.includes("wrong-password") ||
        error.message.includes("user-not-found")
      ) {
        toast.error("Invalid email or password");
      } else if (error.message.includes("too-many-requests")) {
        toast.error(
          "Account temporarily locked due to too many attempts. Try again later or reset your password."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { user, error } = await AuthService.googleLogin();

      if (error) {
        throw new Error(error);
      }

      if (user) {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(`Google login failed: ${error.message}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col justify-center px-4 py-12">
        <Card className="w-full bg-card/50 backdrop-blur-sm border border-white/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Welcome to{" "}
              <span className="text-primary">
                <Link to={"/"}>Alphaflow</Link>
              </span>
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
              disabled={googleLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              {googleLoading ? "Signing in..." : "Sign in with Google"}
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-3 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleEmailLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
