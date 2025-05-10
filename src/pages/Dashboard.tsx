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
import { supabase } from "../../supabaseClient";

//components
import Sidebar from "@/components/settings/Sidebar";
import Header from "@/components/Dashboard/Header";
import StatsCards from "@/components/Dashboard/StatsCards";
import RecentActivities from "@/components/Dashboard/RecentActivities";
import RecentWorkflows from "@/components/Dashboard/RecentWorkflows";
import FavoriteWorkflows from "@/components/Dashboard/FavoriteWorkflows";
import QuickActions from "@/components/Dashboard/QuickActions";
const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

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

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
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

          {/* Stats Cards */}
          <StatsCards />

          {/* Recent Activities */}
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <RecentActivities />

          {/* Workflows */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RecentWorkflows />

            <FavoriteWorkflows />
          </div> */}

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
