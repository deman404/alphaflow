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

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const recentWorkflows = [
    {
      id: 1,
      name: "Customer Support Automation",
      status: "active",
      lastRun: "2 hours ago",
      runs: 128,
      success: 120,
    },
    {
      id: 2,
      name: "Sales Lead Qualification",
      status: "active",
      lastRun: "5 hours ago",
      runs: 89,
      success: 82,
    },
    {
      id: 3,
      name: "Content Research Assistant",
      status: "inactive",
      lastRun: "1 day ago",
      runs: 45,
      success: 43,
    },
  ];

  const favoriteWorkflows = [
    {
      id: 4,
      name: "Email Processing Workflow",
      status: "active",
      lastRun: "1 hour ago",
      runs: 256,
      success: 250,
    },
    {
      id: 5,
      name: "Social Media Monitor",
      status: "active",
      lastRun: "3 hours ago",
      runs: 312,
      success: 305,
    },
  ];

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

  const LogoutSupa = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div
        className={`h-screen fixed left-0 top-0 z-40 bg-secondary/10 backdrop-blur-md border-r border-white/10 transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center w-full" : ""
              }`}
            >
              {!sidebarCollapsed && (
                <Link to="/" className="text-xl font-bold">
                  Alpha<span className="text-primary">flow</span>
                </Link>
              )}
              {sidebarCollapsed && (
                <Link to="/" className="text-xl font-bold">
                  <span className="text-primary">A</span>
                </Link>
              )}
            </div>
            <button
              className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>

          <div className={`p-3 ${sidebarCollapsed ? "px-2" : ""}`}>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              {!sidebarCollapsed && "New Workflow"}
            </Button>
          </div>

          <div className="flex-1 px-3 py-2 overflow-y-auto">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard
                    className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                  />
                  {!sidebarCollapsed && "Dashboard"}
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText
                  className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                />
                {!sidebarCollapsed && "Workflows"}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Activity
                  className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                />
                {!sidebarCollapsed && "Executions"}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3
                  className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                />
                {!sidebarCollapsed && "Analytics"}
              </Button>

              {!sidebarCollapsed && (
                <div className="py-2">
                  <Separator />
                </div>
              )}

              {sidebarCollapsed && (
                <div className="py-2">
                  <Separator />
                </div>
              )}

              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/settings">
                  <Settings
                    className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                  />
                  {!sidebarCollapsed && "Settings"}
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User
                  className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                />
                {!sidebarCollapsed && "Profile"}
              </Button>
            </div>
          </div>

          <div className="p-3 border-t border-white/10">
            <Button
              onClick={LogoutSupa}
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-500/10"
            >
              <LogOut
                className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
              />
              {!sidebarCollapsed && "Sign Out"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {session?.user?.user_metadata?.name}!
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  placeholder="Search workflows..."
                  className="pl-8 bg-background border-white/10 w-60"
                />
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              </div>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Active Workflows
                    </p>
                    <h2 className="text-3xl font-bold">12</h2>
                    <p className="text-green-500 text-xs flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +3 from last week
                    </p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Executions
                    </p>
                    <h2 className="text-3xl font-bold">1,873</h2>
                    <p className="text-green-500 text-xs flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +234 from last week
                    </p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Success Rate
                    </p>
                    <h2 className="text-3xl font-bold">98.2%</h2>
                    <p className="text-green-500 text-xs flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +1.3% from last week
                    </p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">API Usage</p>
                    <h2 className="text-3xl font-bold">52%</h2>
                    <p className="text-muted-foreground text-xs mt-1">
                      of monthly quota
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="text-xs font-medium">52%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
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
                      Workflow "Customer Support Automation" executed
                      successfully
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
                    <p className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </p>
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
                    <p className="font-medium">
                      New workflow template available
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sales Lead Qualification with multi-stage filtering
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 hours ago
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Workflows */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Workflows</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentWorkflows.map((workflow) => (
                      <div key={workflow.id} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            workflow.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } mr-3`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium">{workflow.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last run: {workflow.lastRun}</span>
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <p>{workflow.runs} runs</p>
                          <p className="text-green-500">
                            {workflow.success} successful
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Favorite Workflows */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Favorite Workflows</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {favoriteWorkflows.map((workflow) => (
                      <div key={workflow.id} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            workflow.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } mr-3`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium">{workflow.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last run: {workflow.lastRun}</span>
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <p>{workflow.runs} runs</p>
                          <p className="text-green-500">
                            {workflow.success} successful
                          </p>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      className="w-full border border-dashed border-white/20 flex items-center justify-center py-4"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add favorite workflow</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage alerts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
