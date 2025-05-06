import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Filter, Bookmark, Play } from "lucide-react";

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with Alphaflow",
      description: "Learn the basics of creating your first AI workflow",
      duration: "15 min",
      category: "Beginner",
      image: "https://via.placeholder.com/400x225",
      featured: true,
    },
    {
      id: 2,
      title: "Creating Multi-Agent Systems",
      description: "Design workflows where multiple AI agents collaborate",
      duration: "25 min",
      category: "Intermediate",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 3,
      title: "Data Sources & Connections",
      description: "Connect your workflows to external data sources",
      duration: "20 min",
      category: "Beginner",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 4,
      title: "Advanced Workflow Logic",
      description: "Learn conditional logic, loops, and dynamic branching",
      duration: "35 min",
      category: "Advanced",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 5,
      title: "Custom API Integration",
      description: "Connect your workflows to any external API",
      duration: "30 min",
      category: "Intermediate",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 6,
      title: "Error Handling Strategies",
      description: "Build robust workflows with error recovery",
      duration: "25 min",
      category: "Intermediate",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 7,
      title: "Workflow Testing & Debugging",
      description: "Techniques to ensure your workflows work correctly",
      duration: "30 min",
      category: "Intermediate",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 8,
      title: "Agent Memory & Context",
      description: "Learn how to manage state and memory in agents",
      duration: "40 min",
      category: "Advanced",
      image: "https://via.placeholder.com/400x225",
    },
    {
      id: 9,
      title: "Data Transformation Techniques",
      description: "Process and transform data within your workflows",
      duration: "25 min",
      category: "Intermediate",
      image: "https://via.placeholder.com/400x225",
    },
  ];

  const categories = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tutorials</h1>

          <div className="mb-8 text-lg text-muted-foreground">
            <p>
              Learn how to make the most of Alphaflow with our step-by-step
              tutorials. From basic concepts to advanced techniques, we've got
              you covered.
            </p>
          </div>

          {/* Featured Tutorial */}
          <div className="mb-12">
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <div className="col-span-2 relative">
                  <div className="aspect-video md:h-full">
                    <img
                      src="https://via.placeholder.com/800x450"
                      alt="Featured tutorial"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/90 rounded-full p-4 cursor-pointer hover:bg-primary transition-colors">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 p-6 md:p-8 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 45 min course
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Building a Complete Customer Service AI System
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Learn how to create a comprehensive customer service system
                    with multiple AI agents handling inquiries, routing,
                    knowledge base lookup, and escalation. This in-depth
                    tutorial covers the entire process from design to
                    deployment.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-white/5 text-xs px-3 py-1 rounded-full">
                      Customer Service
                    </span>
                    <span className="bg-white/5 text-xs px-3 py-1 rounded-full">
                      Multi-agent
                    </span>
                    <span className="bg-white/5 text-xs px-3 py-1 rounded-full">
                      Knowledge Base
                    </span>
                    <span className="bg-white/5 text-xs px-3 py-1 rounded-full">
                      Advanced
                    </span>
                  </div>
                  <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1">Start Tutorial</Button>
                    <Button variant="outline" className="flex-1">
                      <Bookmark className="h-4 w-4 mr-2" /> Save for Later
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex overflow-x-auto py-2 gap-2 scrollbar-hide mb-4 md:mb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="ghost" size="sm" className="ml-2">
                Most Recent
              </Button>
            </div>
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="bg-card/50 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="relative">
                  <div className="aspect-video">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/50 rounded-full px-2 py-1 flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    <span className="text-xs">{tutorial.duration}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tutorial.category === "Beginner"
                          ? "bg-green-500/20 text-green-500"
                          : tutorial.category === "Intermediate"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-purple-500/20 text-purple-500"
                      }`}
                    >
                      {tutorial.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tutorial.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              Load More Tutorials
            </Button>
          </div>

          {/* Learning Paths */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Recommended Learning Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2">
                    Automation Fundamentals
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The perfect starting point for beginners. Learn all the core
                    concepts.
                  </p>
                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="ml-2 text-sm">
                        Platform Introduction
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="ml-2 text-sm">
                        Creating Your First Workflow
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="ml-2 text-sm">
                        Basic Agent Configuration
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        4
                      </div>
                      <span className="ml-2 text-sm">
                        Testing and Deployment
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>4 tutorials</span>
                    <span className="mx-2">•</span>
                    <span>90 min total</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2">
                    Data Processing Specialist
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Master data transformation and processing in AI workflows.
                  </p>
                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="ml-2 text-sm">
                        Data Sources and Connectors
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="ml-2 text-sm">
                        Data Transformation Techniques
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="ml-2 text-sm">
                        Advanced Filtering and Routing
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">
                        4
                      </div>
                      <span className="ml-2 text-sm">
                        Building a Database Sync System
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>5 tutorials</span>
                    <span className="mx-2">•</span>
                    <span>120 min total</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2">
                    Enterprise Automation Architect
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced techniques for complex enterprise automation.
                  </p>
                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="ml-2 text-sm">
                        Multi-Agent Orchestration
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="ml-2 text-sm">
                        Enterprise Integration Patterns
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="ml-2 text-sm">
                        Security and Access Control
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs">
                        4
                      </div>
                      <span className="ml-2 text-sm">
                        Building Enterprise-Grade Workflows
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>6 tutorials</span>
                    <span className="mx-2">•</span>
                    <span>180 min total</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
