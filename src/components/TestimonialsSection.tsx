
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Automatron.flow has completely transformed how we approach automation. It's like having a team of AI specialists working for us 24/7.",
    name: "Sarah Johnson",
    title: "CTO, TechVision Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    quote: "We've cut our data processing time by 80% since implementing Automatron.flow. The drag-and-drop interface makes it incredibly easy to create complex workflows.",
    name: "Michael Chen",
    title: "Data Science Lead, AnalyticsPlus",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    quote: "As a non-technical founder, I never thought I'd be able to build AI systems this sophisticated. Automatron.flow has made it possible for our small team to compete with much larger companies.",
    name: "Emma Rodriguez",
    title: "Founder, InnovateCo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    quote: "The multi-agent capabilities have revolutionized our customer support system. Our agents now collaborate to solve customer issues faster than we ever thought possible.",
    name: "David Patel",
    title: "Customer Success Manager, ServicePro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Automatron.flow is helping companies transform their operations with AI.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div className="flex items-center justify-center mb-8">
            <Card className="bg-black/30 border border-white/10 w-full shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-2xl italic text-center">
                    "{testimonials[activeIndex].quote}"
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-semibold">{testimonials[activeIndex].name}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={prevTestimonial}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="sr-only">Testimonial {index + 1}</span>
                </button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={nextTestimonial}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
