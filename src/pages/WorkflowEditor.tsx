import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { ArrowLeft, Save, Workflow, Cog, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "../../supabaseClient";
import { nodeTypes } from "@/components/nodes/index";

// Node types
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const WorkflowEditor: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("New Workflow");
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { workflowId } = useParams<{ workflowId: string }>();
  const [workflowData, setWorkflowData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [canBack, setCanBack] = useState(false);
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  const navigate = useNavigate();

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

  const fetchProfileOrFallback = async (session: any) => {
    const userId = session.user.id;

    const { data, error } = await supabase
      .from("workflows")
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
      console.log("Profile loaded from DB:", data);
      setUserProfile(data);
    }
  };

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node selection for properties panel
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsPropertiesOpen(true);
  }, []);

  // Handle adding new nodes when dragged from the sidebar
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document
        .querySelector(".react-flow")
        ?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Create a new node
      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Node types for sidebar
  const nodeCategories = [
    {
      name: "Triggers",
      items: [
        { type: "text", label: "Email Trigger" },
        { type: "outputext", label: "Schedule Trigger" },
        { type: "trigger_webhook", label: "Webhook Trigger" },
      ],
    },
    {
      name: "Actions",
      items: [
        { type: "action_email", label: "Send Email" },
        { type: "action_notification", label: "Send Notification" },
        { type: "action_database", label: "Update Database" },
      ],
    },
    {
      name: "Logic",
      items: [
        { type: "if", label: "Condition" },
        { type: "logic_switch", label: "Switch" },
        { type: "logic_loop", label: "Loop" },
      ],
    },
  ];

  // Load workflow data when component mounts or workflowId changes
  useEffect(() => {
    const loadWorkflow = async () => {
      if (!workflowId || !session?.user?.id) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from("workflows")
          .select("*")
          .eq("id", workflowId)
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setWorkflowData(data);
          setWorkflowName(data.flow_name);
          if (data.data) {
            const parsedData =
              typeof data.data === "string" ? JSON.parse(data.data) : data.data;
            setNodes(parsedData.nodes || []);
            setEdges(parsedData.edges || []);
          }
        }
      } catch (error) {
        toast.error("Failed to load workflow");
      }
    };

    loadWorkflow();
  }, [workflowId, session?.user?.id]);

  const sanitizeNode = (node) => ({
    id: node.id,
    type: node.type,
    position: { x: node.position.x, y: node.position.y },
    data: node.data ? JSON.parse(JSON.stringify(node.data)) : {},
  });

  const sanitizeEdge = (edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.type || "default",
    ...(edge.sourceHandle && { sourceHandle: edge.sourceHandle }),
    ...(edge.targetHandle && { targetHandle: edge.targetHandle }),
  });

  const handleSave = async () => {
    if (!workflowName || !session?.user?.id || isSaving) return;

    setIsSaving(true);
    const startTime = Date.now();

    try {
      // 1. Prepare and log payload
      const payload = {
        flow_name: workflowName,
        data: {
          nodes: nodes.map(sanitizeNode),
          edges: edges.map(sanitizeEdge),
        },
        updated_at: new Date().toISOString(),
      };

      // 2. Direct update with error handling
      const { error } = await supabase
        .from("workflows")
        .update(payload)
        .eq("id", workflowId)
        .eq("user_id", session.user.id);

      if (error) throw error;

      // 3. Enhanced verification with timeout
      const verifyUpdate = async (attempt = 0): Promise<boolean> => {
        const { data: updated } = await supabase
          .from("workflows")
          .select("data, updated_at")
          .eq("id", workflowId)
          .single();

        if (!updated) return false;

        // Compare only essential properties
        const nodesMatch =
          updated.data.nodes?.length === payload.data.nodes.length;
        const edgesMatch =
          updated.data.edges?.length === payload.data.edges.length;
        const recentUpdate =
          new Date(updated.updated_at) > new Date(startTime - 5000);

        if (nodesMatch && edgesMatch && recentUpdate) {
          return true;
        }

        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          return verifyUpdate(attempt + 1);
        }

        return false;
      };

      const verified = await verifyUpdate();
      if (!verified) throw new Error("Data verification failed");
      setCanBack(true);

      toast.success("Workflow saved successfully!");
      sendNewsForUpdatedWorkflow(workflowName);
    } catch (error) {
      toast.error(`Save failed: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const sendNewsForUpdatedWorkflow = async (workflowName: string) => {
    try {
      const { error } = await supabase
        .from("news")
        .insert([
          {
            user_id: session.user.id,
            title: "New workflow updated" + workflowName,
            content: `A new workflow named "${workflowName}" has been updated.`,
            label: "update",
            created_at: new Date().toISOString(),
          },
        ])
        .single();

      if (error) throw error;

      toast.success("News sent successfully");
    } catch (error) {
      toast.error("Error sending news");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from("workflows")
        .select("data, updated_at")
        .eq("id", workflowId)
        .single();
    }, 10000);

    return () => clearInterval(interval);
  }, [workflowId]);

  const handleBackClick = () => {
    if (canBack) {
      navigate("/workflow");
    } else {
      setBackAlertOpen(true);
      toast("Workflow not saved", {
        description: "You can go back to the workflow list without saving.",
        duration: 5000,
        action: {
          label: "Dismiss",
          onClick: () => navigate("/workflow"),
        },
      });
    }
  };
  return (
    <div className="h-screen w-full flex">
      <SidebarProvider defaultOpen={true}>
        <Sidebar variant="sidebar">
          <SidebarHeader className="border-b">
            <div className="px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Workflow Nodes</h2>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="p-4">
              <Input
                type="text"
                placeholder="Search nodes..."
                className="mb-4"
              />
            </div>

            {nodeCategories.map((category) => (
              <SidebarGroup key={category.name}>
                <SidebarGroupLabel>{category.name}</SidebarGroupLabel>
                <SidebarContent>
                  <SidebarMenu>
                    {category.items.map((item) => (
                      <SidebarMenuItem key={item.type}>
                        <div
                          className="cursor-grab flex items-center px-4 py-2 rounded-md hover:bg-accent"
                          draggable
                          onDragStart={(event) => onDragStart(event, item.type)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          {/* Toolbar */}
          <div className="h-14 border-b px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackClick}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center ml-4">
                <Workflow className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium flex items-center gap-2">
                  {workflowData?.flow_name}{" "}
                  <p className="text-sm text-muted-foreground">
                    updated on{" "}
                    {new Date(workflowData?.updated_at).toLocaleString(
                      undefined,
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      }
                    )}
                  </p>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/workflow-templates")}
              >
                Browse Templates
              </Button>
              <Button
                onClick={handleSave}
                disabled={!workflowName || isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Workflow
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* ReactFlow Canvas */}
          <div className="flex-1 h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
              <Panel
                position="bottom-right"
                className="bg-background p-2 rounded-md shadow"
              >
                <div className="text-xs text-muted-foreground">
                  WorkFlow ID: {workflowId}
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default WorkflowEditor;
