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

export default function api() {
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };
  return (
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
              Learn how to integrate Alphaflow with your applications using our
              REST API. View examples, endpoints, and detailed guides.
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
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
                <span className="text-muted-foreground">This Month</span>
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
              <Button variant="link" size="sm" className="h-auto p-0">
                Increase Limits
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Webhook Settings</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="webhook-url" className="text-sm font-medium">
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
                    <label htmlFor="event-workflow-run" className="text-sm">
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
                    <label htmlFor="event-workflow-error" className="text-sm">
                      workflow.error
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="event-agent-created" />
                    <label htmlFor="event-agent-created" className="text-sm">
                      agent.created
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="event-agent-updated" />
                    <label htmlFor="event-agent-updated" className="text-sm">
                      agent.updated
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="event-user-subscription" />
                    <label
                      htmlFor="event-user-subscription"
                      className="text-sm"
                    >
                      user.subscription_updated
                    </label>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave}>Save Webhook Settings</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
