import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { List, Plus, Settings, CircleFadingArrowUp } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../database/Profile";

import Sidebar from "@/components/settings/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WorkflowsList from "@/components/Workflow/WorkflowsList";
import Themplates from "@/components/Workflow/themplates";
import themplates from "@/components/Workflow/themplates";
import { Content } from "vaul";
import { AuthService } from "../../services/auth";
import { User } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";
interface WorkflowTemplate {
  id: string;
  user_id: string;
  name: string;
  updated_at?: string;
  description: string;
  complexity: string;
}
interface Profile {
  name: string;
  email: string;
  // Add other profile fields as needed
}
const Workflow = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [FlowName, setFlowName] = useState("");
  const [FlowStatus, setFlowStatus] = useState("private");
  const [isClicked, setIsClicked] = useState(false);
  const [dataTemplates, setDataTemplates] = useState<WorkflowTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (user) => {
      setSession(user);
      if (user) {
        try {
          const { profile, error } = await getProfile(user.email || "");
          if (error) throw new Error(error);
          setUserProfile(profile);
        } catch (error) {
          toast.error("Failed to load profile");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  const handelGoSeeAll = () => {
    navigate("/workflow-templates");
  };

  const fetchProfileOrFallback = async (session) => {};
  const Spinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-white mr-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  //handle create new workflow
  const handleCreateNewWorkflow = async () => {
    if (isClicked) return;
  };

  //send news for new workflow
  const sendNewsForNewWorkflow = async (workflowName: string) => {};

  const deleteHandler = async (workflowId: string) => {};

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={toggleSidebar}
      />
      <div
        className={`flex-1 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <div className="p-6">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your AI workflows and automations
              </p>
            </div>
            {loading ? (
              <Skeleton className="w-8 h-8 rounded-full" />
            ) : session ? (
              <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors border border-dashed border-black/15">
                <span className="text-sm font-medium">
                  {userProfile?.name?.charAt(0)?.toUpperCase() ||
                    session.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              </button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            )}
          </header>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Workflows</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => {}} className="flex items-center gap-2">
                  <Plus className="mr-2 h-4 w-4" />
                  New Workflow
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Workflow</DialogTitle>
                  <DialogDescription>
                    Set up your AI workflow automation
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="name" className="text-left">
                    Workflow Name
                  </Label>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="name"
                      placeholder="My Workflow"
                      className="w-full col-span-4"
                      onChange={(e) => {
                        setFlowName(e.target.value);
                      }}
                      value={FlowName}
                    />
                  </div>
                  <Label htmlFor="username" className="text-left">
                    Workflow Status
                  </Label>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Select onValueChange={setFlowStatus}>
                      <SelectTrigger className="w-full col-span-4">
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleCreateNewWorkflow}
                    disabled={!FlowName || !FlowStatus || isClicked}
                  >
                    {isClicked ? (
                      <>
                        <Spinner />
                      </>
                    ) : (
                      "Create Workflow"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {/* Workflows List Section */}
            <WorkflowsList />
          </div>

          {/* Workflow Templates Section */}

          {session?.email != null && dataTemplates.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-xl font-semibold">
                  My Workflows Templates
                </h2>
                <Button
                  variant="ghost"
                  onClick={handelGoSeeAll}
                  className="flex items-center gap-2"
                >
                  See All
                </Button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {dataTemplates.slice(0, 3).map((themplate, index) => (
                  <Themplates
                    key={index}
                    name={themplate.name}
                    description={themplate.description}
                    complexity={themplate.complexity}
                    onClick={() => {
                      toast.success("Workflow created successfully");
                      navigate(`/workflows/${themplate.id}`);
                    }}
                    deleteFlow={() => {
                      deleteHandler(themplate.id);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-xl font-semibold">
                  My Workflows Templates
                </h2>
                <Button
                  variant="ghost"
                  onClick={handelGoSeeAll}
                  className="flex items-center gap-2"
                >
                  See All
                </Button>
              </div>
              <EmptyState
                title="no templates found"
                description="No templates found. Create your own workflow or upgrade to a premium plan to access workflow templates."
                icon={<CircleFadingArrowUp className="h-6 w-6 text-primary" />}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
