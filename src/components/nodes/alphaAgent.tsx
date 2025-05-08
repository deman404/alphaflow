import { Handle, Position } from "@xyflow/react";
import { Bot } from "lucide-react";

export function AiAgentNode({
  data,
}: {
  data: { name: string; status: string };
}) {
  return (
    <div className="bg-white text-black rounded-xl border border-gray-300 min-w-[320px] px-4 py-3 relative shadow-md">
      {/* Left Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-green-500 "
      />

      {/* Right Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-red-500 "
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-200 p-2 rounded-md">
          <Bot className="text-black w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-black text-sm">
            {data?.name || "AI Agent"}
          </div>
          <div className="text-gray-500 text-xs">{data?.status || "Idle"}</div>
        </div>
      </div>

      {/* 5 Bottom Handles */}
      {["chat-model", "memory", "tool", "extra", "final"].map((id, idx) => (
        <Handle
          key={id}
          id={id}
          type="source"
          position={Position.Bottom}
          className="!bg-gray-500"
          style={{
            bottom: 0,
            left: `${(idx + 1) * 16}%`,
            transform: "translateX(-50%)",
          }}
        />
      ))}
    </div>
  );
}
