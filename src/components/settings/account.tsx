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
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function account() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        fetchProfileOrFallback(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        fetchProfileOrFallback(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfileOrFallback = async (session) => {
    const userId = session.user.id;

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      console.error("Profile not found, falling back to session data:", error);

      // Fallback to session data
      const fallbackProfile = {
        user_id: userId,
        name: session.user.user_metadata?.name,
        email: session.user.user_metadata?.email,
        picture: session.user.user_metadata?.picture,
      };
      setUserProfile(fallbackProfile);
    } else {
      console.log("Profile loaded from DB:", data);
      setUserProfile(data);
    }
  };

  const DeleteAcount = async () => {
    if (email === userProfile?.email) {
      const { error } = await supabase.auth.admin.deleteUser(
        userProfile?.user_id
      );
      supabase.auth
        .signOut()
        .then(() => {
          toast.success("Account deleted successfully");
          setDialogOpen(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          toast.error("Error deleting account");
        });
    } else if (email === "") {
      toast.error("Please enter your email address to confirm deletion");
    } else {
      toast.error("Email address does not match");
    }
  };
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and security
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-muted-foreground">Email</span>
                <span>{userProfile?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-muted-foreground">Account Type</span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                  {userProfile?.plans}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-muted-foreground">Member Since</span>
                <span>
                  {new Date(userProfile?.created_at).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app to generate one-time codes.
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>

          {/* <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sessions</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Chrome on MacOS</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>San Francisco, USA</span>
                      <span className="mx-1">•</span>
                      <span>Current session</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Log Out
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Safari on iPhone</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>San Francisco, USA</span>
                      <span className="mx-1">•</span>
                      <span>Last active: 2 days ago</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div> */}

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
            <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      type down your email address {userProfile?.email} to
                      confirm account deletion.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="name"
                        placeholder="email address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="col-span-4"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      type="submit"
                      onClick={() => {
                        DeleteAcount();
                      }}
                    >
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
