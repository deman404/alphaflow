import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Roadmap = () => {
  const quarters = [
    {
      id: "current",
      label: "Current Quarter",
      date: "Q2 2025",
      features: [
        {
          title: "Multi-Agent Orchestration",
          description:
            "Create workflows with multiple specialized AI agents working together.",
          status: "in-progress",
          percentage: 75,
        },
        {
          title: "Advanced Conditional Logic",
          description:
            "Build complex workflows with conditions, loops, and branching.",
          status: "in-progress",
          percentage: 60,
        },
        {
          title: "Expanded Integration Library",
          description: "New integrations with popular tools and services.",
          status: "in-progress",
          percentage: 80,
        },
        {
          title: "Workflow Analytics Dashboard",
          description: "Monitor and analyze workflow performance and outcomes.",
          status: "planned",
          percentage: 30,
        },
      ],
    },
    {
      id: "next",
      label: "Next Quarter",
      date: "Q3 2025",
      features: [
        {
          title: "Agent Memory & Context",
          description:
            "Persistent memory for AI agents across workflow executions.",
          status: "planned",
          percentage: 15,
        },
        {
          title: "Public Workflow Marketplace",
          description:
            "Discover, share, and use workflow templates created by the community.",
          status: "planned",
          percentage: 10,
        },
        {
          title: "Webhook Triggers",
          description:
            "Start workflows automatically from external event webhooks.",
          status: "planned",
          percentage: 25,
        },
        {
          title: "Mobile Workflow Management",
          description: "Native mobile apps for iOS and Android.",
          status: "planned",
          percentage: 5,
        },
      ],
    },
    {
      id: "future",
      label: "Future",
      date: "Q4 2025 & Beyond",
      features: [
        {
          title: "Visual Workflow Builder 2.0",
          description:
            "Completely redesigned interface for building complex workflows.",
          status: "planned",
          percentage: 0,
        },
        {
          title: "Enterprise SSO Integration",
          description:
            "Support for SAML, Okta, and other enterprise identity providers.",
          status: "planned",
          percentage: 0,
        },
        {
          title: "AI Agent Customization",
          description:
            "Build and train custom AI agents for specific use cases.",
          status: "planned",
          percentage: 0,
        },
        {
          title: "On-Premise Deployment Option",
          description: "Deploy Alphaflow within your own infrastructure.",
          status: "planned",
          percentage: 0,
        },
      ],
    },
  ];

  const recentUpdates = [
    {
      date: "May 1, 2025",
      title: "Visual Workflow Builder Beta Released",
      description:
        "The new visual designer makes creating AI workflows faster and more intuitive.",
    },
    {
      date: "April 15, 2025",
      title: "Database Integration Expanded",
      description: "Added support for MongoDB, Redis, and PostgreSQL.",
    },
    {
      date: "April 2, 2025",
      title: "Workflow Templates Library",
      description: "New pre-built templates for common automation scenarios.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Product Roadmap
              </h1>
              <p className="text-lg text-muted-foreground">
                See what we're working on and what's coming next for Alphaflow.
              </p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <a href="#request-feature">Request Feature</a>
            </Button>
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-primary mb-1">12</h3>
                  <p className="text-muted-foreground text-sm">In Progress</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-blue-400 mb-1">24</h3>
                  <p className="text-muted-foreground text-sm">Planned</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-green-400 mb-1">18</h3>
                  <p className="text-muted-foreground text-sm">Completed</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-purple-400 mb-1">
                    97
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Community Ideas
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-12 relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform -translate-x-1/2 md:translate-x-0"></div>

              {quarters.map((quarter, index) => (
                <div key={quarter.id} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    {/* Quarter label */}
                    <div
                      className={`mb-6 md:mb-0 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      } relative md:col-start-${index % 2 === 0 ? "1" : "2"}`}
                    >
                      <div className="absolute left-0 md:left-auto md:right-0 -top-1 h-5 w-5 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 md:translate-x-0 md:translate-x-1/2"></div>
                      <h2 className="text-2xl font-bold mb-1 pl-8 md:pl-0 md:pr-8">
                        {quarter.label}
                      </h2>
                      <p className="text-muted-foreground pl-8 md:pl-0 md:pr-8">
                        {quarter.date}
                      </p>
                    </div>

                    {/* Features */}
                    <div
                      className={`relative md:col-start-${
                        index % 2 === 0 ? "2" : "1"
                      } pl-8 md:pl-0 md:pr-0`}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            {quarter.features.map((feature, featureIndex) => (
                              <div key={featureIndex}>
                                {featureIndex > 0 && (
                                  <Separator className="my-4" />
                                )}
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold">
                                    {feature.title}
                                  </h3>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      feature.status === "in-progress"
                                        ? "bg-primary/20 text-primary"
                                        : "bg-blue-500/20 text-blue-500"
                                    }`}
                                  >
                                    {feature.status === "in-progress"
                                      ? "In Progress"
                                      : "Planned"}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {feature.description}
                                </p>
                                {feature.percentage > 0 && (
                                  <div className="w-full bg-white/5 rounded-full h-2.5 mb-1">
                                    <div
                                      className="h-2.5 rounded-full bg-primary"
                                      style={{
                                        width: `${feature.percentage}%`,
                                      }}
                                    ></div>
                                  </div>
                                )}
                                {feature.percentage > 0 && (
                                  <div className="text-right text-xs text-muted-foreground">
                                    {feature.percentage}% complete
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="mb-16 bg-card/50 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Recent Updates</h2>
              <div className="space-y-6">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        {update.date}
                      </span>
                      <h3 className="font-semibold mb-1">{update.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {update.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div
            id="request-feature"
            className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-lg p-6 md:p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-3">Have a Feature Request?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              We love hearing from our users. If you have an idea for a feature
              that would make Alphaflow better for your use case, let us know!
            </p>
            <Button size="lg" asChild>
              <a href="/request-feature">Submit Feature Request</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
