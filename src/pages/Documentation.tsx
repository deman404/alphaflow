
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
          
          <div className="mb-12 text-lg text-muted-foreground">
            <p className="mb-4">
              Welcome to Alphaflow's comprehensive documentation. Here you'll find everything you need to build powerful AI workflows without writing code.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-6 border border-primary/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Platform Overview</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Creating Your First Workflow</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">AI Agent Configuration</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Connecting Tools and APIs</a>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-primary/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Core Concepts</h2>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Workflow Architecture</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Agent Types and Capabilities</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Data Flow and Transformations</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Security and Access Control</a>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-primary/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Integration Guides</h2>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Database Connections</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">API Integration</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Web Scraping</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Third-Party Services</a>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-primary/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Advanced Topics</h2>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Custom Agent Logic</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Workflow Optimization</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Error Handling Strategies</a>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">→</span>
                  <a href="#" className="text-muted-foreground hover:text-primary">Performance Monitoring</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="glass-card p-6 border border-primary/20 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="text-muted-foreground mb-4">
              Explore our comprehensive API documentation for advanced integrations and custom development.
            </p>
            <a href="/api" className="text-primary hover:underline">View API Documentation →</a>
          </div>
          
          <div className="glass-card p-6 border border-primary/20 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Our support team is ready to assist you with any questions or challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="text-primary hover:underline">Contact Support →</a>
              <a href="/community" className="text-primary hover:underline">Join Community Forum →</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
