
import React, { useState, useCallback } from 'react';
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

//interface
interface PropertiesProps{
    open: boolean 
    onOpenChange : (open: boolean) => void
    selectedNode: Node | null
    setSelectedNode: (node: Node | null) => void
}

export default function Properties({open ,onOpenChange , selectedNode , setSelectedNode}: PropertiesProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
              <p className="text-sm text-muted-foreground">
                {selectedNode.type}
              </p>
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
  );
}
