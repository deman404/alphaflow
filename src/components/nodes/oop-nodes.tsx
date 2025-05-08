"use client";

import { Handle, Position } from "@xyflow/react";
import {
  Box,
  GitMerge,
  Plus,
  Minus,
  Code,
  FunctionSquare,
  Tag,
} from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export function ClassNode({ data }: { data: any }) {
  const { setNodes } = useReactFlow();

  const [className, setClassName] = useState(data.className || "MyClass");
  const [properties, setProperties] = useState(
    data.autoClass
      ? Object.entries(data.autoClass).map(([name, values]: any) => ({
          name,
          type: Array.isArray(values) ? typeof values[0] : typeof values,
        }))
      : data.properties || [{ name: "", type: "string" }]
  );

  useEffect(() => {
    if (data.autoClass && Object.keys(data.autoClass).length > 0) {
      const propsFromAuto = Object.entries(data.autoClass).map(
        ([name, values]) => ({
          name,
          type:
            Array.isArray(values) && values.length > 0
              ? typeof values[0]
              : typeof values,
        })
      );
      setProperties(propsFromAuto);
    }
  }, [data.autoClass]);

  const [methods, setMethods] = useState(
    data.methods || [{ name: "", params: "" }]
  );

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === data.id
          ? {
              ...node,
              data: {
                ...node.data,
                className,
                properties,
                methods,
              },
            }
          : node
      )
    );
  }, [className, properties, methods, data.id, setNodes]);

  useEffect(() => {
    const examples =
      properties
        ?.filter((p: { name: any }) => p.name)
        ?.map((p: { name: any }) => ({
          name: `MyClass.data.${p.name}`,
          params: "",
        })) ?? [];

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === data.id
          ? {
              ...node,
              data: {
                ...node.data,
                className,
                properties,
                methods: examples.length > 0 ? examples : methods,
              },
            }
          : node
      )
    );
  }, [className, properties, methods, data.id, setNodes]);

  const addProperty = () => {
    setProperties([...properties, { name: "", type: "string" }]);
  };

  const removeProperty = (index: number) => {
    setProperties(properties.filter((_: any, i: number) => i !== index));
  };

  const addMethod = () => {
    setMethods([...methods, { name: "", params: "" }]);
  };

  const removeMethod = (index: number) => {
    setMethods(methods.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[320px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-violet-500"
      />

      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-violet-100 rounded-lg">
          <Box className="w-4 h-4 text-violet-600" />
        </div>
        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="font-medium bg-transparent border-b border-dashed border-violet-200 focus:border-violet-500 focus:outline-none px-1"
          placeholder="Class Name"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Code className="w-4 h-4" /> Properties
          </label>
          <button
            onClick={addProperty}
            className="p-1 hover:bg-violet-100 rounded-full transition-colors"
            title="Add property"
          >
            <Plus className="w-4 h-4 text-violet-600" />
          </button>
        </div>
        <div className="space-y-2">
          {properties.map(
            (
              prop: {
                name: string | number | readonly string[] | undefined;
                type: string | number | readonly string[] | undefined;
              },
              index: number
            ) => (
              <div key={index} className="flex gap-2">
                <input
                  value={prop.name}
                  onChange={(e) => {
                    const newProps = [...properties];
                    newProps[index].name = e.target.value;
                    setProperties(newProps);
                  }}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="propertyName"
                />

                {properties.length > 1 && (
                  <button
                    onClick={() => removeProperty(index)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove property"
                  >
                    <Minus className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <FunctionSquare className="w-4 h-4" /> Usage Examples
          </label>
          <button
            onClick={addMethod}
            className="p-1 hover:bg-violet-100 rounded-full transition-colors"
            title="Add method"
          >
            <Plus className="w-4 h-4 text-violet-600" />
          </button>
        </div>
        <div className="space-y-2">
          {methods.map(
            (
              method: {
                name: string | number | readonly string[] | undefined;
                params: string | number | readonly string[] | undefined;
              },
              index: number
            ) => (
              <div key={index} className="flex gap-2">
                <Handle
                  type="source"
                  position={Position.Right}
                  id={method.name ? String(method.name) : undefined}
                  className="!bg-violet-500 !w-3 !h-3 !border"
                  style={{ top: "50%", right: "-10px" }}
                />
                <input
                  value={method.name}
                  onChange={(e) => {
                    const newMethods = [...methods];
                    newMethods[index].name = e.target.value;
                    setMethods(newMethods);
                  }}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="methodName"
                />
                <input
                  value={method.name}
                  onChange={(e) => {
                    const newMethods = [...methods];
                    newMethods[index].name = e.target.value;
                    setMethods(newMethods);
                  }}
                  placeholder="Usage (ex: MyClass.data.name)"
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />

                {methods.length > 1 && (
                  <button
                    onClick={() => removeMethod(index)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove method"
                  >
                    <Minus className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-violet-500"
      />
    </div>
  );
}

export function InheritanceNode({ data }: { data: { label: string } }) {
  const [parentClass, setParentClass] = useState("Parent");
  const [childClass, setChildClass] = useState("Child");
  const [inheritedProps, setInheritedProps] = useState<string[]>([""]);

  const addInheritedProp = () => {
    setInheritedProps([...inheritedProps, ""]);
  };

  const removeInheritedProp = (index: number) => {
    setInheritedProps(inheritedProps.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-fuchsia-500"
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-fuchsia-100 rounded-lg">
          <GitMerge className="w-4 h-4 text-fuchsia-600" />
        </div>
        <span className="font-medium">Inheritance</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Parent Class
          </label>
          <input
            value={parentClass}
            onChange={(e) => setParentClass(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            placeholder="ParentClass"
          />
        </div>

        <div className="relative py-4">
          <div className="absolute left-1/2 -translate-x-1/2 h-full border-l-2 border-fuchsia-200"></div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Child Class
          </label>
          <input
            value={childClass}
            onChange={(e) => setChildClass(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            placeholder="ChildClass"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-600">
              Inherited Properties
            </label>
            <button
              onClick={addInheritedProp}
              className="p-1 hover:bg-fuchsia-100 rounded-full transition-colors"
              title="Add inherited property"
            >
              <Plus className="w-4 h-4 text-fuchsia-600" />
            </button>
          </div>
          <div className="space-y-2">
            {inheritedProps.map((prop, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={prop}
                  onChange={(e) => {
                    const newProps = [...inheritedProps];
                    newProps[index] = e.target.value;
                    setInheritedProps(newProps);
                  }}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  placeholder="Inherited property"
                />
                {inheritedProps.length > 1 && (
                  <button
                    onClick={() => removeInheritedProp(index)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove inherited property"
                  >
                    <Minus className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-fuchsia-500"
      />
    </div>
  );
}

export function VariableInputNode({
  id,
  data,
}: {
  id: string;
  data: {
    highlight: any;
    input?: any;
  };
}) {
  const { setNodes } = useReactFlow();

  const [variableName, setVariableName] = useState("");
  const [variableType, setVariableType] = useState("string");
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    if (typeof data?.input === "string" && data.input !== null) {
      console.log(
        `[VariableInputNode] Receiving incoming data.input:`,
        data.input
      );
      setVariableName(data.input);
    }
  }, [data?.input]);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                variableName,
                variableType,
                defaultValue,
                updatedAt: Date.now(),
              },
            }
          : node
      )
    );
  }, [variableName, variableType, defaultValue, id, setNodes]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-5 min-w-[280px] transition-shadow hover:shadow-xl ${
        data.highlight ? "ring-2 ring-green-400" : ""
      }`}
    >
      {/* Top Handle - target */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-indigo-500 !w-3 !h-3 !border-2"
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
          <Tag className="w-5 h-5 text-indigo-600" />
        </div>
        <span className="font-semibold text-gray-800">Variable Input</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Variable Name
          </label>
          <input
            type="text"
            value={variableName}
            onChange={(e) => setVariableName(e.target.value)}
            placeholder="Enter variable name..."
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-0 focus:border-indigo-400 hover:border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Type</label>
          <select
            value={variableType}
            onChange={(e) => setVariableType(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-0 focus:border-indigo-400 hover:border-gray-300 appearance-none cursor-pointer"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Default Value
          </label>
          <input
            type="text"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            placeholder="Enter default value..."
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-0 focus:border-indigo-400 hover:border-gray-300"
          />
        </div>
      </div>

      {/* Bottom Handle - source */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-indigo-500 !w-3 !h-3 !border-2"
      />
    </div>
  );
}
