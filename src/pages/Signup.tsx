import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../../services/auth";
import { setProfile } from "../../database/Profile";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password, name } = formData;
      const { user, error: authError } = await AuthService.signUp(
        email,
        password
      );
      if (authError) {
        throw new Error(authError);
      }
      if (!user) {
        throw new Error("User creation failed");
      }

      const profileData = {
        email,
        name,
        createdAt: new Date().toISOString(),
        uid: user.uid, 
        emailVerified: false,
      };

      const { success, error: firestoreError } = await setProfile(profileData);

      if (firestoreError || !success) {
        await AuthService.logout();
        await user.delete();
        throw new Error(firestoreError || "Failed to create profile");
      }

      toast.success(
        "Account created successfully! Please check your email for verification."
      );
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message || "Signup failed. Please try again.";

      if (error.message.includes("email-already-in-use")) {
        toast.error("This email is already registered. Please login instead.");
        navigate("/login");
      } else if (error.message.includes("weak-password")) {
        toast.error("Password should be at least 6 characters");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { user, error } = await AuthService.googleLogin();
    setGoogleLoading(false);

    if (error) {
      toast.error(`Google login failed: ${error}`);
      return;
    }

    if (user) {
      toast.success("Logged in successfully!");
      navigate("/");
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
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-100 border border-gray-200"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              {googleLoading ? "Signing up..." : "Sign up with Google"}
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-3 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleEmailSignup}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="alex"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
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
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
