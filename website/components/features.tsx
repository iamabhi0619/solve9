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
  IconArrowBackUp,
  IconDeviceFloppy,
  IconChartBar,
} from "@tabler/icons-react";
import { Card } from "./ui/card";
import { useScroll } from "@/lib/scroll-context";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: IconBrain,
    title: "Smart Puzzle Generation",
    description: "Advanced backtracking algorithm creates unique puzzles with guaranteed single solutions.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    badge: "Core",
  },
  {
    icon: IconTarget,
    title: "4 Difficulty Levels",
    description: "From Easy (40 clues) to Expert (24 clues), challenge yourself at your skill level.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    badge: null,
  },
  {
    icon: IconBulb,
    title: "Intelligent Hints",
    description: "Get contextual help when stuck. Hints reveal correct values without ruining the fun.",
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    badge: null,
  },
  {
    icon: IconSparkles,
    title: "Auto-Complete",
    description: "Smart detection fills obvious cells automatically when only one option remains.",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    badge: "AI",
  },
  {
    icon: IconPuzzle,
    title: "Notes Mode",
    description: "Add pencil marks with a 3×3 mini grid to track candidate numbers for each cell.",
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400",
    badge: null,
  },
  {
    icon: IconTrendingUp,
    title: "Mistake Tracking",
    description: "Real-time error detection with visual feedback. Learn from your mistakes (max 3).",
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-400",
    badge: null,
  },
  {
    icon: IconClock,
    title: "Game Statistics",
    description: "Track your time, moves, mistakes, and complete game history of last 50 games.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    badge: null,
  },
  {
    icon: IconMoon,
    title: "Beautiful Dark Mode",
    description: "Eye-friendly dark theme with smooth animations and custom color palettes.",
    color: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-400",
    badge: null,
  },
  {
    icon: IconDeviceMobile,
    title: "Mobile-First Design",
    description: "Touch-optimized interface with responsive layouts and intuitive controls.",
    color: "from-pink-500/20 to-fuchsia-500/20",
    iconColor: "text-pink-400",
    badge: null,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className="animate-card-reveal"
      style={{ animationDelay: visible ? `${index * 0.07}s` : "0s", animationPlayState: visible ? "running" : "paused" }}
    >
      <Card className="glass border border-white/10 p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor} group-hover:rotate-6 transition-transform duration-300`} />
            </div>
            {feature.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/20">
                {feature.badge}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {feature.description}
          </p>
        </div>
      </Card>
    </div>
  );
}

export function Features() {
  const { featuresRef } = useScroll();

  return (
    <section ref={featuresRef} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-4 text-sm">
            <IconSparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-muted-foreground">Everything you need</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Packed with <span className="gradient-text">Premium Features</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for the perfect Sudoku experience,
            completely free and without ads.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { value: "Unlimited", label: "Undo Actions", icon: IconArrowBackUp },
            { value: "10", label: "Saved Games", icon: IconDeviceFloppy },
            { value: "50", label: "Game History", icon: IconChartBar },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center p-6 glass rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 group">
              <Icon className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
