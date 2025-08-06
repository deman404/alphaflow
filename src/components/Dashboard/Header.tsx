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

export default function Header() {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();
  

  const fetchProfileOrFallback = async (session) => {
    
  };
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userProfile?.name}!
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative border border-dashed border-black/15 rounded-md">
          <Input
            placeholder="Search workflows..."
            className="pl-8 bg-background border-white/10 w-60"
          />
          <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
        </div>
        <Button variant="outline" size="icon" className="relative border border-dashed border-black/15">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-dashed border-black/15">
          <span className="text-sm font-medium">
            {userProfile?.name.toString().charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
