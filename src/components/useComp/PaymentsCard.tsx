import React from "react";
import { Button } from "../ui/button";

interface PaymentsCardProps {
  name: String;
  lastNumber: number;
  expireDate: String | number;
}
export default function PaymentsCard({
  name,
  lastNumber,
  expireDate,
}: PaymentsCardProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-6 bg-white/20 rounded mr-3 flex items-center justify-center text-xs">
          {name}
        </div>
        <div>
          <p className="font-medium">
            {name} ending in {lastNumber}
          </p>
          <p className="text-xs text-muted-foreground">Expires {expireDate}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Edit
      </Button>
    </div>
  );
}
