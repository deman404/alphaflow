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
import { supabase } from "../../supabaseClient";

//components
import Sidebar from "@/components/settings/Sidebar";
import Header from "@/components/settings/Header";
import Navigation from "@/components/settings/Navigation";
const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [session, setSession] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={toggleSidebar}
      />
      {/* Main Content */}
      <div
        className={`flex-1 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <div className="p-6">
          {/* Header */}
          <Header />

          {/* Settings Navigation and Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Navigation */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content */}
            <div className="md:col-span-3">
              {activeTab === "profile" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                          {session?.user?.user_metadata?.avatar_url ? (
                            <>
                              <img
                                src={session?.user?.user_metadata?.avatar_url}
                                alt="User Avatar"
                                onError={() =>
                                  console.log("Error loading image")
                                }
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
                            Your photo will be used on your profile and in
                            comments.
                          </p>
                          <div className="flex gap-2 mt-2">
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
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1  gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name"
                            className="text-sm font-medium"
                          >
                            First name
                          </label>
                          <Input
                            id="first-name "
                            defaultValue={session?.user?.user_metadata?.name}
                            readOnly
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={session?.user?.user_metadata?.email}
                            readOnly
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-sm font-medium"
                          >
                            Company
                          </label>
                          <Input id="company" defaultValue="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="role" className="text-sm font-medium">
                            Role
                          </label>
                          <Input id="role" defaultValue="Product Manager" />
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
              )}

              {activeTab === "account" && (
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
                        <h3 className="text-lg font-medium">
                          Account Information
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-muted-foreground">Email</span>
                            <span>alex@example.com</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-muted-foreground">
                              Account Type
                            </span>
                            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                              Pro Plan
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-muted-foreground">
                              Member Since
                            </span>
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
                            <label
                              htmlFor="new-password"
                              className="text-sm font-medium"
                            >
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
                        <h3 className="text-lg font-medium">
                          Two-Factor Authentication
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">
                              Use an authenticator app to generate one-time
                              codes.
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
                        <h3 className="text-lg font-medium text-red-500">
                          Danger Zone
                        </h3>
                        <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
                          <h4 className="font-medium mb-2">Delete Account</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Once you delete your account, there is no going
                            back. Please be certain.
                          </p>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "billing" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Pro Plan</p>
                          <p className="text-sm text-muted-foreground">
                            $49/month, renews on June 1, 2025
                          </p>
                        </div>
                        <Button variant="outline">Change Plan</Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-white/20 rounded mr-3 flex items-center justify-center text-xs">
                                VISA
                              </div>
                              <div>
                                <p className="font-medium">
                                  Visa ending in 4242
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Expires 12/2026
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                          <Button variant="outline">Add Payment Method</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">
                            Billing History
                          </h3>
                          <Button variant="outline" size="sm">
                            Download All
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <div>
                              <p className="font-medium">May 1, 2025</p>
                              <p className="text-xs text-muted-foreground">
                                Pro Plan - Monthly
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-4">$49.00</span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <div>
                              <p className="font-medium">April 1, 2025</p>
                              <p className="text-xs text-muted-foreground">
                                Pro Plan - Monthly
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-4">$49.00</span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <div>
                              <p className="font-medium">March 1, 2025</p>
                              <p className="text-xs text-muted-foreground">
                                Pro Plan - Monthly
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-4">$49.00</span>
                              <Button variant="ghost" size="sm" className="h-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="billing-email"
                              className="text-sm font-medium"
                            >
                              Billing Email
                            </label>
                            <Input
                              id="billing-email"
                              type="email"
                              defaultValue="billing@acme.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="company-name"
                              className="text-sm font-medium"
                            >
                              Company Name
                            </label>
                            <Input id="company-name" defaultValue="Acme Inc." />
                          </div>
                        </div>
                        <Button onClick={handleSave}>Save Contact Info</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Control when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Email Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="workflow-notifications"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="workflow-notifications"
                                className="font-medium cursor-pointer"
                              >
                                Workflow Notifications
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when your workflows run, complete
                                successfully, or encounter errors.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="usage-notifications"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="usage-notifications"
                                className="font-medium cursor-pointer"
                              >
                                Usage Alerts
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Receive notifications when you reach 80% of your
                                plan's limits or quotas.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="marketing-notifications"
                              className="mt-1"
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="marketing-notifications"
                                className="font-medium cursor-pointer"
                              >
                                Product Updates
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Stay informed about new features, templates, and
                                improvements.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="newsletter"
                              className="mt-1"
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="newsletter"
                                className="font-medium cursor-pointer"
                              >
                                Monthly Newsletter
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Receive our monthly newsletter with tips, case
                                studies, and best practices.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          In-App Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="workflow-notif-app"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="workflow-notif-app"
                                className="font-medium cursor-pointer"
                              >
                                Workflow Status
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Show notifications for workflow status changes
                                in the app.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="collab-notif-app"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="collab-notif-app"
                                className="font-medium cursor-pointer"
                              >
                                Collaboration Updates
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when team members comment or make
                                changes to shared workflows.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="system-notif-app"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor="system-notif-app"
                                className="font-medium cursor-pointer"
                              >
                                System Notifications
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Receive notifications about system events,
                                maintenance, and updates.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Delivery Preferences
                        </h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label
                              htmlFor="notification-email"
                              className="text-sm font-medium"
                            >
                              Notification Email
                            </label>
                            <Input
                              id="notification-email"
                              type="email"
                              defaultValue="alex@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Notification Schedule
                            </label>
                            <div className="flex items-center space-x-3 mb-2">
                              <input
                                type="radio"
                                id="immediate"
                                name="schedule"
                                defaultChecked
                              />
                              <label htmlFor="immediate">
                                Send immediately
                              </label>
                            </div>
                            <div className="flex items-center space-x-3 mb-2">
                              <input type="radio" id="daily" name="schedule" />
                              <label htmlFor="daily">Daily digest</label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <input type="radio" id="weekly" name="schedule" />
                              <label htmlFor="weekly">Weekly digest</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <div className="space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={handleSave}>Save Preferences</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "integrations" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect third-party services and tools to enhance your
                      workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">
                        Connected Services
                      </h3>

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
                        <h3 className="text-lg font-medium">
                          Available Integrations
                        </h3>

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
                                  <rect
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    ry="5"
                                  />
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                  <line
                                    x1="17.5"
                                    y1="6.5"
                                    x2="17.51"
                                    y2="6.5"
                                  />
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
                        <Button variant="outline">
                          Browse All Integrations
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "api" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your API keys for programmatic access to Alphaflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <h3 className="font-medium mb-2">API Documentation</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Learn how to integrate Alphaflow with your
                          applications using our REST API. View examples,
                          endpoints, and detailed guides.
                        </p>
                        <Button variant="outline" asChild>
                          <Link to="/api">View API Documentation</Link>
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Your API Keys</h3>
                          <Button>Generate New Key</Button>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-medium">Production Key</p>
                                <p className="text-xs text-muted-foreground">
                                  Created on April 15, 2025
                                </p>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  Refresh
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-secondary/20 rounded-lg p-2">
                              <Input
                                value="sk_live_*****************************a1b2"
                                readOnly
                                className="font-mono"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="flex-shrink-0"
                              >
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-medium">Development Key</p>
                                <p className="text-xs text-muted-foreground">
                                  Created on April 10, 2025
                                </p>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  Refresh
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-secondary/20 rounded-lg p-2">
                              <Input
                                value="sk_dev_*****************************x7y8"
                                readOnly
                                className="font-mono"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="flex-shrink-0"
                              >
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">API Usage</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              This Month
                            </span>
                            <span>325,421 / 1,000,000 requests</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full bg-primary"
                              style={{ width: "32.5%" }}
                            ></div>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            Resets on June 1, 2025
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg text-sm">
                          <div>
                            <span className="font-medium">Rate Limit:</span> 100
                            requests/second
                          </div>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                          >
                            Increase Limits
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Webhook Settings
                        </h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label
                              htmlFor="webhook-url"
                              className="text-sm font-medium"
                            >
                              Webhook URL
                            </label>
                            <Input
                              id="webhook-url"
                              placeholder="https://your-service.com/webhook"
                            />
                            <p className="text-xs text-muted-foreground">
                              We'll send event notifications to this URL.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Events to Subscribe
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-workflow-run"
                                  defaultChecked
                                />
                                <label
                                  htmlFor="event-workflow-run"
                                  className="text-sm"
                                >
                                  workflow.run
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-workflow-complete"
                                  defaultChecked
                                />
                                <label
                                  htmlFor="event-workflow-complete"
                                  className="text-sm"
                                >
                                  workflow.complete
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-workflow-error"
                                  defaultChecked
                                />
                                <label
                                  htmlFor="event-workflow-error"
                                  className="text-sm"
                                >
                                  workflow.error
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-agent-created"
                                />
                                <label
                                  htmlFor="event-agent-created"
                                  className="text-sm"
                                >
                                  agent.created
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-agent-updated"
                                />
                                <label
                                  htmlFor="event-agent-updated"
                                  className="text-sm"
                                >
                                  agent.updated
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="event-user-subscription"
                                />
                                <label
                                  htmlFor="event-user-subscription"
                                  className="text-sm"
                                >
                                  user.subscription_updated
                                </label>
                              </div>
                            </div>
                          </div>
                          <Button onClick={handleSave}>
                            Save Webhook Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
