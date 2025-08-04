import React from "react";
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

const Login = () => {
  const navigate = useNavigate();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    toast.info(
      "Email login functionality will be implemented with backend integration"
    );
  };

  const handleGoogleLogin = () => {
    // In a real app, this would authenticate with Google
    toast.info(
      "Google authentication will be implemented with backend integration"
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col justify-center px-4 py-12">
        <Card className="w-full bg-card/50 backdrop-blur-sm border border-white/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Welcome to <span className="text-primary"><Link to={"/"}>Alphaflow</Link></span>
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
              Sign in with Google
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-3 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleEmailLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="alex" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
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
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <p className="text-center text-sm text-muted-foreground">
              have an account?{" "}
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

export default Login;
