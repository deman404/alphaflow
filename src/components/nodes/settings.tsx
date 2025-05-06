"use client";

import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  ArrowRight,
  Box,
  CirclePlay,
  CircleStop,
  Minus,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import React from "react";

//text
export function TextNode({
  id,
  data,
}: {
  id: string;
  data: {
    highlight: any;
    label: string;
  };
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("string");
  const { setNodes } = useReactFlow(); // ✅ we use ReactFlow to update node data

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, inputValue, inputType } }
          : node
      )
    );
  }, [inputValue, inputType, id, setNodes]); // ✅ Update when changed

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !border-2 !bg-blue-500"
      />

      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 bg-emerald-700 rounded-md">
          <ArrowRight className="w-4 h-4 text-emerald-300" />
        </div>
        <span className="font-medium text-sm text-white">Text Node</span>
      </div>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Input Value
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter input value..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Type
          </label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent cursor-pointer appearance-none"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!w-3 !h-3 !border-2 !bg-blue-500"
      />
    </div>
  );
}

export function DefaultNode({
  id,
  data,
}: {
  id: string;
  data: {
    highlight?: boolean;
    inputs?: string[];
    outputs?: string[];
    logic?: string;
  };
}) {
  const { setNodes } = useReactFlow();

  const inputs = data.inputs ?? [""];
  const outputs = data.outputs ?? [""];
  const logic = data.logic ?? "";

  const updateNode = (newData: Partial<typeof data>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...newData,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  };

  const addInput = () => updateNode({ inputs: [...inputs, ""] });
  const addOutput = () => updateNode({ outputs: [...outputs, ""] });

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    updateNode({ inputs: newInputs });
  };

  const removeOutput = (index: number) => {
    const newOutputs = outputs.filter((_, i) => i !== index);
    updateNode({ outputs: newOutputs });
  };

  const updateInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    updateNode({ inputs: newInputs });
  };

  const updateOutput = (index: number, value: string) => {
    const newOutputs = [...outputs];
    newOutputs[index] = value;
    updateNode({ outputs: newOutputs });
  };

  const updateLogic = (value: string) => updateNode({ logic: value });

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[360px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-500 !w-3 !h-3 !border-2"
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
          <Box className="w-5 h-5 text-slate-600" />
        </div>
        <span className="font-semibold text-gray-800">Process Node</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-600">
            Input Parameters
          </label>
          <button
            onClick={addInput}
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
            title="Add input"
          >
            <Plus className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="space-y-3">
          {inputs.map((input, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => updateInput(index, e.target.value)}
                placeholder={`Parameter ${index + 1}`}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
              />
              {inputs.length > 1 && (
                <button
                  onClick={() => removeInput(index)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove input"
                >
                  <Minus className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Processing Logic
        </label>
        <textarea
          value={logic}
          onChange={(e) => updateLogic(e.target.value)}
          placeholder="Enter logic (ex: data.x + data.y)"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
          rows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-600">
            Output Parameters
          </label>
          <button
            onClick={addOutput}
            className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
            title="Add output"
          >
            <Plus className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="space-y-3">
          {outputs.map((output, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={output}
                onChange={(e) => updateOutput(index, e.target.value)}
                placeholder={`Result ${index + 1}`}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
              />
              {outputs.length > 1 && (
                <button
                  onClick={() => removeOutput(index)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove output"
                >
                  <Minus className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

//output
export function OutputNode({
  id,
  data,
}: {
  id: string;
  data: {
    highlight: any;
    input?: any;
  };
}) {
  const [outputFormat, setOutputFormat] = useState("raw");
  const [fullValue, setFullValue] = useState(""); // full value
  const [displayedValue, setDisplayedValue] = useState(""); // displayed value for streaming

  useEffect(() => {
    if (data?.input !== undefined) {
      const formatted = formatValue(data.input, outputFormat);
      setFullValue(formatted);
      setDisplayedValue(""); // reset before streaming starts
    }
  }, [data?.input, outputFormat]);

  useEffect(() => {
    if (fullValue) {
      let index = 0;

      const interval = setInterval(() => {
        index++;
        setDisplayedValue(fullValue.slice(0, index));

        if (index >= fullValue.length) {
          clearInterval(interval);
        }
      }, 25); // speed of streaming (smaller = faster)

      return () => clearInterval(interval);
    }
  }, [fullValue]);

  const formatValue = (input: any, format: string) => {
    if (input === undefined || input === null) return "";

    try {
      switch (format) {
        case "json":
          return JSON.stringify(input, null, 2);
        case "string":
          return String(input);
        case "number":
          return Number(input).toString();
        case "raw":
        default:
          return String(input);
      }
    } catch (error) {
      console.error("[OutputNode] Error formatting value:", error);
      return "⚠️ Error formatting value";
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-pink-500 !w-3 !h-3 !border-2"
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-white">Output Node</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Output Value
          </label>
          <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-lg min-h-[60px] text-sm text-gray-200 font-medium whitespace-pre-wrap break-words">
            {displayedValue !== "" ? (
              displayedValue
            ) : (
              <div className="text-gray-400">Waiting for input...</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Output Format
          </label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 hover:border-gray-500 cursor-pointer"
          >
            <option value="raw">Raw Value</option>
            <option value="json">JSON</option>
            <option value="string">String</option>
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    </div>
  );
}

//start
export function StartNode({
  id,
  data,
}: {
  id: string;
  data: { label: string };
}) {
  // Optional: Trigger something when flow starts (depends on your flow system)
  useEffect(() => {
    console.log(`[StartNode] Ready to start:`, id);
    // You can trigger automatic events here later if needed
  }, [id]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <CirclePlay className="w-4 h-4 text-green-600" />
        </div>
        <span className="font-medium">Start Node</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="start-output"
        className="!bg-green-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

//end
export function EndNode({ data }: { data: { label: string } }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle type="target" position={Position.Top} className="!bg-red-500" />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <CircleStop className="w-4 h-4 text-red-600" />
        </div>
        <span className="font-medium">End Node</span>
      </div>
    </div>
  );
}
