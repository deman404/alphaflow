
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description = "You don't have any items in this list yet. Create your first one to get started.",
  icon,
  actionLabel = "Create New",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 border border-dashed border-gray-600 rounded-lg bg-background/40 backdrop-blur-sm">
      {icon && (
        <div className="bg-primary/20 p-4 rounded-full">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-medium">{title}</h3>
      
      <p className="text-muted-foreground max-w-md">
        {description}
      </p>
      
      
    </div>
  );
};

export default EmptyState;