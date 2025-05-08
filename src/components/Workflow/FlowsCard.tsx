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
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../../supabaseClient";

//interface for the flow card

interface FlowCardProps {
  name: string;
  created_at: string;
  updated_at: string;
  status: string;
}
//main function to render the flows card
export default function FlowsCard({
  name,
  created_at,
  updated_at,
  status,
}: FlowCardProps) {
  //state to hold the flows
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center mr-4">
          <Workflow className="text-blue-500" size={24} />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">
            Created on {new Date(created_at).toLocaleDateString()} | Last
            updated on {new Date(updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        className={`${
          status === "Private"
            ? "text-red-500 hover:text-red-600"
            : "text-green-500 hover:text-green-600"
        }`}
      >
        {status}
      </Button>
    </div>
  );
}
