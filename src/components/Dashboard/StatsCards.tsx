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
import { toast } from "sonner";

interface Workflow {
  id: string;
  user_id: string;
  name: string;
  updated_at?: string;
  description: string;
  complexity: string;
  content: any;
  status: string;
}

export default function StatsCards() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [dataTemplates, setDataTemplates] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        fetchProfileOrFallback(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        fetchProfileOrFallback(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  const fetchProfileOrFallback = async (session) => {
    const userId = session.user.id;

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      // Fallback to session data
      const fallbackProfile = {
        user_id: userId,
        name: session.user.user_metadata?.name,
        email: session.user.user_metadata?.email,
        picture: session.user.user_metadata?.picture,
      };
      setUserProfile(fallbackProfile);
    } else {
      setUserProfile(data);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchThemplates = async () => {
      setLoading(true);
      try {
        const workflowsData = await supabase
          .from("workflows")
          .select("*")
          .order("created_at", { ascending: false });

        const workflows: Workflow[] = workflowsData.error
          ? []
          : workflowsData.data || [];
        setDataTemplates(workflows);
      } catch (error) {
        console.error("Error fetching workflows:", error);
        toast.error("Failed to load workflows");
      } finally {
        setLoading(false);
      }
    };

    fetchThemplates();
  }, [session]);

  const publicFlows = dataTemplates.filter(
    (template) => template.status === "Public"
  );
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const recentFlows = publicFlows.filter((template) => {
    const createdAt = new Date(template.updated_at || "");
    return createdAt >= lastWeek;
  });

  const increase = recentFlows.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Public Workflows</p>
              <h2 className="text-3xl font-bold">{publicFlows.length}</h2>
              <p className="text-green-500 text-xs flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>{increase} public flows created in the last week</span>
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
