
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

type PricingInterval = 'monthly' | 'yearly';

const PricingSection = () => {
  const [interval, setInterval] = useState<PricingInterval>('monthly');

  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for getting started with basic automation.",
      price: {
        monthly: "$0",
        yearly: "$0",
      },
      features: [
        "5 active workflows",
        "Standard AI agents",
        "Basic integrations",
        "1,000 actions/month",
        "Community support",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      description: "Enhanced capabilities for teams and businesses.",
      price: {
        monthly: "$49",
        yearly: "$39",
      },
      priceDetail: interval === 'yearly' ? 'per month, billed annually' : 'per month',
      features: [
        "Unlimited workflows",
        "Advanced AI agents",
        "All integrations",
        "50,000 actions/month",
        "Priority support",
        "Workflow templates",
        "Team collaboration",
      ],
      cta: "Start 14-day Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations.",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      features: [
        "Unlimited everything",
        "Custom AI agent development",
        "Dedicated infrastructure",
        "SLAs and 24/7 support",
        "Security & compliance",
        "White-labeling options",
        "Onboarding & training",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that's right for you and start building powerful AI workflows today.
          </p>
          
          <div className="flex justify-center items-center space-x-2 mb-8">
            <span className={`text-sm ${interval === 'monthly' ? 'text-white' : 'text-muted-foreground'}`}>Monthly</span>
            <button 
              className="relative w-14 h-7 bg-secondary rounded-full p-1 focus:outline-none"
              onClick={() => setInterval(interval === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div className="absolute top-[-0.5rem] left-0 text-[0.6rem] text-primary/70">
                {interval === 'yearly' && "20% off"}
              </div>
              <div 
                className={`w-5 h-5 rounded-full bg-primary transition-transform ${
                  interval === 'yearly' ? 'translate-x-7' : ''
                }`} 
              />
            </button>
            <span className={`text-sm ${interval === 'yearly' ? 'text-white' : 'text-muted-foreground'}`}>Yearly</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`
                border 
                ${plan.highlight 
                  ? 'border-primary shadow-lg shadow-primary/20 relative overflow-hidden' 
                  : 'border-white/10 hover:border-white/20'} 
                flex flex-col h-full
              `}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 text-xs bg-primary text-primary-foreground text-center py-1">
                  Most Popular
                </div>
              )}
              <CardHeader className={`${plan.highlight ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price[interval]}
                  </span>
                  {plan.priceDetail && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      {plan.priceDetail}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.highlight ? '' : 'bg-secondary hover:bg-secondary/80'}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include automatic updates and core platform features.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              Compare Plans
            </a>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              FAQs
            </a>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
