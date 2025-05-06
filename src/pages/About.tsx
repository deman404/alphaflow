
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Alphaflow</h1>
          
          <div className="mb-12 text-lg text-muted-foreground">
            <p className="mb-4">
              Alphaflow is revolutionizing the way businesses leverage AI by providing an intuitive, no-code platform for building sophisticated AI workflows and automation.
            </p>
            <p className="mb-4">
              Founded in 2023, our mission is to democratize access to AI technology, making it accessible and usable by everyone, regardless of their technical background.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We envision a world where AI technology is accessible to all, where anyone can create intelligent automation workflows that transform their business processes without writing a single line of code.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">Core Values</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Democratizing AI access</li>
                <li>Simplifying complex technologies</li>
                <li>Empowering users through intuitive design</li>
                <li>Driving innovation through automation</li>
                <li>Maintaining ethical AI principles</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Alphaflow was founded by a team of AI researchers, designers, and engineers passionate about making advanced technology accessible to everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team member cards would go here in a real implementation */}
              <div className="glass-card p-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center">Alex Chen</h3>
                <p className="text-center text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="glass-card p-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center">Maria Rodriguez</h3>
                <p className="text-center text-muted-foreground">CTO</p>
              </div>
              <div className="glass-card p-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center">James Wilson</h3>
                <p className="text-center text-muted-foreground">Head of Design</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us on Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to experience the future of AI automation? Join thousands of businesses already transforming their operations with Alphaflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;