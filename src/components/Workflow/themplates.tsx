import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { on } from "events";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";

export default function Templates({
  name,
  description,
  complexity,
  onClick,
  deleteFlow
}: {
  name: string;
  description: string;
  complexity: string;
  onClick: () => void;
  deleteFlow?: () => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden rounded-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground ">
          {description || "No description available"}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-start space-x-2">
        <Button onClick={onClick} size="sm" className="gap-1">
          Use Template
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button onClick={deleteFlow} size="sm" className="gap-1">
          delete
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
