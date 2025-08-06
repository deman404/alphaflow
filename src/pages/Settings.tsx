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

//components
import Sidebar from "@/components/settings/Sidebar";
import Header from "@/components/settings/Header";
import Navigation from "@/components/settings/Navigation";
import Profile from "@/components/settings/profile";
import Account from "@/components/settings/account";
import Billing from "@/components/settings/billing";
import Notifications from "@/components/settings/notifications";
import Integrations from "@/components/settings/integrations";
import Api from "@/components/settings/api";
//function main
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
          <Header
            hname={"Settings"}
            hdescription={"Manage your account settings"}
          />

          {/* Settings Navigation and Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Navigation */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content */}
            <div className="md:col-span-3">
              {activeTab === "profile" && <Profile />}

              {activeTab === "account" && <Account />}

              {activeTab === "billing" && <Billing />}

              {activeTab === "notifications" && <Notifications />}

              {activeTab === "integrations" && <Integrations />}

              {activeTab === "api" && <Api />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
