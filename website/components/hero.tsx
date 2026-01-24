"use client";

import { IconBrandGithub, IconDownload, IconCheck, IconSparkles, IconBolt, IconHeart } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useScroll } from "@/lib/scroll-context";
import Link from "next/link";

export function Hero() {
  const { homeRef, downloadRef, scrollToSection } = useScroll();

  return (
    <section ref={homeRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Heading */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                The Ultimate{" "}
                <span className="gradient-text">Sudoku</span>
                <br />
                Experience
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Intelligent puzzle generation, beautiful UI, powerful tools, and zero ads.
                The most advanced Sudoku app you&apos;ll ever need.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                  <IconCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-muted-foreground">Hints</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                  <IconCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-muted-foreground">Dark Mode</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                  <IconCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-muted-foreground">Unlimited Puzzles</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                  <IconCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-muted-foreground">Statistics Tracking</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button
                size="lg"
                onClick={() => scrollToSection(downloadRef)}

              >
                <IconDownload className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                Download Now
              </Button>

              <Link href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                >
                  <IconBrandGithub className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View on GitHub
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <IconBolt className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Fast & Lightweight</span>
              </div>
              <div className="flex items-center gap-2">
                <IconHeart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Community Driven</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">4</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Difficulty Levels</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">37+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Features</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">100%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Ad-Free</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">∞</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Unique Puzzles</div>
                </CardContent>
              </Card>
            </div>

            {/* App Preview */}
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden group hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  </div>

                  {/* Content */}
                  <div className="relative text-center space-y-4 p-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                      S9
                    </div>
                    <div>
                      <div className="text-foreground font-semibold text-sm sm:text-base mb-1">Solve9 App</div>
                      <div className="text-muted-foreground text-xs sm:text-sm">Premium Sudoku Experience</div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                      Available on Android
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:flex">
        <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section >
  );
}
