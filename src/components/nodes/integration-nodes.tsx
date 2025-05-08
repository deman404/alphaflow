"use client";

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Webhook, Globe, MessageSquare, Table } from "lucide-react";

import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export function WebhookNode({ data }: { data: { label: string } }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("POST");

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-indigo-500"
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Webhook className="w-4 h-4 text-indigo-600" />
        </div>
        <span className="font-medium">Webhook</span>
      </div>
      <div className="space-y-3">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Webhook URL"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-indigo-500"
      />
    </div>
  );
}

export function HttpRequestNode({ data }: { data: { label: string } }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Globe className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium">HTTP Request</span>
      </div>
      <div className="space-y-3">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="URL"
        />
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Headers (JSON)"
          rows={2}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500"
      />
    </div>
  );
}

export function WhatsAppNode({
  id,
  data,
}: {
  id: string;
  data: {
    label: string;
    phoneNumber?: string;
    message?: string;
    highlight?: any;
  };
}) {
  const { setNodes } = useReactFlow();

  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber ?? "");
  const [message, setMessage] = useState(data.message ?? "");

  useEffect(() => {
    // Always save to flow when phone or message changes
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                phoneNumber,
                message,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  }, [phoneNumber, message, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-green-500 !w-3 !h-3 !border-2"
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <MessageSquare className="w-4 h-4 text-green-600" />
        </div>
        <span className="font-medium">WhatsApp Message</span>
      </div>

      <div className="space-y-3">
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}

export function GoogleSheetsNode({ id, data }: { id: string; data: any }) {
  const { setNodes } = useReactFlow();

  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [range, setRange] = useState("");

  useEffect(() => {
    if (data.triggerRun) {
      console.log("[GoogleSheetsNode] Triggered! Reading sheet...");
      fetchSheetData();
    }
  }, [data.triggerRun]);
  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                spreadsheetId,
                range,
                updatedAt: Date.now(), // Optional: force refresh
              },
            }
          : node
      )
    );
  }, [spreadsheetId, range, id, setNodes]);

  const fetchSheetData = async () => {
    try {
      const res = await fetch("/api/read-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadsheetId, range }),
      });

      const result = await res.json();
      console.log("[GoogleSheetsNode] Rows:", result.rows);

      setNodes((prev) =>
        prev.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  sheetData: result.rows,
                  updatedAt: Date.now(),
                },
              }
            : node
        )
      );
    } catch (err) {
      console.error("[GoogleSheetsNode] Error fetching sheet:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[280px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-yellow-500"
      />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Table className="w-4 h-4 text-yellow-600" />
        </div>
        <span className="font-medium">Google Sheets</span>
      </div>

      <div className="space-y-3">
        <input
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border rounded"
          placeholder="Spreadsheet ID"
        />
        <input
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border rounded"
          placeholder="Range (e.g., Sheet1!A2:C)"
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-yellow-500"
      />
    </div>
  );
}
