import React from "react";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";


interface BillingCardProps {
    date: string;
    plan: string;
    type: string;
    price: number | string; 
  }

export default function BillingCard({ date, plan, type, price } : BillingCardProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
      <div>
        <p className="font-medium">{date}</p>
        <p className="text-xs text-muted-foreground">
          {plan} - {type}
        </p>
      </div>
      <div className="flex items-center">
        <span className="mr-4">${price}</span>
        <Button variant="ghost" size="sm" className="h-8">
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
