
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, BookOpen, Award, Calendar, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Community = () => {
  const discussions = [
    {
      title: "Best practices for complex multi-agent workflows?",
      author: "Jason Kim",
      replies: 28,
      views: 342,
      lastActivity: "2 hours ago"
    },
    {
      title: "How to integrate custom APIs with Alphaflow?",
      author: "Sofia Rodriguez",
      replies: 12,
      views: 189,
      lastActivity: "5 hours ago"
    },
    {
      title: "Share your Alphaflow workflow template!",
      author: "Michael Chen",
      replies: 53,
      views: 876,
      lastActivity: "1 day ago"
    },
    {
      title: "Troubleshooting: AI agent memory persistence",
      author: "Emily Johnson",
      replies: 19,
      views: 234,
      lastActivity: "1 day ago"
    }
  ];
  
  const events = [
    {
      title: "Virtual Meetup: Building Your First AI Workflow",
      date: "May 15, 2025",
      time: "1:00 PM - 2:30 PM EDT",
      attendees: 156
    },
    {
      title: "Alphaflow Office Hours: Q&A with the Product Team",
      date: "May 22, 2025",
      time: "11:00 AM - 12:00 PM EDT",
      attendees: 89
    },
    {
      title: "Workshop: Advanced Agent Configuration",
      date: "June 5, 2025",
      time: "2:00 PM - 4:00 PM EDT",
      attendees: 112
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Community</h1>
          
          <div className="mb-12 text-lg text-muted-foreground">
            <p className="mb-4">
              Join the growing community of Alphaflow users. Share knowledge, get help, and connect with other automation enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discussion Forums</h3>
                <p className="text-muted-foreground mb-4">
                  Ask questions, share insights, and discuss strategies with the community.
                </p>
                <Button variant="outline" className="mt-auto w-full">Visit Forums</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Groups</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with local and virtual user groups focused on specific industries or use cases.
                </p>
                <Button variant="outline" className="mt-auto w-full">Find Groups</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
                <p className="text-muted-foreground mb-4">
                  Browse user-contributed tips, tutorials, and solutions.
                </p>
                <Button variant="outline" className="mt-auto w-full">Explore Resources</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Discussions</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-semibold hover:text-primary cursor-pointer">{discussion.title}</h3>
                          <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-3 md:mt-0 text-sm text-muted-foreground">
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.views} views</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">Load More Discussions</Button>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  All Events <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {events.map((event, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 bg-primary/10 rounded p-2 text-center">
                          <Calendar className="h-5 w-5 text-primary mx-auto" />
                          <div className="text-xs font-semibold mt-1">{event.date.split(',')[0].split(' ')[0]}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold hover:text-primary cursor-pointer">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.attendees} attending</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">View Calendar</Button>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Community Showcase</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Support Workflow</h3>
                      <p className="text-sm text-muted-foreground mb-3">by Marcus Johnson</p>
                      <p className="text-sm mb-4">
                        This AI workflow handles incoming customer inquiries, categorizes issues, provides immediate responses for common questions, and escalates complex issues to the right team members.
                      </p>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="text-xs font-medium text-amber-500">Staff Pick</span>
                        <Button variant="link" size="sm" className="ml-auto">View Template</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Content Research Assistant</h3>
                      <p className="text-sm text-muted-foreground mb-3">by Emma Torres</p>
                      <p className="text-sm mb-4">
                        This workflow conducts online research, summarizes findings, identifies key trends, and generates content outlines. Perfect for content marketers and researchers.
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-muted-foreground">479 downloads</span>
                        <Button variant="link" size="sm" className="ml-auto">View Template</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="bg-primary/10 border border-primary/30">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:flex-1 mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Join Our Slack Community</h2>
                  <p className="text-muted-foreground mb-4">
                    Connect with thousands of Alphaflow users and the team in real-time. Get quick help, share ideas, and stay updated on the latest developments.
                  </p>
                  <Button size="lg">
                    Join Slack Community
                  </Button>
                </div>
                <div className="md:flex-1 md:flex md:justify-end">
                  <div className="flex -space-x-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/20"></div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/20 flex items-center justify-center text-sm font-semibold">+2.3k</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;