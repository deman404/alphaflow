"use client";

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Box, Plus, Minus } from "lucide-react";
import { ArrowRight, GitBranch, ArrowLeft } from "lucide-react";

export function DefaultNode({ data }: { data: { label: string } }) {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [outputs, setOutputs] = useState<string[]>([""]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const updateInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addOutput = () => {
    setOutputs([...outputs, ""]);
  };

  const removeOutput = (index: number) => {
    setOutputs(outputs.filter((_, i) => i !== index));
  };

  const updateOutput = (index: number, value: string) => {
    const newOutputs = [...outputs];
    newOutputs[index] = value;
    setOutputs(newOutputs);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 min-w-[360px] transition-shadow hover:shadow-xl">
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

      {/* Inputs Section */}
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
                className="flex-1 px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 hover:border-gray-200"
                placeholder={`Parameter ${index + 1}`}
              />
              <select className="w-28 px-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 hover:border-gray-200 appearance-none cursor-pointer">
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object</option>
              </select>
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

      {/* Processing Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Processing Logic
        </label>
        <textarea
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 hover:border-gray-200"
          placeholder="Enter processing logic..."
          rows={3}
        />
      </div>

      {/* Outputs Section */}
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
                className="flex-1 px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 hover:border-gray-200"
                placeholder={`Result ${index + 1}`}
              />
              <select className="w-28 px-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 hover:border-gray-200 appearance-none cursor-pointer">
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object</option>
              </select>
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

export function InputNode({ data }: { data: { label: string } }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 min-w-[200px] max-w-[280px]">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-2 h-2 !bg-blue-500" 
      />
      
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 bg-emerald-100 rounded-md">
          <ArrowRight className="w-4 h-4 text-emerald-600" />
        </div>
        <span className="font-medium text-sm">Input Node</span>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Input Value
          </label>
          <input
            type="text"
            placeholder="Enter input value..."
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent cursor-pointer appearance-none">
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
        className="w-2 h-2 !bg-blue-500"
      />
    </div>
  );
}


export function OutputNode({ data }: { data: { label: string } }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 min-w-[280px] transition-shadow hover:shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-pink-500 !w-3 !h-3 !border-2"
      />
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-pink-600" />
        </div>
        <span className="font-semibold text-gray-800">Output Node</span>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Output Value
          </label>
          <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-lg min-h-[60px]">
            <div className="text-sm text-gray-400 font-medium">
              Output will appear here
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Output Format
          </label>
          <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 hover:border-gray-200 appearance-none cursor-pointer">
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
