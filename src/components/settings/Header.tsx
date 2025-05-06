import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell } from "lucide-react";
export default function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-medium">A</span>
        </div>
      </div>
    </div>
  );
}
