import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import FlowsCard from "./FlowsCArd"; // تأكد من المسار الصحيح
import { List } from "lucide-react";
import EmptyState from "@/components/EmptyState";

interface Workflow {
  id: string;
  user_id: string;
  flow_name: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export default function WorkflowsList() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
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

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchUserWorkflows = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(5); 

      if (error) {
        console.error("Error fetching workflows:", error);
      } else {
        setWorkflows(data || []);
      }

      setLoading(false);
    };

    fetchUserWorkflows();
  }, [session]);

  if (loading) return <p className="text-muted">Loading workflows...</p>;

  return (
    <div className="grid gap-6">
      {workflows.length === 0 ? (
        <EmptyState
          title="No workflows yet"
          description="Create your first AI workflow to start automating your tasks."
          icon={<List className="h-6 w-6 text-primary" />}
        />
      ) : (
        workflows.map((flow) => (
          <FlowsCard
            key={flow.id}
            name={flow.flow_name}
            created_at={flow.created_at}
            updated_at={flow.updated_at}
            status={flow.status}
          />
        ))
      )}
    </div>
  );
}
