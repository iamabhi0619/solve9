"use client";

import { IconChartBar, IconClock, IconDeviceMobile, IconTrophy } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/lib/scroll-context";

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ icon: Icon, value, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const target = parseInt(value.replace(/\D/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={ref}
      className="glass rounded-2xl border border-white/10 p-8 text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Statistics() {
  const { statsRef } = useScroll();

  return (
    <section ref={statsRef} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Track Your <span className="gradient-text">Progress</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive game statistics to monitor your improvement and celebrate achievements.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <StatItem icon={IconTrophy} value="50" label="Games Tracked" delay={0} />
          <StatItem icon={IconClock} value="10" label="Saved Games" delay={100} />
          <StatItem icon={IconChartBar} value="4" label="Difficulty Levels" delay={200} />
          <StatItem icon={IconDeviceMobile} value="37" suffix="+" label="Features" delay={300} />
        </div>

        {/* Feature Highlights */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <IconClock className="w-5 h-5 text-accent" />
              Game Timer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tracks elapsed time in HH:MM:SS format. Pauses when you pause the game. 
              Stops automatically on completion.
            </p>
          </div>
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <IconChartBar className="w-5 h-5 text-accent" />
              Move Counter
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every cell placement is tracked. Review your efficiency and compare 
              strategies across different games.
            </p>
          </div>
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <IconTrophy className="w-5 h-5 text-accent" />
              Complete History
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Last 50 completed games stored with full stats: time, moves, mistakes, 
              difficulty, and win/loss status.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
