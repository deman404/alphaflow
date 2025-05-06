
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "San Francisco or Remote",
      type: "Full-time"
    },
    {
      title: "AI/ML Research Scientist",
      department: "AI Research",
      location: "San Francisco",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "San Francisco or Remote",
      type: "Full-time"
    },
    {
      title: "Technical Content Writer",
      department: "Marketing",
      location: "Remote",
      type: "Contract"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York or Remote",
      type: "Full-time"
    }
  ];

  const departments = ["All Departments", "Engineering", "AI Research", "Design", "Product", "Marketing", "Customer Success", "Sales"];
  const locations = ["All Locations", "San Francisco", "New York", "Remote"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers at Alphaflow</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-lg text-muted-foreground">
                <p className="mb-6">
                  Join us in transforming how businesses build and deploy AI automation. We're a team of innovators, engineers, and designers passionate about making powerful AI technology accessible to everyone.
                </p>
                <Button size="lg" className="mb-4">
                  View Open Positions
                </Button>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Why Join Alphaflow?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Work on cutting-edge AI technology</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Flexible work arrangements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Competitive compensation and equity</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Comprehensive health benefits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Professional development budget</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Diverse and inclusive culture</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                  <p className="text-muted-foreground">
                    We push boundaries and embrace creative solutions to complex problems. Innovation is at the heart of everything we do.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">User Obsession</h3>
                  <p className="text-muted-foreground">
                    We're deeply committed to understanding and solving our users' problems. Their success is our success.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality & Excellence</h3>
                  <p className="text-muted-foreground">
                    We hold ourselves to the highest standards in everything we create. We believe in doing things right, not just doing them fast.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Adaptability</h3>
                  <p className="text-muted-foreground">
                    We embrace change and see challenges as opportunities. In a rapidly evolving industry, adaptability is our superpower.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Integrity & Ethics</h3>
                  <p className="text-muted-foreground">
                    We're committed to responsible AI development and maintaining the highest ethical standards in all our work.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ownership</h3>
                  <p className="text-muted-foreground">
                    We empower every team member to take ownership of their work, make decisions, and drive positive change.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold">Open Positions</h2>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                <select className="h-10 px-4 py-2 rounded-md border border-input bg-background text-sm">
                  {departments.map((dept) => (
                    <option key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>{dept}</option>
                  ))}
                </select>
                <select className="h-10 px-4 py-2 rounded-md border border-input bg-background text-sm">
                  {locations.map((loc) => (
                    <option key={loc} value={loc.toLowerCase().replace(/\s+/g, '-')}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold hover:text-primary">{position.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-sm text-muted-foreground">{position.department}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{position.location}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{position.type}</span>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Don't see a role that fits your skills? We're always interested in talking to talented people.
              </p>
              <Button variant="outline">
                Submit Open Application
              </Button>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Life at Alphaflow</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* In a real implementation, these would be actual images */}
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 overflow-hidden"></div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/5 overflow-hidden"></div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/5 overflow-hidden"></div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-green-500/30 to-green-500/5 overflow-hidden"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Join Our Team?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              We're looking for passionate people to help us build the future of AI automation. Check out our open positions and apply today!
            </p>
            <Button size="lg">
              View All Positions
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;