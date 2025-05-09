import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { List, Plus, Settings, User, CircleFadingArrowUp } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
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

const Workflow = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [FlowName, setFlowName] = useState("");
  const [FlowStatus, setFlowStatus] = useState("private");
  const [isClicked, setIsClicked] = useState(false);
  const [dataTemplates, setDataTemplates] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

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

    setIsClicked(true);

    try {
      const { data, error } = await supabase
        .from("workflows")
        .insert([
          {
            user_id: session.user.id,
            flow_name: FlowName,
            status: FlowStatus,
            data: {
              nodes: [],
              edges: [],
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .single();

      if (error) throw error;

      toast.success("Workflow created successfully");
      setFlowName("");
      setFlowStatus(""); // Reset status as well
      // navigate(`/workflows/${data.id}`);
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast.error("Error creating workflow");
    } finally {
      setIsClicked(false);
    }
  };

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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={userProfile?.picture || ""}
                    alt={"profile picture"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
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

          {userProfile?.user_id != null && dataTemplates.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-xl font-semibold">Workflows Templates</h2>
                <Button
                  variant="ghost"
                  onClick={() => {}}
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
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-xl font-semibold">Workflows Templates</h2>
                <Button
                  variant="ghost"
                  onClick={() => {}}
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
