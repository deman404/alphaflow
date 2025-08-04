import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RequestFeature = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Feature request submitted successfully! We'll review your suggestion."
    );
    // In a real app, this would send the form data to a backend
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Request a Feature
          </h1>

          <div className="mb-8 text-lg text-muted-foreground">
            <p>
              Help us make Alphaflow better by suggesting new features or
              improvements. We value your input and carefully consider all
              requests.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Feature Title</Label>
                <Input
                  id="title"
                  placeholder="A brief title for your feature request"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="workflow-builder">Workflow Builder</option>
                  <option value="agent-configuration">
                    Agent Configuration
                  </option>
                  <option value="integrations">
                    Integrations & Connections
                  </option>
                  <option value="analytics">Analytics & Reporting</option>
                  <option value="user-interface">User Interface</option>
                  <option value="mobile">Mobile Experience</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your feature request in detail. What problem would it solve? How would it improve your experience?"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="use-case">Use Case</Label>
                <Textarea
                  id="use-case"
                  placeholder="Describe a specific scenario where this feature would be useful"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="importance">
                  How important is this feature to you?
                </Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="low"
                    name="importance"
                    value="low"
                    className="text-primary focus:ring-primary"
                  />
                  <Label htmlFor="low" className="text-sm cursor-pointer">
                    Nice to have
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="medium"
                    name="importance"
                    value="medium"
                    className="text-primary focus:ring-primary"
                  />
                  <Label htmlFor="medium" className="text-sm cursor-pointer">
                    Important
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="high"
                    name="importance"
                    value="high"
                    className="text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <Label htmlFor="high" className="text-sm cursor-pointer">
                    Critical
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="We'll notify you about updates to this feature request"
                />
                <p className="text-xs text-muted-foreground">
                  We'll only use this email to follow up about this specific
                  feature request.
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Submit Feature Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestFeature;
