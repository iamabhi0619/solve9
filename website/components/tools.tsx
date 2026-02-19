"use client";

import {
  IconAlertCircle,
  IconArrowBackUp,
  IconArrowRight,
  IconBulb,
  IconEraser,
  IconPencil,
  IconPlayerPause,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { useScroll } from "@/lib/scroll-context";

const tools = [
  {
    id: "pencil",
    name: "Notes Mode",
    icon: IconPencil,
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400",
    description: "Add pencil marks to track candidate numbers",
    details: [
      "Toggle notes on/off for any cell",
      "3×3 mini grid for marking possibilities",
      "Notes auto-clear when number is placed",
      "Perfect for advanced solving techniques",
    ],
  },
  {
    id: "hint",
    name: "Smart Hints",
    icon: IconBulb,
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    description: "Get contextual help when you're stuck",
    details: [
      "Reveals correct value for one empty cell",
      "Auto-selects an appropriate cell",
      "Helps you learn solving patterns",
      "Use wisely to improve your skills",
    ],
  },
  {
    id: "autocomplete",
    name: "Auto-Complete",
    icon: IconSparkles,
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    description: "Intelligent cell completion",
    details: [
      "Detects when only one valid option remains",
      "Animated completion with 150ms delays",
      "Only available with zero mistakes",
      "Speeds up endgame solving",
    ],
  },
  {
    id: "undo",
    name: "Unlimited Undo",
    icon: IconArrowBackUp,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    description: "Reverse any move, anytime",
    details: [
      "Complete move history tracking",
      "Undo as many times as needed",
      "Visual indicator when history is empty",
      "Never lose progress to mistakes",
    ],
  },
  {
    id: "erase",
    name: "Erase Tool",
    icon: IconEraser,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    description: "Clear cell values and notes",
    details: [
      "Quickly remove incorrect entries",
      "Clears both numbers and notes",
      "Works on any non-clue cell",
      "Keyboard shortcut friendly",
    ],
  },
  {
    id: "mistakes",
    name: "Mistake Tracking",
    icon: IconAlertCircle,
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-400",
    description: "Real-time error detection",
    details: [
      "Visual red highlighting for errors",
      "Maximum 3 mistakes allowed",
      "Game over on 3rd mistake",
      "Learn from your errors",
    ],
  },
  {
    id: "pause",
    name: "Pause & Save",
    icon: IconPlayerPause,
    color: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-400",
    description: "Take breaks anytime",
    details: [
      "Pause overlay hides the board",
      "Timer stops during pause",
      "Auto-saves when exiting",
      "Resume exactly where you left off",
    ],
  },
];

function ToolVisual({ toolId }: { toolId: string }) {
  const miniGrid = [
    [5, 3, null, null, 7, null],
    [6, null, null, 1, 9, 5],
    [null, 9, 8, null, null, null],
    [8, null, null, null, 6, null],
    [4, null, null, 8, null, 3],
    [7, null, null, null, 2, null],
  ];

  if (toolId === "pencil") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-2 text-center">
          <div className="text-xs text-muted-foreground mb-3">Cell with pencil marks</div>
          <div className="w-20 h-20 mx-auto glass rounded-xl border-2 border-teal-400/50 grid grid-cols-3 gap-0.5 p-1.5 relative">
            {[1, 2, null, 4, null, 6, 7, null, 9].map((n, i) => (
              <div key={i} className={`flex items-center justify-center text-[9px] font-medium rounded-sm ${n ? "text-teal-300" : ""}`}>
                {n}
              </div>
            ))}
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-teal-400/20 border border-teal-400/50 flex items-center justify-center">
              <IconPencil className="w-2.5 h-2.5 text-teal-400" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3">Candidates: 1, 2, 4, 6, 7, 9</div>
        </div>
      </div>
    );
  }

  if (toolId === "hint") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground">Hint revealing answer</div>
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-full h-full glass rounded-xl border-2 border-amber-400/60 flex items-center justify-center relative overflow-hidden shadow-lg shadow-amber-400/20">
              <div className="absolute inset-0 bg-amber-400/10 animate-pulse rounded-xl" />
              <span className="text-3xl font-bold text-amber-400 relative z-10">7</span>
            </div>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center animate-bounce">
              <IconBulb className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Correct answer revealed!</div>
        </div>
      </div>
    );
  }

  if (toolId === "autocomplete") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-2 text-center">
          <div className="text-xs text-muted-foreground mb-3">Auto-filling cells...</div>
          <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
            {[
              { v: "5", done: true }, { v: "3", done: true }, { v: "4", done: true },
              { v: "6", done: true }, { v: "7", done: true }, { v: null, done: false },
              { v: null, done: false }, { v: "9", done: true }, { v: "8", done: true },
            ].map((cell, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  cell.done
                    ? cell.v ? "bg-violet-500/30 text-violet-300 border border-violet-400/40" : "bg-white/5 border border-white/10"
                    : "bg-white/5 border border-white/10 text-transparent"
                }`}
              >
                {cell.v && <span className={i === 5 ? "animate-number-pop text-violet-300" : ""}>{cell.v}</span>}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <IconCheck className="w-3 h-3 text-violet-400" />
            <span className="text-xs text-muted-foreground">Only one possibility</span>
          </div>
        </div>
      </div>
    );
  }

  if (toolId === "undo") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground">Move history</div>
          <div className="space-y-1.5 w-36 mx-auto">
            {[
              { cell: "R4 C2", val: "5", current: false },
              { cell: "R2 C7", val: "3", current: false },
              { cell: "R1 C3", val: "4", current: true },
            ].map((move, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${
                  move.current
                    ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
                    : "glass border-white/10 text-muted-foreground"
                }`}
              >
                <span>{move.cell}</span>
                <span className="flex items-center gap-1 font-bold">
                  <IconArrowRight className="w-2.5 h-2.5" />
                  {move.val}
                </span>
                {move.current && <IconArrowBackUp className="w-3 h-3" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground justify-center">
            <IconArrowBackUp className="w-3 h-3" />
            Undo last move
          </div>
        </div>
      </div>
    );
  }

  if (toolId === "erase") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground">Erasing incorrect entry</div>
          <div className="flex items-center gap-3 mx-auto w-fit">
            <div className="w-14 h-14 glass rounded-xl border-2 border-orange-400/50 flex items-center justify-center relative">
              <span className="text-2xl font-bold text-orange-400/60 line-through">8</span>
              <div className="absolute inset-0 bg-orange-400/5 rounded-xl" />
            </div>
            <IconEraser className="w-6 h-6 text-orange-400 animate-pulse" />
            <div className="w-14 h-14 glass rounded-xl border border-white/10 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">empty</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Clears numbers & notes</div>
        </div>
      </div>
    );
  }

  if (toolId === "mistakes") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground">Error detection</div>
          <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
            {[
              { v: "5", err: false }, { v: "3", err: false }, { v: "8", err: true },
              { v: "6", err: false }, { v: "7", err: false }, { v: "2", err: false },
              { v: "1", err: false }, { v: "9", err: false }, { v: "4", err: false },
            ].map((cell, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold border ${
                  cell.err
                    ? "bg-red-500/25 border-red-400/60 text-red-400"
                    : "glass border-white/10 text-foreground/70"
                }`}
              >
                {cell.v}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < 1 ? "bg-red-400" : "bg-white/15"}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">1/3</span>
          </div>
        </div>
      </div>
    );
  }

  if (toolId === "pause") {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="space-y-3 text-center">
          <div className="text-xs text-muted-foreground">Game paused</div>
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-full h-full glass rounded-xl border border-white/10 grid grid-cols-3 gap-0.5 p-1 opacity-30 blur-sm">
              {Array(9).fill(null).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-sm" />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
              <IconPlayerPause className="w-8 h-8 text-slate-300 mb-1" />
              <span className="text-xs text-slate-400 font-mono">00:04:37</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Board hidden while paused</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-muted-foreground text-sm">Select a tool</div>
    </div>
  );
}

export function Tools() {
  const [activeTab, setActiveTab] = useState(tools[0].id);
  const activeTool = tools.find((tool) => tool.id === activeTab) || tools[0];
  const { toolsRef } = useScroll();

  return (
    <section ref={toolsRef} className="py-24 sm:py-32 relative bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Game Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            7 essential tools to enhance your gameplay and help you solve any puzzle.
          </p>
        </div>

        {/* Tools Content */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm
                    ${isActive
                      ? `bg-gradient-to-br ${tool.color} border ${tool.iconColor.replace("text-", "border-").replace("400", "400/60")} shadow-lg ${tool.iconColor.replace("text-", "shadow-").replace("400", "400/20")} text-foreground`
                      : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? tool.iconColor : ""}`} />
                  <span className="hidden sm:inline">{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid md:grid-cols-2 min-h-72">
              {/* Left: Description */}
              <div className="p-8 sm:p-10 space-y-6 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeTool.color} flex items-center justify-center`}>
                    <activeTool.icon className={`w-7 h-7 ${activeTool.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{activeTool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{activeTool.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {activeTool.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${activeTool.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${activeTool.iconColor.replace("text-", "bg-")}`} />
                      </div>
                      <span className="text-sm text-foreground/85 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Visual Mockup */}
              <div className={`flex items-center justify-center bg-gradient-to-br ${activeTool.color} bg-opacity-30`}>
                <ToolVisual toolId={activeTool.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
