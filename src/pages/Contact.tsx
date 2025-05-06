
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    // In a real app, this would send the form data to a backend
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          
          <div className="mb-12 text-lg text-muted-foreground">
            <p className="mb-4">
              Have questions about Alphaflow? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:info@alphaflow.ai" className="hover:text-primary">
                    info@alphaflow.ai
                  </a>
                </p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+1234567890" className="hover:text-primary">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/20 p-3 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground">Available 9am-5pm ET</p>
                <Button variant="link" className="mt-2">
                  Start Chat
                </Button>
              </div>
            </Card>
          </div>
          
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-white/10 mb-12">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={6} 
                  placeholder="How can we help you?"
                  required 
                />
              </div>
              
              <Button type="submit">Send Message</Button>
            </form>
          </Card>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Office Location</h2>
            <p className="text-muted-foreground mb-6">
              123 Innovation Drive<br />
              San Francisco, CA 94107<br />
              United States
            </p>
            {/* In a real app, this would be a map component */}
            <div className="w-full h-64 bg-secondary/20 rounded-lg border border-white/10 flex items-center justify-center">
              <p className="text-muted-foreground">Google Maps would be embedded here</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
