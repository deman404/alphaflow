import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { List } from "lucide-react";
import { supabase } from "../../../supabaseClient";
import FlowsCard from "./FlowsCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

interface Workflow {
  id: string;
  user_id: string;
  flow_name: string;
  created_at: string;
  updated_at: string;
  status: string;
  data: any; 
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
}

export default function WorkflowsList() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [workflowTemplate, setWorkflowTemplate] =
    useState<WorkflowTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize session
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        if (!session) {
          setWorkflows([]);
          setUserProfile(null);
          setWorkflowTemplate(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch profile
  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const profileData = await supabase
          .from("profile")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        const profile: Profile =
          profileData.error || !profileData.data
            ? {
                user_id: session.user.id,
                name: session.user.user_metadata?.name,
                email: session.user.user_metadata?.email,
                picture: session.user.user_metadata?.picture,
              }
            : profileData.data;

        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [session]);

  // Fetch workflows
useEffect(() => {
  if (!session?.user?.id) return;

  const fetchWorkflowsData = async () => {
    setIsLoading(true);
    try {
      const workflowsData = await supabase
        .from("workflows")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      const workflows: Workflow[] = workflowsData.error
        ? []
        : workflowsData.data || [];
      setWorkflows(workflows);
    } catch (error) {
      console.error("Error fetching workflows:", error);
      toast.error("Failed to load workflows");
    } finally {
      setIsLoading(false);
    }
  };

  fetchWorkflowsData();
}, [session]);

// Fetch template
useEffect(() => {
  if (!session?.user?.id) return;

  const fetchTemplateData = async () => {
    setIsLoading(true);
    try {
      const templateData = await supabase
        .from("workflow_templates")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      setWorkflowTemplate(templateData.error ? null : templateData.data);
    } catch (error) {
      console.error("Error fetching template:", error);
      toast.error("Failed to load template");
    } finally {
      setIsLoading(false);
    }
  };

  fetchTemplateData();
}, [session]);

// Handle Status Change
const handleStatusChange = async (workflowId: string, newStatus: string) => {
  try {
    const { error } = await supabase
      .from("workflows")
      .update({ status: newStatus })
      .eq("id", workflowId);

    if (error) throw error;

    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === workflowId
          ? { ...workflow, status: newStatus }
          : workflow
      )
    );
    toast.success("Status updated successfully");
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status");
  }
};

// Handle Share Template (using data from workflows)
const handleShareTemplate = async (workflowId: string) => {
  try {
    // Find the workflow to share
    const workflowToShare = workflows.find((workflow) => workflow.id === workflowId);

    if (!workflowToShare) {
      toast.error("Workflow not found.");
      return;
    }

    const { flow_name, user_id, data } = workflowToShare;
    // Check if the workflow is already shared
    console.log("Workflow to share:", workflowToShare);

    // Upsert the workflow template (create or update)
    const { error } = await supabase
      .from("workflow_templates")
      .upsert({
        name: flow_name,               // Name from workflow
        user_id: user_id,         // User ID from workflow
        content: data,         // Content from workflow (JSON)
        updated_at: new Date().toISOString(),
      })
      .eq("id", workflowId);

    if (error) throw error;

    // Generate the shareable link
    const shareableLink = `${window.location.origin}/shared-template/${workflowId}`;
    await navigator.clipboard.writeText(shareableLink);
    toast.success("Template shared! Link copied to clipboard.");
  } catch (error) {
    console.error("Error sharing template:", error);
    toast.error("Failed to share template");
  }
};


  if (isLoading && workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
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
              className="cursor-pointer"
            >
              <FlowsCard
                name={flow.flow_name}
                created_at={flow.created_at}
                updated_at={flow.updated_at}
                status={flow.status}
                changestate={(newStatus) =>
                  handleStatusChange(flow.id, newStatus)
                }
                shareThemplate={() => handleShareTemplate(flow.id)}
                deleteFlow={() => {}}
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
    </div>
  );
}
