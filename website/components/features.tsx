"use client";

import {
  IconBrain,
  IconBulb,
  IconClock,
  IconDeviceMobile,
  IconMoon,
  IconPuzzle,
  IconSparkles,
  IconTarget,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Card } from "./ui/card";
import { useScroll } from "@/lib/scroll-context";

const features = [
  {
    icon: IconBrain,
    title: "Smart Puzzle Generation",
    description: "Advanced backtracking algorithm creates unique puzzles with guaranteed single solutions.",
  },
  {
    icon: IconTarget,
    title: "4 Difficulty Levels",
    description: "From Easy (40 clues) to Expert (24 clues), challenge yourself at your skill level.",
  },
  {
    icon: IconBulb,
    title: "Intelligent Hints",
    description: "Get contextual help when stuck. Hints reveal correct values without ruining the fun.",
  },
  {
    icon: IconSparkles,
    title: "Auto-Complete",
    description: "Smart detection fills obvious cells automatically when only one option remains.",
  },
  {
    icon: IconPuzzle,
    title: "Notes Mode",
    description: "Add pencil marks with a 3×3 mini grid to track candidate numbers for each cell.",
  },
  {
    icon: IconTrendingUp,
    title: "Mistake Tracking",
    description: "Real-time error detection with visual feedback. Learn from your mistakes (max 3).",
  },
  {
    icon: IconClock,
    title: "Game Statistics",
    description: "Track your time, moves, mistakes, and complete game history of last 50 games.",
  },
  {
    icon: IconMoon,
    title: "Beautiful Dark Mode",
    description: "Eye-friendly dark theme with smooth animations and custom color palettes.",
  },
  {
    icon: IconDeviceMobile,
    title: "Mobile-First Design",
    description: "Touch-optimized interface with responsive layouts and intuitive controls.",
  },
];

export function Features() {
  const { featuresRef } = useScroll();

  return (
    <section ref={featuresRef} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Packed with <span className="gradient-text">Premium Features</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for the perfect Sudoku experience, 
            completely free and without ads.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass border border-white/10 p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 glass rounded-2xl border border-white/10">
            <div className="text-3xl font-bold gradient-text mb-2">Unlimited</div>
            <div className="text-sm text-muted-foreground">Undo Actions</div>
          </div>
          <div className="text-center p-6 glass rounded-2xl border border-white/10">
            <div className="text-3xl font-bold gradient-text mb-2">10</div>
            <div className="text-sm text-muted-foreground">Saved Games</div>
          </div>
          <div className="text-center p-6 glass rounded-2xl border border-white/10">
            <div className="text-3xl font-bold gradient-text mb-2">50</div>
            <div className="text-sm text-muted-foreground">Game History</div>
          </div>
        </div>
      </div>
    </section>
  );
}
