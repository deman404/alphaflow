"use client";

import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { GitBranch, Repeat, RefreshCw } from "lucide-react";

import { useReactFlow } from "@xyflow/react";
export function IfNode({
  id,
  data,
}: {
  id: string;
  data: { highlight: any; condition?: string };
}) {
  const { setNodes } = useReactFlow();
  const [condition, setCondition] = useState(data.condition || "x > 0");

  // ✨ Whenever condition changes, update the node.data
  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                condition,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  }, [condition, id, setNodes]);

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg border p-5 min-w-full transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-orange-500 !w-3 !h-3 !border-2"
      />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-orange-100 rounded-lg">
          <GitBranch className="w-4 h-4 text-orange-600" />
        </div>
        <span className="font-medium">If Condition</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="!bg-green-500 !w-3 !h-3 !border-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="!bg-red-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

export function ForLoopNode({
  id,
  data,
}: {
  id: string;
  data: {
    highlight: any;
    step: number;
    end: number;
    start: number;
    label: string;
  };
}) {
  const { setNodes } = useReactFlow();

  const [start, setStart] = useState(data?.start ?? 0);
  const [end, setEnd] = useState(data?.end ?? 10);
  const [step, setStep] = useState(data?.step ?? 1);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                start,
                end,
                step,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  }, [start, end, step, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !w-3 !h-3 !border-2"
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Repeat className="w-4 h-4 text-purple-600" />
        </div>
        <span className="font-medium">For Loop</span>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start</label>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End</label>
            <input
              type="number"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Step</label>
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

export function WhileLoopNode({ id, data }: { id: string; data: any }) {
  const { setNodes } = useReactFlow();
  const [condition, setCondition] = useState(data?.condition || "true");

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, condition, updatedAt: Date.now() },
            }
          : node
      )
    );
  }, [condition, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-500 !w-3 !h-3 !border-2"
      />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-cyan-100 rounded-lg">
          <RefreshCw className="w-4 h-4 text-cyan-600" />
        </div>
        <span className="font-medium">While Loop</span>
      </div>

      <div className="space-y-3">
        <input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder="Enter condition"
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}
