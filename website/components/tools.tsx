"use client";

import {
  IconAlertCircle,
  IconArrowBackUp,
  IconBulb,
  IconEraser,
  IconPencil,
  IconPlayerPause,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";
import { useScroll } from "@/lib/scroll-context";

const tools = [
  {
    id: "pencil",
    name: "Notes Mode",
    icon: IconPencil,
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
    description: "Take breaks anytime",
    details: [
      "Pause overlay hides the board",
      "Timer stops during pause",
      "Auto-saves when exiting",
      "Resume exactly where you left off",
    ],
  },
];

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
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                      : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="glass rounded-2xl border border-white/10 p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <activeTool.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{activeTool.name}</h3>
                    <p className="text-muted-foreground">{activeTool.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {activeTool.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-foreground/90">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Visual Mockup */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm aspect-square glass rounded-2xl border border-white/10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="text-center space-y-4">
                    <activeTool.icon className="w-24 h-24 mx-auto text-primary/50" />
                    <p className="text-sm text-muted-foreground px-8">Tool visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
