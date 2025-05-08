import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Cog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Node } from "@xyflow/react";

interface PropertiesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  onUpdateNode: (node: Node) => void;
}

export default function Properties({
  open,
  onOpenChange,
  selectedNode,
  setSelectedNode,
  onUpdateNode,
}: PropertiesProps) {
  const [localData, setLocalData] = useState<any>({});

  useEffect(() => {
    if (selectedNode) {
      setLocalData(selectedNode.data || {});
    }
  }, [selectedNode]);

  const handleChange = (key: string, value: string) => {
    setLocalData((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleSave = () => {
    if (selectedNode) {
      const updatedNode = { ...selectedNode, data: { ...localData } };
      onUpdateNode(updatedNode);
      setSelectedNode(updatedNode);
      toast.success("Node parameters saved successfully!");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Node Properties</SheetTitle>
          <SheetDescription>
            Configure the selected node’s parameters
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
              <h3 className="text-sm font-medium mb-2">Parameters</h3>
              {Object.keys(localData).map((key) => (
                <div key={key} className="mb-3">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    {key}
                  </label>
                  <Input
                    value={localData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter>
              <Button onClick={handleSave} className="w-full">
                Save Parameters
              </Button>
            </SheetFooter>
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
