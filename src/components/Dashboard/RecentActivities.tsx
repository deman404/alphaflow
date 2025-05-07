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
import {
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  User,
  BarChart3,
  FileText,
  LogOut,
  Bell,
  Clock,
  Star,
  Activity,
  Zap,
  MoreVertical,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
export default function RecentActivities() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium">
                Workflow "Customer Support Automation" executed successfully
              </p>
              <p className="text-sm text-muted-foreground">
                Processed 12 customer inquiries in 45 seconds
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                30 minutes ago
              </p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Settings className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium">
                You updated workflow "Content Research Assistant"
              </p>
              <p className="text-sm text-muted-foreground">
                Added new data extraction step
              </p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium">New workflow template available</p>
              <p className="text-sm text-muted-foreground">
                Sales Lead Qualification with multi-stage filtering
              </p>
              <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
