import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Plus,
  Settings as SettingsIcon,
  User,
  BarChart3,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  onSidebarToggle,
}) => {
  return (
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
            {/* {sidebarCollapsed && (
              <Link to="/" className="text-xl font-bold">
                <span className="text-primary">A</span>
              </Link>
            )} */}
          </div>
          <button
            className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={onSidebarToggle}
          >
            {sidebarCollapsed ? <ChevronRight className="text-primary" /> : <ChevronLeft />}
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

            <Button
              variant="secondary"
              className="w-full justify-start"
              asChild
            >
              <Link to="/settings">
                <SettingsIcon
                  className={`h-4 w-4 ${sidebarCollapsed ? "mr-0" : "mr-2"}`}
                />
                {!sidebarCollapsed && "Settings"}
              </Link>
            </Button>
           
          </div>
        </div>

        <div className="p-3 border-t border-white/10">
          <Button
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
  );
};

export default Sidebar;
