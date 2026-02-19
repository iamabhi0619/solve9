"use client";

import { IconBrandAndroid, IconBrandApple, IconChevronDown, IconDownload, IconCheck, IconShieldCheck, IconTag } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { versions, latestVersion } from "@/lib/versions";
import { useState } from "react";
import { useScroll } from "@/lib/scroll-context";

export function Download() {
  const [selectedVersion, setSelectedVersion] = useState(latestVersion);
  const { downloadRef } = useScroll();

  const handleDownload = (downloadLink: string) => {
    window.open(downloadLink, "_blank");
  };

  return (
    <section ref={downloadRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />

            {/* Heading */}
            <div className="space-y-4 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-sm mb-2">
                <IconDownload className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">Free forever · No account needed</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to <span className="gradient-text">Start Playing?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download Solve9 now and experience the most intelligent,
                beautiful, and ad-free Sudoku game on mobile.
              </p>
            </div>

            {/* Version selector */}
            <div className="flex flex-col items-center gap-3 relative">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconTag className="w-3.5 h-3.5" />
                <span>Version {selectedVersion.version}</span>
                {selectedVersion.isLatest && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Latest
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg glass border border-white/10 hover:border-white/20">
                  Select Version
                  <IconChevronDown className="w-4 h-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {versions.map((version) => (
                    <DropdownMenuItem
                      key={version.version}
                      onClick={() => setSelectedVersion(version)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full gap-4">
                        <span>v{version.version}</span>
                        {version.isLatest && (
                          <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-xs">Latest</span>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Button
                size="lg"
                onClick={() => handleDownload(selectedVersion.downloadLink)}
                className="relative group bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-lg px-8 py-6 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <IconBrandAndroid className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Download for Android
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 hover:bg-white/5 hover:border-white/20 text-lg px-8 py-6 rounded-xl group w-full sm:w-auto"
                disabled
              >
                <IconBrandApple className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Coming to iOS
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2 relative">
              {[
                { value: "Free", sub: "Forever", icon: IconCheck, color: "text-green-400" },
                { value: "No Ads", sub: "Ever", icon: IconShieldCheck, color: "text-blue-400" },
                { value: "Open Source", sub: "Always", icon: IconBrandAndroid, color: "text-violet-400" },
              ].map(({ value, sub, icon: Icon, color }) => (
                <div key={value} className="text-center p-4 glass rounded-xl border border-white/8 hover:border-white/18 transition-all group">
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${color} group-hover:scale-110 transition-transform`} />
                  <div className="text-xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
