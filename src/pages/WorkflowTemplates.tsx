
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '../../supabaseClient';
// Template definitions
const automationTemplates = [
  {
    id: 'email-workflow',
    name: 'Email Processing',
    description: 'Automatically categorize, respond to, and route incoming emails based on content.',
    category: 'automation',
    complexity: 'Medium',
    nodes: [
      { id: 'trigger_email', type: 'trigger_email', position: { x: 100, y: 100 }, data: { label: 'Email Received' } },
      { id: 'logic_condition', type: 'logic_condition', position: { x: 300, y: 100 }, data: { label: 'Check Content' } },
      { id: 'action_notification', type: 'action_notification', position: { x: 500, y: 50 }, data: { label: 'Send Notification' } },
      { id: 'action_email', type: 'action_email', position: { x: 500, y: 150 }, data: { label: 'Send Reply' } }
    ],
    edges: [
      { id: 'e1-2', source: 'trigger_email', target: 'logic_condition' },
      { id: 'e2-3', source: 'logic_condition', target: 'action_notification' },
      { id: 'e2-4', source: 'logic_condition', target: 'action_email' }
    ]
  },
  {
    id: 'schedule-tasks',
    name: 'Scheduled Tasks',
    description: 'Run tasks on a schedule with notification and logging capabilities.',
    category: 'automation',
    complexity: 'Simple',
    nodes: [
      { id: 'trigger_schedule', type: 'trigger_schedule', position: { x: 100, y: 100 }, data: { label: 'Schedule Trigger' } },
      { id: 'action_database', type: 'action_database', position: { x: 300, y: 100 }, data: { label: 'Update Database' } },
      { id: 'action_notification', type: 'action_notification', position: { x: 500, y: 100 }, data: { label: 'Send Notification' } }
    ],
    edges: [
      { id: 'e1-2', source: 'trigger_schedule', target: 'action_database' },
      { id: 'e2-3', source: 'action_database', target: 'action_notification' }
    ]
  }
];

const integrationTemplates = [
  {
    id: 'webhook-processor',
    name: 'Webhook Integration',
    description: 'Process incoming webhooks and route data to different systems.',
    category: 'integration',
    complexity: 'Advanced',
    nodes: [
      { id: 'trigger_webhook', type: 'trigger_webhook', position: { x: 100, y: 100 }, data: { label: 'Webhook Received' } },
      { id: 'logic_switch', type: 'logic_switch', position: { x: 300, y: 100 }, data: { label: 'Route Data' } },
      { id: 'action_database', type: 'action_database', position: { x: 500, y: 50 }, data: { label: 'Store in Database' } },
      { id: 'action_notification', type: 'action_notification', position: { x: 500, y: 150 }, data: { label: 'Send Notification' } }
    ],
    edges: [
      { id: 'e1-2', source: 'trigger_webhook', target: 'logic_switch' },
      { id: 'e2-3', source: 'logic_switch', target: 'action_database' },
      { id: 'e2-4', source: 'logic_switch', target: 'action_notification' }
    ]
  }
];

const dataTemplates = [
  {
    id: 'data-transformation',
    name: 'Data Transformation',
    description: 'Extract, transform, and load data between different systems.',
    category: 'data',
    complexity: 'Advanced',
    nodes: [
      { id: 'trigger_schedule', type: 'trigger_schedule', position: { x: 100, y: 100 }, data: { label: 'Schedule Trigger' } },
      { id: 'action_database', type: 'action_database', position: { x: 300, y: 50 }, data: { label: 'Extract Data' } },
      { id: 'logic_condition', type: 'logic_condition', position: { x: 300, y: 150 }, data: { label: 'Transform Data' } },
      { id: 'action_database', type: 'action_database', position: { x: 500, y: 100 }, data: { label: 'Load Data' } }
    ],
    edges: [
      { id: 'e1-2', source: 'trigger_schedule', target: 'action_database' },
      { id: 'e1-3', source: 'trigger_schedule', target: 'logic_condition' },
      { id: 'e2-4', source: 'action_database', target: 'action_database' },
      { id: 'e3-4', source: 'logic_condition', target: 'action_database' }
    ]
  }
];

const WorkflowTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = React.useState<any>(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  


  const handleTemplateSelect = (template: any) => {
    // Store the selected template in sessionStorage to use in the editor
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    toast.success(`${template.name} template selected`);
    navigate('/workflow-editor');
  };

  const renderTemplateCards = (templates: any[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{template.name}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {template.complexity}
                </span>
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
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
              <Button
                onClick={() => handleTemplateSelect(template)}
                size="sm"
                className="gap-1"
              >
                Use Template
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        size="sm"
        className="mb-6" 
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Workflow Templates</h1>
          <p className="text-muted-foreground">Start with a pre-built workflow template</p>
        </div>
      </div>

      <Tabs defaultValue="automation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="data">Data Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automation" className="space-y-4">
          <div className="pb-2">
            <h3 className="text-lg font-medium">Automation Templates</h3>
            <p className="text-sm text-muted-foreground">
              Templates for automating repetitive tasks and processes.
            </p>
          </div>
          {renderTemplateCards(automationTemplates)}
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-4">
          <div className="pb-2">
            <h3 className="text-lg font-medium">Integration Templates</h3>
            <p className="text-sm text-muted-foreground">
              Templates for connecting different systems and applications.
            </p>
          </div>
          {renderTemplateCards(integrationTemplates)}
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <div className="pb-2">
            <h3 className="text-lg font-medium">Data Processing Templates</h3>
            <p className="text-sm text-muted-foreground">
              Templates for working with and transforming data.
            </p>
          </div>
          {renderTemplateCards(dataTemplates)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowTemplates;
