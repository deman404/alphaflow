
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Settings, Users } from 'lucide-react';

const LoggedInWelcome = () => {
  return (
    <div className="flex flex-col space-y-8 p-6 max-w-4xl mx-auto">
      <div className="glass-card p-6 space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Alphaflow</h1>
        <p className="text-muted-foreground">
          You're now logged in. Start building AI workflows without code.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link to="/dashboard" className="w-full">
            <Button variant="default" className="w-full justify-between">
              Go to Dashboard
              <ArrowRight />
            </Button>
          </Link>
          <Link to="/settings" className="w-full">
            <Button variant="outline" className="w-full justify-between">
              Account Settings
              <Settings />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-3">
          <div className="bg-primary/20 p-3 rounded-lg w-fit">
            <Layers className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Create Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Start building your first AI workflow using our drag-and-drop editor.
          </p>
          <Button variant="link" className="p-0">
            Get Started <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="glass-card p-5 space-y-3">
          <div className="bg-primary/20 p-3 rounded-lg w-fit">
            <Users className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Join Community</h3>
          <p className="text-sm text-muted-foreground">
            Connect with other Alphaflow users to share ideas and get help.
          </p>
          <Button variant="link" className="p-0">
            Explore Community <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="glass-card p-5 space-y-3">
          <div className="bg-primary/20 p-3 rounded-lg w-fit">
            <Settings className="text-primary h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Explore Tutorials</h3>
          <p className="text-sm text-muted-foreground">
            Learn how to maximize your productivity with our guides.
          </p>
          <Button variant="link" className="p-0">
            View Tutorials <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoggedInWelcome;