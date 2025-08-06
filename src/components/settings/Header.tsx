import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell } from "lucide-react";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../database/Profile";
import { AuthService } from "../../../services/auth";
import { toast } from "sonner";

interface HeaderProps {
  hname: String;
  hdescription: String;
}
interface Profile {
  name: string;
  email: string;
  // Add other profile fields as needed
}
export default function Header({ hname, hdescription }: HeaderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">{hname}</h1>
        <p className="text-muted-foreground">{hdescription}</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="relative border border-dashed border-black/15"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-dashed border-black/15">
          <span className="text-sm font-medium">
            {session?.displayName.toString().charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
