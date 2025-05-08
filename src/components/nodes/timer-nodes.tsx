"use client";

import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Timer, Clock } from "lucide-react";

import { useReactFlow } from "@xyflow/react";

//timer
export function TimerNode({
  id,
  data,
}: {
  id: string;
  data: {
    triggerRun?: boolean;
    highlight?: boolean;
    time?: number;
  };
}) {
  const { setNodes } = useReactFlow();

  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (data?.triggerRun) {
      console.log("[TimerNode] 🟢 Triggered to start ticking...");
      setIsRunning(true);
    }
  }, [data?.triggerRun]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, elapsed } } : node
      )
    );
  }, [elapsed, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-rose-500" />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-rose-100 rounded-lg">
          <Timer className="w-5 h-5 text-rose-600" />
        </div>
        <span className="font-semibold">Timer Node</span>
      </div>

      <div className="space-y-3">
        <div className="text-2xl font-mono text-center">{elapsed}s</div>
        <div className="text-center text-xs text-gray-500">
          {isRunning ? "Running..." : "Paused"}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-rose-500"
      />
    </div>
  );
}

export function DelayNode({
  id,
  data,
}: {
  id: string;
  data: { highlight: any; triggerRun?: boolean };
}) {
  const { setNodes } = useReactFlow();
  const [delay, setDelay] = useState(1000); // ms
  const [isWaiting, setIsWaiting] = useState(false);
  const [done, setDone] = useState(false);

  // Start waiting when flow is triggered
  useEffect(() => {
    if (data?.triggerRun) {
      console.log("[DelayNode] 🚀 Triggered!");
      setIsWaiting(true);
      setDone(false);

      setTimeout(() => {
        setIsWaiting(false);
        setDone(true);
      }, delay);
    }
  }, [data?.triggerRun, delay]);

  // Always update backend when delay value changes
  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, delay } } : node
      )
    );
  }, [delay, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !w-3 !h-3 !border-2"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Clock className="w-5 h-5 text-amber-600" />
        </div>
        <span className="font-semibold text-gray-800">Delay Node</span>
      </div>

      {/* Status Display */}
      <div className="text-center text-sm mb-2">
        {isWaiting ? (
          <div className="text-amber-500 font-semibold animate-pulse">
            ⏳ Waiting {delay}ms...
          </div>
        ) : done ? (
          <div className="text-green-500 font-semibold">✅ Done!</div>
        ) : (
          <div className="text-gray-400">Ready</div>
        )}
      </div>

      {/* Input for delay */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">
          Delay Duration (ms)
        </label>
        <input
          type="number"
          min={0}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-amber-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}
