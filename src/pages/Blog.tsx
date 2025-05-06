
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Introducing Alphaflow: AI Automation for Everyone",
      excerpt: "Today, we're excited to unveil Alphaflow, our no-code platform for building AI-powered workflows that work for you 24/7.",
      date: "May 4, 2025",
      author: "Alex Chen, Founder & CEO",
      category: "Announcements",
      image: "https://via.placeholder.com/800x450",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "5 Ways AI Agents Are Transforming Customer Support",
      excerpt: "Discover how businesses are using Alphaflow to create intelligent support workflows that handle customer inquiries around the clock.",
      date: "April 28, 2025",
      author: "Maria Rodriguez, Head of Product",
      category: "Use Cases",
      image: "https://via.placeholder.com/800x450",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Future of Work: AI Assistants as Teammates",
      excerpt: "How AI agents are evolving from simple tools to collaborative partners in the workplace.",
      date: "April 21, 2025",
      author: "James Wilson, AI Research Lead",
      category: "Insights",
      image: "https://via.placeholder.com/800x450",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Building Reliable AI Systems: Best Practices",
      excerpt: "Learn how to design workflows that deliver consistent results even with the inherent unpredictability of AI technologies.",
      date: "April 14, 2025",
      author: "Sarah Johnson, Engineering Director",
      category: "Technical",
      image: "https://via.placeholder.com/800x450",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Case Study: How Acme Corp Automated 80% of Data Processing with Alphaflow",
      excerpt: "A deep dive into how a Fortune 500 company transformed their operations using our no-code AI workflow platform.",
      date: "April 7, 2025",
      author: "David Park, Customer Success Lead",
      category: "Case Studies",
      image: "https://via.placeholder.com/800x450",
      readTime: "12 min read"
    },
    {
      id: 6,
      title: "New Feature Spotlight: Multi-Agent Orchestration",
      excerpt: "Our latest platform update allows you to coordinate multiple specialized AI agents in a single workflow.",
      date: "March 31, 2025",
      author: "Michelle Wong, Product Manager",
      category: "Product Updates",
      image: "https://via.placeholder.com/800x450",
      readTime: "4 min read"
    },
  ];
  
  const categories = ["All", "Announcements", "Use Cases", "Insights", "Technical", "Case Studies", "Product Updates"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Blog</h1>
              <p className="text-lg text-muted-foreground">
                Insights, tutorials, and news from the Alphaflow team
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="py-2 pl-4 pr-10 rounded-full border border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                />
                <svg className="w-5 h-5 absolute right-3 top-2.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto py-2 mb-8 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Featured post */}
          <div className="mb-16 glass-card overflow-hidden rounded-xl">
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img 
                src="https://via.placeholder.com/1200x600" 
                alt="Featured blog post" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
                <span className="bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block">Featured</span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">The Future of AI Automation: Trends and Predictions for 2026</h2>
                <p className="text-white/80 mb-3 max-w-2xl">Our in-depth analysis of where AI automation is headed and how businesses can prepare for the next wave of innovation.</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white text-sm">Elena Martinez, Chief AI Strategist</p>
                    <p className="text-white/60 text-xs">May 6, 2025 · 15 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5">{post.category}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="border-t border-white/10 pt-4">
                  <div className="flex items-center w-full">
                    <div className="w-6 h-6 bg-primary/20 rounded-full mr-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{post.author.split(',')[0]}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Read more
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
