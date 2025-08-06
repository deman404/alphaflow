import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CircleFadingArrowUp, List } from "lucide-react";

import FlowsCard from "./FlowsCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "firebase/auth";
import { AuthService } from "../../../services/auth";
import { getProfile } from "../../../database/Profile";

interface Workflow {
  id: string;
  user_id: string;
  flow_name: string;
  created_at: string;
  updated_at: string;
  status: string;
  data: any;
  description?: string;
}

interface Profile {
  user_id: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface WorkflowTemplate {
  id: string;
  user_id: string;
  name: string;
  update_at?: string;
  complexity?: string;
  description?: string;
}

export default function WorkflowsList() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [workflowTemplate, setWorkflowTemplate] =
    useState<WorkflowTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);
  const [workflowDescription, setWorkflowDescription] = useState<
    string | undefined
  >(undefined);
  const navigate = useNavigate();
  const [session, setSession] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session

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
  // Fetch profile

  // Fetch workflows

  // Fetch template

  // Handle Status Change
  const handleStatusChange = async (
    workflowId: string,
    newStatus: string
  ) => {};

  // Handle Share Template (using data from workflows)
  const handleShareTemplate = async (workflowId: string) => {};

  const handleOpenSheetWithTemplate = (workflow: Workflow) => {
    setWorkflowTemplate({
      id: workflow.id,
      user_id: workflow.user_id,
      name: workflow.flow_name,
      description: workflow.description,
      update_at: workflow.updated_at,
    });
    setCardOpen(true);
    sendNewsForSharedWorkflow(workflow.flow_name);
  };

  const deleteHandler = async (workflowId: string) => {};

  const sendNewsForSharedWorkflow = async (workflowName: string) => {};

  const sendNewsForDeletedWorkflow = async (workflowId: string) => {};

  if (isLoading || workflows.length === 0) {
    return (
      <>
        <EmptyState
          title="no Workflows found"
          description="No Workflows found. Create your own workflow or upgrade to a premium plan to access workflow templates."
          icon={<CircleFadingArrowUp className="h-6 w-6 text-primary" />}
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6 ">
      {workflows.length === 0 ? (
        <EmptyState
          title="No workflows yet"
          description="Create your first AI workflow to start automating your tasks."
          icon={<List className="h-6 w-6 text-primary" />}
        />
      ) : (
        <>
          {workflows.slice(0, visibleCount).map((flow) => (
            <div
              key={flow.id}
              onClick={() => navigate(`/workflows/${flow.id}`)}
              className="cursor-pointer "
            >
              <FlowsCard
                name={flow.flow_name}
                created_at={flow.created_at}
                updated_at={flow.updated_at}
                status={flow.status}
                changestate={(newStatus) =>
                  handleStatusChange(flow.id, newStatus)
                }
                shareThemplate={() => handleOpenSheetWithTemplate(flow)}
                deleteFlow={() => {
                  deleteHandler(flow.id);
                  console.log("Delete flow" + flow.id);
                }}
              />
            </div>
          ))}

          {visibleCount < workflows.length && (
            <Button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="mx-auto w-fit"
              variant="outline"
            >
              Show More
            </Button>
          )}
        </>
      )}

      {cardOpen && workflowTemplate ? (
        <Sheet open={cardOpen} onOpenChange={setCardOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Share your workflow</SheetTitle>
              <SheetDescription>
                Share your workflow with others by send it to themplate page
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Flow Name
                </Label>
                <Input
                  id="name"
                  value={workflowTemplate.name}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Flow Admin
                </Label>
                <Input
                  id="username"
                  value={workflowTemplate.user_id}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Flow Description
                </Label>
                <Input
                  id="description"
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="Add a description"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() =>
                    handleShareTemplate(workflowTemplate?.id || "")
                  }
                >
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </div>
  );
}
