import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Users } from "lucide-react";
import { toast } from "sonner";
import { User } from "firebase/auth";
import { getProfile, upsertProfile } from "../../../database/Profile";
import { AuthService } from "../../../services/auth";
import { error } from "console";

interface Profile {
  name: string;
  email: string;
  company: string;
  role: string;
}

export default function profile() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
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

  const handleSave = async () => {
    if (!session?.email) {
      toast.error("No user session found");
      return;
    }

    // Check if there are actual changes
    if (company === userProfile?.company && role === userProfile?.role) {
      toast.info("No changes to save");
      return;
    }

    try {
      // Create updated profile object
      const updatedProfile = {
        ...userProfile,
        email: session.email,
        name: session.displayName || userProfile?.name || "",
        company: company || userProfile?.company || "",
        role: role || userProfile?.role || "",
      };

      // Update state
      setUserProfile(updatedProfile);

      // Save to database
      const { error } = await upsertProfile(updatedProfile);
      if (error) {
        throw new Error(error);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast.error("Failed to save profile");
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              {session?.photoURL ? (
                <>
                  <img
                    src={session?.photoURL}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                </>
              ) : (
                <Users className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium">Profile Photo</p>
              <p className="text-sm text-muted-foreground">
                Your photo will be used on your profile and in comments.
              </p>
              {/* <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  Upload
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              </div> */}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1  gap-4">
            <div className="space-y-2">
              <label htmlFor="first-name" className="text-sm font-medium">
                First name
              </label>
              <Input
                id="first-name "
                defaultValue={userProfile?.name}
                readOnly
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                defaultValue={userProfile?.email}
                readOnly
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company
              </label>
              <Input
                id="company"
                placeholder="name of company"
                defaultValue={userProfile?.company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Input
                id="role"
                placeholder="your role in the company"
                defaultValue={userProfile?.role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <div className="space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
