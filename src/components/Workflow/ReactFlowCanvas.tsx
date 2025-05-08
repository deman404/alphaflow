import React, { useState, useCallback } from "react";
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
import { nodeTypes } from "@/components/nodes/index";

// Node types

// Initial empty flow
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface ReactFlowCanvasProps {
  onNodeClick?: (node: Node) => void;
  onSelectionChange?: (nodes: Node[]) => void;
}

const ReactFlowCanvas: React.FC<ReactFlowCanvasProps> = ({
  onNodeClick,
  onSelectionChange,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node selection for properties panel

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

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        onNodeClick={(_, node) => {
          onNodeClick?.(node); // أرسل النود للـ parent
        }}
        onSelectionChange={(params) => {
          const selectedNodes = params.nodes || [];
          onSelectionChange?.(selectedNodes); // أرسل المصفوفة
        }}
      >
        <Background className="bg-[#0e0e11]" />
        <Controls className=" text-black" />
        <MiniMap className="bg-black" />
        <Panel
          position="bottom-right"
          className="bg-background p-2 rounded-md shadow"
        >
          <div className="text-xs text-muted-foreground">
            {nodes.length} nodes · {edges.length} connections
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
export default ReactFlowCanvas;
