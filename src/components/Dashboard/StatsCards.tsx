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


export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Workflows</p>
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
              <p className="text-muted-foreground text-sm">Total Executions</p>
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
              <p className="text-muted-foreground text-sm">Success Rate</p>
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
  );
}
