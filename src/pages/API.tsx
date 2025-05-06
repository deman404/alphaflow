
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const API = () => {
  // Sample API endpoints
  const endpoints = [
    { 
      name: "Workflows", 
      description: "Create and manage AI workflows",
      methods: ["GET", "POST", "PUT", "DELETE"],
      path: "/api/v1/workflows"
    },
    { 
      name: "Agents", 
      description: "Configure AI agents and their capabilities",
      methods: ["GET", "POST", "PUT", "DELETE"],
      path: "/api/v1/agents"
    },
    { 
      name: "Executions", 
      description: "Track and manage workflow executions",
      methods: ["GET", "POST"],
      path: "/api/v1/executions"
    },
    { 
      name: "Tools", 
      description: "Manage integrated tools and connections",
      methods: ["GET", "POST", "PUT", "DELETE"],
      path: "/api/v1/tools"
    },
    { 
      name: "Users", 
      description: "User management and permissions",
      methods: ["GET", "POST", "PUT", "DELETE"],
      path: "/api/v1/users"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">API Reference</h1>
              <p className="text-lg text-muted-foreground">
                Integrate Alphaflow's powerful AI automation capabilities into your applications.
              </p>
            </div>
            <Button size="lg">
              Get API Key
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <a href="#introduction" className="block py-2 px-3 rounded-md bg-primary/10 text-primary font-medium">Introduction</a>
                    <a href="#authentication" className="block py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">Authentication</a>
                    <a href="#rate-limiting" className="block py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">Rate Limiting</a>
                    <a href="#errors" className="block py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">Errors</a>
                    <a href="#versioning" className="block py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">Versioning</a>
                    <div className="pt-2 pb-1 px-3 text-sm font-semibold">Endpoints</div>
                    {endpoints.map((endpoint) => (
                      <a 
                        key={endpoint.name} 
                        href={`#${endpoint.name.toLowerCase()}`} 
                        className="block py-2 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {endpoint.name}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-8" id="introduction">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    The Alphaflow API enables you to programmatically create, manage, and execute AI workflows. You can integrate Alphaflow's powerful AI automation capabilities directly into your applications.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    All API access is over HTTPS, and accessed from <code className="bg-secondary/20 px-1 py-0.5 rounded">https://api.alphaflow.ai</code>. All data is sent and received as JSON.
                  </p>
                  <div className="bg-card/80 border border-white/10 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono">
                      <code>
{`// Example request using curl
curl -X POST \\
  https://api.alphaflow.ai/v1/workflows \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Customer Onboarding",
    "description": "Process new customer registrations",
    "agents": [
      { "type": "email-processor", "config": { ... } },
      { "type": "data-extractor", "config": { ... } }
    ]
  }'`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-8" id="authentication">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                  <p className="text-muted-foreground mb-4">
                    The Alphaflow API uses API keys to authenticate requests. You can view and manage your API keys in the dashboard.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Your API keys carry many privileges, so be sure to keep them secure. Don't share your API keys in publicly accessible areas such as GitHub, client-side code, or in your application's source code.
                  </p>
                  <div className="bg-card/80 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre className="text-sm font-mono">
                      <code>
{`// Authentication using the Authorization header
curl https://api.alphaflow.ai/v1/workflows \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      </code>
                    </pre>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Security Best Practices</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Keep API keys secure and don't expose them in client-side code</li>
                      <li>Use environment variables to store API keys in your applications</li>
                      <li>Implement proper access controls to restrict who can use your API keys</li>
                      <li>Rotate API keys periodically to limit the damage of potential exposure</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-8" id="rate-limiting">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Rate Limiting</h2>
                  <p className="text-muted-foreground mb-4">
                    The Alphaflow API implements rate limiting to protect against abuse and ensure a fair usage policy. Rate limits vary based on your subscription plan.
                  </p>
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-4">Plan</th>
                        <th className="text-left py-2 px-4">Rate Limit</th>
                        <th className="text-left py-2 px-4">Burst Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-4">Free</td>
                        <td className="py-2 px-4">60 requests/hour</td>
                        <td className="py-2 px-4">10 requests/minute</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-4">Pro</td>
                        <td className="py-2 px-4">1,000 requests/hour</td>
                        <td className="py-2 px-4">60 requests/minute</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-4">Enterprise</td>
                        <td className="py-2 px-4">10,000 requests/hour</td>
                        <td className="py-2 px-4">600 requests/minute</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-muted-foreground">
                    Rate limit headers are included in all API responses:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><code className="bg-secondary/20 px-1 py-0.5 rounded">X-RateLimit-Limit</code>: Maximum number of requests allowed in the current period</li>
                    <li><code className="bg-secondary/20 px-1 py-0.5 rounded">X-RateLimit-Remaining</code>: Number of requests remaining in the current period</li>
                    <li><code className="bg-secondary/20 px-1 py-0.5 rounded">X-RateLimit-Reset</code>: Time at which the current rate limit period resets (UTC epoch seconds)</li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Additional sections would follow similar pattern */}
              
              {/* Sample endpoint documentation */}
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 mb-8" id="workflows">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Workflows</h2>
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">/api/v1/workflows</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-8">
                    This endpoint allows you to create, read, update, and delete AI workflows. Workflows are the central building block of the Alphaflow platform, defining how AI agents collaborate to achieve tasks.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-green-500/20 text-green-500 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">GET</span>
                        <code className="font-mono">/api/v1/workflows</code>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Returns a list of all workflows associated with your account.
                      </p>
                      <div className="bg-card/80 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                        <pre className="text-sm font-mono">
                          <code>
{`// Example request
curl https://api.alphaflow.ai/v1/workflows \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                          </code>
                        </pre>
                      </div>
                      <div className="bg-card/80 border border-white/10 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                          <code>
{`// Example response
{
  "workflows": [
    {
      "id": "wf_123456789",
      "name": "Customer Onboarding",
      "description": "Process new customer registrations",
      "created_at": "2025-04-01T12:00:00Z",
      "updated_at": "2025-04-02T08:30:00Z",
      "status": "active",
      "agents_count": 3
    },
    // More workflows...
  ],
  "pagination": {
    "total": 12,
    "per_page": 10,
    "current_page": 1,
    "last_page": 2
  }
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                    
                    {/* Additional endpoint methods would follow similar pattern */}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button size="lg" variant="outline">
                  View Full API Documentation
                </Button>
              </div>
            </div>
          </div>
          
          <Card className="bg-primary/10 border border-primary/30 mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">Need Help with Integration?</h2>
                  <p className="text-muted-foreground mb-4">
                    Our team of API experts can help you integrate Alphaflow into your applications and workflows. Schedule a consultation to discuss your specific needs.
                  </p>
                  <Button size="lg">
                    Schedule Consultation
                  </Button>
                </div>
                <div className="mt-6 md:mt-0 md:w-1/3 md:flex md:justify-end md:items-center">
                  <div className="bg-primary/20 rounded-full p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/30"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">API SDKs</h3>
                <p className="text-muted-foreground mb-4">
                  Integrate with Alphaflow faster using our official client libraries for popular languages.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <span className="bg-white/5 px-3 py-1 rounded-md">JavaScript</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md">Python</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md">Java</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md">Go</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md">Ruby</span>
                </div>
                <Button variant="outline" size="sm">
                  View SDKs
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Webhooks</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to events and receive real-time notifications when workflows execute or agents complete tasks.
                </p>
                <Button variant="outline" size="sm">
                  Configure Webhooks
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">API Status</h3>
                <p className="text-muted-foreground mb-4">
                  Check the current operational status of the Alphaflow API and view incident history.
                </p>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-500 font-medium">All Systems Operational</span>
                </div>
                <Button variant="outline" size="sm">
                  Status Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default API;
