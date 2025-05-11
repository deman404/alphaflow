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
  Eraser,
  LogOut,
  Share2,
  CalendarArrowUp,
  Star,
  Activity,
  Zap,
  MoreVertical,
  Newspaper,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast } from "sonner";

interface News {
  id: number;
  title: string;
  content: string;
  label: string;
  created_at: string;
}

export default function RecentActivities() {
  const [isLabel, setIsLabel] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [FlowName, setFlowName] = useState("");
  const [FlowStatus, setFlowStatus] = useState("private");
  const [isClicked, setIsClicked] = useState(false);
  const [dataNews, setDataNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
  const IconShanger = (isLabel: String) => {
    switch (isLabel) {
      case "new":
        return <Newspaper className="h-4 w-4 text-green-500" />;
      case "update":
        return <CalendarArrowUp className="h-4 w-4 text-blue-500" />;
      case "share":
        return <Share2 className="h-4 w-4 text-amber-500" />;
      case "delete":
        return <Eraser className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchThemplates = async () => {
      const { error, data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", session.user.id);
      setDataNews(data || []);
      if (error) {
        console.error("Error fetching templates:", error);
        toast.error("Failed to load templates");
      }
    };

    fetchThemplates();
  }, [session]);

  if (dataNews.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-2">
        <CardContent className="p-6">
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center">
              {/* You can replace the Activity icon with a fun illustration */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-500/20">
                <Activity className="h-6 w-6 text-gray-500 animate-pulse" />
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-400">
              No recent activities
            </p>
            <p className="text-sm text-gray-500">
              It seems like you haven't done anything yet
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {dataNews.slice(0, 3).map((item, index) => (
        <>
          <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-2">
            <CardContent className="p-6">
              <div className="space-y-4" key={index}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.label === "new"
                          ? "bg-green-500/20"
                          : item.label === "update"
                          ? "bg-blue-500/20"
                          : item.label === "share"
                          ? "bg-amber-500/20"
                          : item.label === "delete"
                          ? "bg-purple-500/20"
                          : "bg-gray-500/20"
                      }`}
                    >
                      {IconShanger(item.label)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.created_at.split("T")[0]}{" "}
                      {item.created_at.split("T")[1].split(".")[0]}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ))}
    </>
  );
}
