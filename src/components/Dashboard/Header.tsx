import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { AuthService } from "../../../services/auth";
import { getProfile } from "../../../database/Profile";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  name: string;
  email: string;
  // Add other profile fields as needed
}

export default function Header() {
  const navigate = useNavigate();
  const [session, setSession] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (user) => {
      setSession(user);
      if (user) {
        try {
          const { profile, error } = await getProfile(user.email || "");
          if (error) throw new Error(error);
          setUserProfile(profile);
        } catch (error) {
          toast.error("Failed to load profile");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        {loading ? (
          <Skeleton className="h-4 w-48 mt-1" />
        ) : (
          <p className="text-muted-foreground">
            {session
              ? `Welcome back, ${userProfile?.name || session.email}!`
              : "Please sign in"}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto ">
        <div className="relative flex-1 md:flex-none border border-dashed border-black/15 rounded-md">
          <Input
            placeholder="Search workflows..."
            className="pl-8 bg-background w-full md:w-60 border-none"
          />
          <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative border border-dashed border-black/15"
        >
          <Bell className="h-4 w-4" />
          {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span> */}
        </Button>

        {loading ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : session ? (
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors border border-dashed border-black/15">
            <span className="text-sm font-medium">
              {userProfile?.name?.charAt(0)?.toUpperCase() ||
                session.email?.charAt(0)?.toUpperCase() ||
                "U"}
            </span>
          </button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
