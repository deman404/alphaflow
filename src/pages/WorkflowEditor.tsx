
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';
import { ArrowLeft, Save, Workflow, Cog, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {supabase} from '../../supabaseClient';
import { nodeTypes } from "@/components/nodes/index";

// Node types
// Initial empty flow
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const WorkflowEditor: React.FC = () => {
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const [user ,setUser] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("New Workflow");

  // Load template if available
  useEffect(() => {
    const templateData = sessionStorage.getItem('selectedTemplate');
    
    if (templateData) {
      try {
        const template = JSON.parse(templateData);
        if (template.nodes && template.edges) {
          setNodes(template.nodes);
          setEdges(template.edges);
          setWorkflowName(template.name || "New Workflow");
          toast.success(`Loaded '${template.name}' template`);
        }
        // Clear the template from session storage to avoid loading it again on refresh
        sessionStorage.removeItem('selectedTemplate');
      } catch (error) {
        console.error("Error loading template:", error);
      }
    }
  }, [setNodes, setEdges]);

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

  // Handle saving the workflow
  const handleSave = () => {
    // In a real app, you would save to the backend here
    toast.success("Workflow saved successfully!");
  };

  // Handle adding new nodes when dragged from the sidebar
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

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
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Node types for sidebar
  const nodeCategories = [
    {
      name: 'Triggers',
      items: [
        { type: 'text', label: 'Email Trigger' },
        { type: 'outputext', label: 'Schedule Trigger' },
        { type: 'trigger_webhook', label: 'Webhook Trigger' },
      ],
    },
    {
      name: 'Actions',
      items: [
        { type: 'action_email', label: 'Send Email' },
        { type: 'action_notification', label: 'Send Notification' },
        { type: 'action_database', label: 'Update Database' },
      ],
    },
    {
      name: 'Logic',
      items: [
        { type: 'if', label: 'Condition' },
        { type: 'logic_switch', label: 'Switch' },
        { type: 'logic_loop', label: 'Loop' },
      ],
    },
  ];

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
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center ml-4">
                <Workflow className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">
                  {workflowName}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/workflow-templates')}
              >
                Browse Templates
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Workflow
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
              <Panel position="bottom-right" className="bg-background p-2 rounded-md shadow">
                <div className="text-xs text-muted-foreground">
                  {nodes.length} nodes · {edges.length} connections
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Properties Panel */}
        <Sheet open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
          <SheetContent side="right" className="w-[350px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Node Properties</SheetTitle>
              <SheetDescription>
                Configure the selected node's parameters
              </SheetDescription>
            </SheetHeader>
            {selectedNode ? (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium">ID</h3>
                  <p className="text-sm text-muted-foreground">{selectedNode.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Type</h3>
                  <p className="text-sm text-muted-foreground">{selectedNode.type}</p>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="text-sm font-medium">Parameters</h3>
                  <p className="text-sm text-muted-foreground">
                    Parameters for this node would be displayed here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <Cog className="h-10 w-10 text-muted-foreground opacity-20" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a node to view its properties
                </p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarProvider>
    </div>
  );
};

export default WorkflowEditor;
