import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { ArrowLeft, Save, Workflow, Cog, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabaseClient";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import Properties from "@/components/Workflow/Properties";
import ReactFlowCanvas from "@/components/Workflow/ReactFlowCanvas";
// Node types

// Initial empty flow

const WorkflowEditor: React.FC = () => {
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [nodesData, setNodesData] = useState<Node[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleNodesUpdate = (updatedNodes: Node[]) => {
    setNodesData(updatedNodes);
  };

  // Handle saving the workflow
  const onUpdateNode = (updatedNode: Node) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
  };

  // Handle adding new nodes when dragged from the sidebar
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Node types for sidebar
  const nodeCategories = [
    {
      name: "Triggers",
      items: [
        { type: "text", label: "Text" },
        { type: "outputext", label: "output" },
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
      .from("workflows")
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

  return (
    <div className="h-screen w-full flex">
      <SidebarProvider defaultOpen={true}>
        <Sidebar variant="sidebar">
          <SidebarHeader className="border-b">
            <div className="px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Workflow Nodes</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
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
                          <div className="p-1.5 bg-white rounded mr-2">
                            <Workflow className="w-4 h-4 text-primary" />
                          </div>
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
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center ml-4">
                <Workflow className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">
                  {userProfile?.flow_name || "Untitled Workflow"}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <Button variant="default" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Workflow
              </Button>
            </div>
          </div>

          {/* ReactFlow Canvas */}
          <ReactFlowCanvas
            onNodeClick={(node) => {
              setSelectedNode(node);
              setIsPropertiesOpen(true);
            }}
            onSelectionChange={(nodes) => {
              if (nodes.length === 0) {
                setSelectedNode(null);
                setIsPropertiesOpen(false);
              }
            }}
            onNodesUpdate={handleNodesUpdate}
          />
        </div>

        {/* Properties Panel */}
        <Properties
          open={isPropertiesOpen}
          onOpenChange={setIsPropertiesOpen}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          onUpdateNode={onUpdateNode}
        />
      </SidebarProvider>
    </div>
  );
};

export default WorkflowEditor;
