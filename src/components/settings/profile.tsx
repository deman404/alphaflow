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
import { Settings as SettingsIcon, User } from "lucide-react";
import { toast } from "sonner";

export default function profile() {
  const [session, setSession] = useState(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const fetchProfileOrFallback = async (session) => {};

  const handleSave = async () => {};

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
              {session?.user?.user_metadata?.avatar_url ? (
                <>
                  <img
                    src={userProfile?.picture}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                </>
              ) : (
                <User className="h-8 w-8 text-primary" />
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
