"use client";

import { IconChartBar, IconClock, IconDeviceMobile, IconTrophy, IconFlame, IconMedal } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/lib/scroll-context";

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
  color?: string;
  progress?: number;
}

function StatItem({ icon: Icon, value, label, suffix = "", delay = 0, color = "from-primary/20 to-accent/20", progress = 80 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const target = parseInt(value.replace(/\D/g, "")) || 0;
    const duration = 1800;
    const steps = 60;
    const step = target / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          setBarWidth(progress);
          clearInterval(iv);
        } else {
          setCount(Math.floor(current));
          setBarWidth((current / target) * progress);
        }
      }, duration / steps);
      return () => clearInterval(iv);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay, progress]);

  return (
    <div
      ref={ref}
      className="glass rounded-2xl border border-white/10 p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
    >
      <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mb-4">{label}</div>
      {/* Animated progress bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

const progressStats = [
  { label: "Puzzle Completion Rate", value: 87, color: "text-primary" },
  { label: "Average Accuracy", value: 94, color: "text-green-400" },
  { label: "Expert Level Solves", value: 31, color: "text-amber-400" },
  { label: "Fastest Solve (Easy)", value: 72, color: "text-violet-400" },
];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
          <StatItem icon={IconTrophy} value="50" label="Games Tracked" delay={0} progress={100} color="from-amber-500/20 to-yellow-500/20" />
          <StatItem icon={IconClock} value="10" label="Saved Games" delay={100} progress={100} color="from-blue-500/20 to-cyan-500/20" />
          <StatItem icon={IconChartBar} value="4" label="Difficulty Levels" delay={200} progress={100} color="from-violet-500/20 to-purple-500/20" />
          <StatItem icon={IconDeviceMobile} value="37" suffix="+" label="Features" delay={300} progress={100} color="from-green-500/20 to-emerald-500/20" />
        </div>

        {/* Progress Stats Bar */}
        <div className="max-w-4xl mx-auto glass rounded-2xl border border-white/10 p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <IconFlame className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold">Sample Player Stats</h3>
            <span className="text-xs text-muted-foreground ml-auto">Based on 50 games</span>
          </div>
          <div className="space-y-4">
            {progressStats.map(({ label, value, color }) => (
              <div key={label} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                  <span className={`text-sm font-semibold ${color}`}>{value}%</span>
                </div>
                <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-primary to-accent animate-progress-fill`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            {
              icon: IconClock,
              title: "Game Timer",
              desc: "Tracks elapsed time in HH:MM:SS format. Pauses when you pause the game. Stops automatically on completion.",
            },
            {
              icon: IconChartBar,
              title: "Move Counter",
              desc: "Every cell placement is tracked. Review your efficiency and compare strategies across different games.",
            },
            {
              icon: IconMedal,
              title: "Complete History",
              desc: "Last 50 completed games stored with full stats: time, moves, mistakes, difficulty, and win/loss status.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl border border-white/10 p-6 hover:border-accent/30 transition-all duration-300 group">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
