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

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Create Workflow</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Build a new automation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold">Templates</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Browse workflow templates
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-xs text-muted-foreground mt-1">
              View detailed reports
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
              <Bell className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-xs text-muted-foreground mt-1">Manage alerts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
