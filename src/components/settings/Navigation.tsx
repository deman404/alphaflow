import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  CreditCard,
  Server,
  KeyRound,
} from "lucide-react";

// Define props for Navigation
interface NavigationProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-white/10 h-fit">
      <CardContent className="p-4">
        <nav className="space-y-1">
          <Button
            variant={activeTab === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            variant={activeTab === "account" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("account")}
          >
            <Shield className="h-4 w-4 mr-2" />
            Account
          </Button>
          <Button
            variant={activeTab === "billing" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("billing")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </Button>
          <Button
            variant={activeTab === "notifications" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "integrations" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("integrations")}
          >
            <Server className="h-4 w-4 mr-2" />
            Integrations
          </Button>
          <Button
            variant={activeTab === "api" ? "secondary" : "ghost"}
            className="w-full justify-start mb-1"
            onClick={() => setActiveTab("api")}
          >
            <KeyRound className="h-4 w-4 mr-2" />
            API Keys
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
};

export default Navigation;
