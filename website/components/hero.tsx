"use client";

import {
  IconBrandGithub,
  IconDownload,
  IconCheck,
  IconBolt,
  IconHeart,
  IconRefresh,
  IconTrophy,
  IconStar,
  IconShieldCheck,
  IconCircleCheck,
  IconInfinity,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useScroll } from "@/lib/scroll-context";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const PUZZLE_CLUES: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const FILL_SEQUENCE: Array<[number, number, number]> = [
  [0, 2, 4], [0, 3, 6], [0, 5, 8], [0, 6, 9], [0, 7, 1], [0, 8, 2],
  [1, 1, 7], [1, 2, 2], [1, 6, 3], [1, 7, 4], [1, 8, 8],
  [2, 0, 1], [2, 3, 3], [2, 4, 4], [2, 5, 2], [2, 6, 5], [2, 8, 7],
  [3, 1, 5], [3, 2, 9], [3, 3, 7], [3, 5, 1], [3, 6, 4], [3, 7, 2],
  [4, 1, 2], [4, 2, 6], [4, 4, 5], [4, 6, 7], [4, 7, 9],
  [5, 1, 1], [5, 2, 3], [5, 3, 9], [5, 5, 4], [5, 6, 8], [5, 7, 5],
  [6, 0, 9], [6, 2, 1], [6, 3, 5], [6, 4, 3], [6, 5, 7], [6, 8, 4],
  [7, 0, 2], [7, 1, 8], [7, 2, 7], [7, 6, 6], [7, 7, 3],
  [8, 0, 3], [8, 1, 4], [8, 2, 5], [8, 3, 2], [8, 5, 6], [8, 6, 1],
];

function SudokuGrid() {
  const [grid, setGrid] = useState<(number | null)[][]>(PUZZLE_CLUES.map(r => [...r]));
  const [selected, setSelected] = useState<[number, number]>([0, 2]);
  const [fillIndex, setFillIndex] = useState(0);
  const [justFilled, setJustFilled] = useState<string>("");
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setGrid(PUZZLE_CLUES.map(r => [...r]));
    setFillIndex(0);
    setJustFilled("");
    setSelected([0, 2]);
    setDone(false);
  }, []);

  useEffect(() => {
    if (fillIndex >= FILL_SEQUENCE.length) {
      setDone(true);
      const t = setTimeout(reset, 3500);
      return () => clearTimeout(t);
    }
    const delay = fillIndex === 0 ? 1200 : 480;
    const t = setTimeout(() => {
      const [r, c, v] = FILL_SEQUENCE[fillIndex];
      setGrid(prev => { const n = prev.map(row => [...row]); n[r][c] = v; return n; });
      setSelected([r, c]);
      setJustFilled(`${r}-${c}`);
      setFillIndex(i => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [fillIndex, reset]);

  const isClue = (r: number, c: number) => PUZZLE_CLUES[r][c] !== null;
  const isSel = (r: number, c: number) => selected[0] === r && selected[1] === c;
  const isRelated = (r: number, c: number) => {
    const [sr, sc] = selected;
    return r === sr || c === sc ||
      (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3));
  };
  const isSameVal = (r: number, c: number) => {
    const sv = grid[selected[0]][selected[1]];
    return sv !== null && grid[r][c] === sv && !isSel(r, c);
  };

  const progress = Math.round((fillIndex / FILL_SEQUENCE.length) * 100);

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* App header */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/40">
            S9
          </div>
          <span className="text-sm font-semibold text-foreground/80">Solve9</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-amber-400/40 bg-amber-400/10 text-amber-400 text-xs py-0.5">
            <IconTrophy className="w-3 h-3 mr-1" />
            Medium
          </Badge>
          <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors" title="Restart">
            <IconRefresh className={`w-3.5 h-3.5 ${done ? "text-accent" : ""}`} />
          </button>
        </div>
      </div>

      {/* Sudoku Grid */}
      <div
        className={`grid grid-cols-9 rounded-xl overflow-hidden border-2 shadow-2xl transition-all duration-700 ${
          done ? "border-accent/50 shadow-accent/20" : "border-white/15 shadow-primary/20"
        }`}
      >
        {grid.map((row, r) =>
          row.map((val, c) => {
            const key = `${r}-${c}`;
            const rThick = c === 2 || c === 5;
            const bThick = r === 2 || r === 5;
            const sel = isSel(r, c);
            const rel = isRelated(r, c);
            const hvl = isSameVal(r, c);
            const clue = isClue(r, c);
            const fresh = justFilled === key;

            return (
              <button
                key={key}
                onClick={() => setSelected([r, c])}
                className={[
                  "relative flex items-center justify-center aspect-square text-[9px] sm:text-[11px] transition-colors duration-100 focus:outline-none",
                  rThick ? "border-r-2 border-r-white/20" : "border-r border-r-white/8",
                  bThick ? "border-b-2 border-b-white/20" : "border-b border-b-white/8",
                  sel
                    ? "bg-primary/90 text-white"
                    : hvl
                    ? "bg-violet-500/25 text-violet-300"
                    : rel
                    ? "bg-white/7 text-foreground/75"
                    : "bg-card/50 text-foreground/55",
                ].join(" ")}
              >
                {val !== null && (
                  <span
                    className={[
                      clue ? "font-bold" : "font-medium",
                      fresh ? "animate-number-pop text-accent font-bold" : "",
                    ].join(" ")}
                  >
                    {val}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
          <span className="flex items-center gap-1">
            <IconBolt className="w-3 h-3 text-primary" />
            Auto-solving...
          </span>
          <span className={`flex items-center gap-1 ${done ? "text-accent font-semibold" : ""}`}>
            {done ? <><IconCircleCheck className="w-3 h-3" />Solved!</> : `${progress}%`}
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-violet-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mt-2.5 px-0.5">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < 1 ? "bg-red-400" : "bg-white/15"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">1 mistake</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <IconShieldCheck className="w-3 h-3 text-green-400" />
          <span>Ad-free</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { homeRef, downloadRef, scrollToSection } = useScroll();

  return (
    <section ref={homeRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "0.6s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-sm animate-fade-in-up" style={{ animationDelay: "0s" }}>
              <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-muted-foreground">100% Free &amp; Open Source</span>
            </div>

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

            {/* Feature checkmarks */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 max-w-sm mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {["Smart Hints", "Dark Mode", "Unlimited Puzzles", "Stats Tracking", "Notes Mode", "Ad-Free Forever"].map(feat => (
                <div key={feat} className="flex items-center gap-2 text-sm">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary flex-shrink-0">
                    <IconCheck className="w-3 h-3" />
                  </div>
                  <span className="text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button
                size="lg"
                onClick={() => scrollToSection(downloadRef)}
                className="group relative overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
              >
                <IconDownload className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                Download Now
              </Button>
              <Link href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="group">
                  <IconBrandGithub className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View on GitHub
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-1.5">
                <IconBolt className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Fast &amp; Lightweight</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconHeart className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-muted-foreground">Community Driven</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-muted-foreground">No Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Content — Live Sudoku Demo */}
          <div className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Glow behind grid */}
            <div className="absolute inset-8 rounded-2xl bg-primary/10 blur-2xl pointer-events-none" />

            {/* App shell */}
            <div className="relative w-full max-w-sm glass rounded-3xl border border-white/10 p-5 shadow-2xl shadow-primary/10 hover:border-primary/20 transition-all duration-500">
              {/* Fake window chrome */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">solve9.apk</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-1 rounded bg-green-400/60" />
                  <div className="w-1.5 h-1.5 rounded border border-green-400/60" />
                </div>
              </div>

              <SudokuGrid />
            </div>

            {/* Floating stat chips */}
            <div className="absolute -top-4 -right-4 glass border border-white/15 rounded-2xl px-3 py-2 shadow-lg animate-float hidden lg:flex flex-col items-center">
              <IconInfinity className="w-5 h-5 gradient-text text-primary" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">Puzzles</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass border border-white/15 rounded-2xl px-3 py-2 shadow-lg animate-float hidden lg:flex flex-col items-center" style={{ animationDelay: "1.5s" }}>
              <span className="text-lg font-bold gradient-text">0</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">Ads Ever</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex">
        <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
