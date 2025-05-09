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

export default function themplates(
  {
    name,
    description,
    complexity,
    onClick,
  }: {
    name: string;
    description: string;
    complexity: string;
    onClick: () => void;
  } = {
    name: "Default",
    description: "This is a default template",
    complexity: "Easy",
    onClick: () => {},
  }
) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {complexity}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 bg-muted rounded-md flex items-center justify-center">
          <FileText className="h-12 w-12 text-muted-foreground/30" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button onClick={onClick} size="sm" className="gap-1">
          Use Template
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
