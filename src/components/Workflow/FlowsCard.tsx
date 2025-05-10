import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Radio,
  RadioTower,
  Package,
  Eraser,
  EllipsisVertical,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useMemo } from "react";
import {
  Facebook,
  Github,
  Chrome,
  Twitter,
  Linkedin,
  Dribbble,
  Youtube,
  Mail,
  Code2,
} from "lucide-react";

interface FlowCardProps {
  name: string;
  created_at: string;
  updated_at: string;
  status: string;
  changestate?: (newStatus: string) => Promise<void>;
  shareThemplate?: () => void;
  deleteFlow?: () => void;
  complexity?: string;
  onClick?: () => void;
}

export default function FlowsCard({
  name,
  created_at,
  updated_at,
  status,
  changestate,
  shareThemplate,
  deleteFlow,
  onClick,
}: FlowCardProps) {
  const randomTextColor = useMemo(() => {
    const colors = [
      "text-red-400",
      "text-green-400",
      "text-blue-400",
      "text-yellow-400",
      "text-purple-400",
      "text-pink-400",
      "text-teal-400",
      "text-orange-400",
      "text-indigo-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const randomBgColor = useMemo(() => {
    const bgColors = [
      "bg-red-100",
      "bg-green-100",
      "bg-blue-100",
      "bg-yellow-100",
      "bg-purple-100",
      "bg-pink-100",
      "bg-teal-100",
      "bg-orange-100",
      "bg-indigo-100",
    ];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  }, []);

  function getIconForName(name: string) {
    const lower = name.toLowerCase();

    if (lower.includes("google")) return <Chrome className="h-8 w-8" />;
    if (lower.includes("facebook")) return <Facebook className="h-8 w-8" />;
    if (lower.includes("github")) return <Github className="h-8 w-8" />;
    if (lower.includes("twitter")) return <Twitter className="h-8 w-8" />;
    if (lower.includes("linkedin")) return <Linkedin className="h-8 w-8" />;
    if (lower.includes("dribbble")) return <Dribbble className="h-8 w-8" />;
    if (lower.includes("youtube")) return <Youtube className="h-8 w-8" />;
    if (lower.includes("email") || lower.includes("mail"))
      return <Mail className="h-8 w-8" />;

    // Default icon
    return <Code2 className="h-8 w-8 text-muted-foreground/30" />;
  }

  return (
    <Card className="overflow-hidden relative">
      {/* Dropdown menu in top-right */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  changestate?.(status === "Private" ? "Public" : "Private");
                }}
              >
                <RadioTower className="w-4 mr-2" />
                Make {status === "Private" ? "Public" : "Private"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  shareThemplate?.();
                }}
              >
                <Package className="w-4 mr-2" />
                Share Template
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFlow?.();
                }}
              >
                <Eraser className="w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader>
        <CardTitle className="flex  items-center justify-between">
          <span className="flex items-center gap-2">
            {name}
            <Radio
              className={`w-4 ${
                status === "Private" ? "text-red-500" : "text-green-500"
              }`}
            />
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div
          className={`h-32 ${randomBgColor} rounded-md flex items-center justify-center`}
        >
          <span className={`text-3xl ${randomTextColor}`}>
            {getIconForName(name)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Created: {new Date(created_at).toLocaleDateString()} | Updated:{" "}
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
      </CardContent>
    </Card>
  );
}
