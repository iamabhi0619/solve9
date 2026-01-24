"use client";

import {
  IconBrandGithub,
  IconCode,
  IconHeart,
  IconLicense,
  IconUsers,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useScroll } from "@/lib/scroll-context";

export function OpenSource() {
  const { opensourceRef } = useScroll();

  return (
    <section ref={opensourceRef} className="py-24 sm:py-32 relative bg-card/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
            <IconHeart className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Built with Love, Shared with the World</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            100% <span className="gradient-text">Open Source</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Free forever. No ads. No tracking. No premium features locked behind paywalls.
            Just pure Sudoku enjoyment for everyone.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="glass border border-white/10 p-6 text-center hover:border-accent/50 transition-all">
            <IconCode className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Open Code</h3>
            <p className="text-sm text-muted-foreground">
              Fully transparent source code on GitHub
            </p>
          </Card>
          <Card className="glass border border-white/10 p-6 text-center hover:border-accent/50 transition-all">
            <IconLicense className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">MIT License</h3>
            <p className="text-sm text-muted-foreground">
              Use, modify, and distribute freely
            </p>
          </Card>
          <Card className="glass border border-white/10 p-6 text-center hover:border-accent/50 transition-all">
            <IconUsers className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              Built by developers, for everyone
            </p>
          </Card>
          <Card className="glass border border-white/10 p-6 text-center hover:border-accent/50 transition-all">
            <IconHeart className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">No Ads</h3>
            <p className="text-sm text-muted-foreground">
              100% ad-free experience forever
            </p>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto glass rounded-2xl border border-white/10 p-8 sm:p-12 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Built With Modern Technology</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-accent">Frontend</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  React Native & Expo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  NativeWind (Tailwind CSS)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-accent">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Zustand State Management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Backtracking Algorithm
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AsyncStorage Persistence
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-linear-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 group"
          >
            <a href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer">
              <IconBrandGithub className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View on GitHub
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Star the repository • Report issues • Contribute code
          </p>
        </div>
      </div>
    </section>
  );
}
