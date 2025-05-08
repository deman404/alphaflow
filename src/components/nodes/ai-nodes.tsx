"use client";

import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Wand2, Brain, MessageSquare } from "lucide-react";
import { useReactFlow } from "@xyflow/react";

export function TextCompletionNode({
  id,
  data,
}: {
  id: string;
  data: {
    generatedText: any;
    triggerRun: unknown;
    label: string;
    prompt?: string;
    temperature?: number;
    highlight?: boolean;
  };
}) {
  const { setNodes } = useReactFlow();

  const [prompt, setPrompt] = useState(data.prompt || "");
  const [temperature, setTemperature] = useState(data.temperature ?? 0.7);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data.triggerRun) {
      setIsLoading(true); // Start spinner
    }
  }, [data.triggerRun]);
  useEffect(() => {
    if (data.generatedText) {
      setIsLoading(false); // Stop spinner when data is received
    }
  }, [data.generatedText]);
  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                prompt,
                temperature,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  }, [prompt, temperature, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3 !border-2"
      />
      <div className="flex items-center justify-center mb-2">
        {isLoading ? (
          <div className="w-5 h-5 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
        ) : (
          <div className="text-sm text-gray-600">Ready ✅</div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Wand2 className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium">Text Completion</span>
      </div>

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your prompt..."
          rows={3}
        />

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

export function ImageGenerationNode({ data }: { data: { label: string } }) {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500"
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Brain className="w-4 h-4 text-purple-600" />
        </div>
        <span className="font-medium">Image Generation</span>
      </div>
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Describe the image..."
          rows={3}
        />
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="1024x1024">1024x1024</option>
          <option value="1792x1024">1792x1024</option>
          <option value="1024x1792">1024x1792</option>
        </select>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500"
      />
    </div>
  );
}

export function SentimentAnalysisNode({ data }: { data: { label: string } }) {
  const [text, setText] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle type="target" position={Position.Top} className="!bg-green-500" />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <MessageSquare className="w-4 h-4 text-green-600" />
        </div>
        <span className="font-medium">Sentiment Analysis</span>
      </div>
      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter text to analyze..."
          rows={3}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500"
      />
    </div>
  );
}
