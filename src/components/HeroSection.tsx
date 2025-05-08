import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import "react-flow-renderer/dist/style.css";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Connection,
  Edge,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TextNode, OutputNode } from "./nodes/settings";
import { Link } from "react-router-dom";
const nodeTypes = {
  text: TextNode,
  out: OutputNode,
};

const HeroSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      data: { label: "Text Node " },
      position: { x: 100, y: 50 },
      type: "text", // This is the custom text node
    },
    {
      id: "2",
      data: { label: "out Node " },
      position: { x: 300, y: 50 },
      type: "out", // This is the custom text node
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "1-2", source: "1", target: "2", label: "Link to Node 2" },
    { id: "2", source: "2", target: "3", label: "Link to Node 3" },
  ]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [showCopilot, setShowCopilot] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!position) {
        return;
      }

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-white/10 text-primary border border-primary/30 mb-4">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Introducing Alpha.flow
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build AI Workflows{" "}
              <span className="gradient-text">Without Code</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Visually create smart, automated agents that work for you 24/7. No
              programming required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                <Link to="/SignUp" className="flex items-center">
                  Try for Free
                </Link>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:border-primary"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Trusted by 10,000+ organizations
              </p>
              <div className="flex justify-center lg:justify-start gap-6 mt-4 opacity-70">
               
                <div className="h-6 w-24 bg-white/20 rounded animate-pulse-slow"></div>
                <div className="h-6 w-20 bg-white/20 rounded animate-pulse-slow delay-75"></div>
                <div className="h-6 w-28 bg-white/20 rounded animate-pulse-slow delay-150"></div>
                <div className="h-6 w-24 bg-white/20 rounded animate-pulse-slow delay-300"></div>
              </div>
            </div> */}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 p-1 shadow-2xl">
              <div className="aspect-square md:aspect-video w-full rounded-lg overflow-hidden glass-card">
                <div className="w-full h-full bg-black/50 grid-pattern">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src="/flow.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
