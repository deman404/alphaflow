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

export default function notifications() {
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };
  return (
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
            <h3 className="text-lg font-medium">Email Notifications</h3>
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
                    Get notified when your workflows run, complete successfully,
                    or encounter errors.
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
                    Receive notifications when you reach 80% of your plan's
                    limits or quotas.
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
                <input type="checkbox" id="newsletter" className="mt-1" />
                <div className="space-y-1">
                  <label
                    htmlFor="newsletter"
                    className="font-medium cursor-pointer"
                  >
                    Monthly Newsletter
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Receive our monthly newsletter with tips, case studies, and
                    best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">In-App Notifications</h3>
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
                    Show notifications for workflow status changes in the app.
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
                    Get notified when team members comment or make changes to
                    shared workflows.
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
                    Receive notifications about system events, maintenance, and
                    updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Delivery Preferences</h3>
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
                  <label htmlFor="immediate">Send immediately</label>
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
  );
}
