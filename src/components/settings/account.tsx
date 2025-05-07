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
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutDashboard,
  Plus,
  Search,
  Settings as SettingsIcon,
  User,
  BarChart3,
  FileText,
  LogOut,
  Bell,
  Shield,
  CreditCard,
  Server,
  KeyRound,
  Mail,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../../supabaseClient";

export default function account() {
  const handleSave = () => {
    toast.success("Settings updated successfully");
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
                <span>alex@example.com</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-muted-foreground">Account Type</span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                  Pro Plan
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-muted-foreground">Member Since</span>
                <span>March 15, 2025</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="current-password"
                  className="text-sm font-medium"
                >
                  Current Password
                </label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm New Password
                </label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button onClick={handleSave}>Update Password</Button>
            </div>
          </div>

          <Separator />

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

          <Separator />

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
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
            <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
