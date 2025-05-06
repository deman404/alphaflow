
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container px-4 md:px-6">
        <div className="bg-gradient-to-r from-black/60 to-black/80 border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
             - Start building AI agents today -<span className="gradient-text">  no coding needed</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of companies using Alpha.flow to automate workflows, integrate AI into their operations, and build intelligent agents that work for them 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required. Free plan includes all core features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
