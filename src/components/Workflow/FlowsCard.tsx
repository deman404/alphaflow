import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  EllipsisVertical,
  Workflow,
  Radio,
  RadioTower,
  Package,
  Eraser,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//interface for the flow card

interface FlowCardProps {
  name: string;
  created_at: string;
  updated_at: string;
  status: string;
  changestate?: (newStatus: string) => Promise<void>;
  shareThemplate?: () => Promise<void>;
  deleteFlow?: () => void;
}

//main function to render the flows card
export default function FlowsCard({
  name,
  created_at,
  updated_at,
  status,
  changestate,
  shareThemplate,
  deleteFlow,
}: FlowCardProps) {
  //state to hold the flows
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center mr-4">
          <Workflow className="text-blue-500" size={24} />
        </div>
        <div>
          <p className="font-medium flex items-center gap-2">
            {name}{" "}
            <span
              className={`${
                status === "Private"
                  ? "text-red-500 hover:text-red-600"
                  : "text-green-500 hover:text-green-600"
              }`}
            >
              <Radio className="w-4" />
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Created on {new Date(created_at).toLocaleDateString()} | Last
            updated on{" "}
            {new Date(updated_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <button
                className="w-full text-left justify-start p-0 flex items-center "
                onClick={(e) => {
                  e.stopPropagation(); // لمنع النقر من التأثير على البطاقة
                  changestate?.(status === "Private" ? "Public" : "Private");
                }}
              >
                <RadioTower className="w-4 mr-2" />
                <span>Make {status === "Private" ? "Public" : "Private"}</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="w-full text-left justify-start p-0 flex items-center "
                onClick={(e) => {
                  e.stopPropagation(); // لمنع النقر من التأثير على البطاقة
                  shareThemplate?.(); // استدعاء الدالة بعد التأكد من أنه النقر على الزر فقط
                }}
              >
                <Package className="w-4 mr-2" />
                <span>Share Themplate</span>
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button
                className="w-full text-left justify-start p-0 flex items-center "
                onClick={(e) => {
                  e.stopPropagation(); // لمنع النقر من التأثير على البطاقة
                  deleteFlow?.(); // استدعاء الدالة بعد التأكد من أنه النقر على الزر فقط
                }}
              >
                <Eraser className="w-4 mr-2" />
                <span>Delete</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
