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

import PaymentsCard from "../useComp/PaymentsCard";
export default function billing() {
  const [session, setSession] = useState(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [userProfile, setUserProfile] = useState(null);

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
      console.error("Profile not found, falling back to session data:", error);

      // Fallback to session data
      const fallbackProfile = {
        user_id: userId,
        name: session.user.user_metadata?.name,
        email: session.user.user_metadata?.email,
        picture: session.user.user_metadata?.picture,
      };
      setUserProfile(fallbackProfile);
    } else {
      console.log("Profile loaded from DB:", data);
      setUserProfile(data);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your subscription and payment methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{userProfile?.plans} Plan</p>
              <p className="text-sm text-muted-foreground">
                {userProfile?.plans === "free"
                  ? ""
                  : userProfile?.plans === "starter"
                  ? "49$"
                  : "N/A"}
              </p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>

          {/* <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="space-y-4">
              <Button variant="outline">Add Payment Method</Button>
            </div>
          </div> */}

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Billing History</h3>
              <Button variant="outline" size="sm">
                Download All
              </Button>
            </div>

            {/* <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="font-medium">May 1, 2025</p>
                  <p className="text-xs text-muted-foreground">
                    Pro Plan - Monthly
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">$49.00</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="font-medium">April 1, 2025</p>
                  <p className="text-xs text-muted-foreground">
                    Pro Plan - Monthly
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">$49.00</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="font-medium">March 1, 2025</p>
                  <p className="text-xs text-muted-foreground">
                    Pro Plan - Monthly
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">$49.00</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div> */}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="billing-email" className="text-sm font-medium">
                  Billing Email
                </label>
                <Input
                  id="billing-email"
                  type="email"
                  defaultValue={userProfile?.email}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company-name" className="text-sm font-medium">
                  Company Name
                </label>
                <Input
                  id="company-name"
                  defaultValue={userProfile?.company}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
