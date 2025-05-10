import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../supabaseClient";
import Header from "@/components/settings/Header";
import { Skeleton } from "@/components/ui/skeleton";
// Template definitions

interface WorkflowTemplate {
  id: string;
  user_id: string;
  name: string;
  updated_at?: string;
  description: string;
  complexity: string;
  content: any;
}

const WorkflowTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [dataTemplates, setDataTemplates] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const handleTemplateSelect = (template: any) => {
    // Store the selected template in sessionStorage to use in the editor
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
      // Fallback to session data
      const fallbackProfile = {
        user_id: userId,
        name: session.user.user_metadata?.name,
        email: session.user.user_metadata?.email,
        picture: session.user.user_metadata?.picture,
      };
      setUserProfile(fallbackProfile);
    } else {
      setUserProfile(data);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchThemplates = async () => {
      setLoading(true);
      try {
        const workflowsData = await supabase
          .from("workflow_templates")
          .select("*")
          .order("created_at", { ascending: false });

        const workflows: WorkflowTemplate[] = workflowsData.error
          ? []
          : workflowsData.data || [];
        setDataTemplates(workflows);
      } catch (error) {
        console.error("Error fetching workflows:", error);
        toast.error("Failed to load workflows");
      } finally {
        setLoading(false);
      }
    };

    fetchThemplates();
  }, [session]);

  const UseThemplateTomyProfile = (template: WorkflowTemplate) => {
    const { name, updated_at, description,  content } = template;

    const newTemplate = {
      user_id: session?.user?.id,
      flow_name: name,
      data: content,
      created_at: new Date().toISOString(),
      updated_at: updated_at,
      status: "Private",
    };

    supabase
      .from("workflows")
      .insert([newTemplate])
      .then(({ data, error }) => {
        if (error) {
          console.error("Error inserting workflow:", error);
          toast.error("Failed to insert workflow");
        } else {
          toast.success("Workflow added to your profile");
          navigate("/workflows");
        }
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header
        hname={"Workflow Templates"}
        hdescription={"Find workflows templates from all the globe"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading == false ? (
          <>
            {dataTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
                onClick={() => {
                  console.log(template.id);
                }}
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => UseThemplateTomyProfile(template)}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-2/5" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-3/4 mt-2" />
                  <Skeleton className="h-3 w-3/4 mt-2" />
                </CardHeader>

                <CardFooter className="flex justify-start space-x-2">
                  <Skeleton className="h-8 w-24 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkflowTemplates;
