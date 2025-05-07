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

export default function integrations() {
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect third-party services and tools to enhance your workflows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Connected Services</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center mr-4">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m0 4v.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-muted-foreground">
                    Connected on April 12, 2025
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-600"
              >
                Disconnect
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center mr-4">
                  <svg
                    className="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Google Drive</p>
                  <p className="text-sm text-muted-foreground">
                    Connected on March 27, 2025
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-600"
              >
                Disconnect
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Integrations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your Instagram account
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your LinkedIn profile
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">YouTube</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your YouTube channel
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 2H3v16h5v4l4-4h5l4-4V2z" />
                      <path d="M11 11V7m0 4v.01" />
                      <path d="M16 11V7m0 4v.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Twitch</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your Twitch account
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Browse All Integrations</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
