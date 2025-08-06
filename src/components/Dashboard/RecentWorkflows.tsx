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

export default function RecentWorkflows() {
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
  return (
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
  );
}
