"use client";

import { IconBrandAndroid, IconBrandApple, IconChevronDown } from "@tabler/icons-react";
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl border border-white/10 p-8 sm:p-12 text-center space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to <span className="gradient-text">Start Playing?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download Solve9 now and experience the most intelligent,
                beautiful, and ad-free Sudoku game on mobile.
              </p>
            </div>

            {/* Version Info */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Version {selectedVersion.version}</span>
                {selectedVersion.isLatest && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Latest
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  Select Version
                  <IconChevronDown className="w-4 h-4 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {versions.map((version) => (
                    <DropdownMenuItem
                      key={version.version}
                      onClick={() => setSelectedVersion(version)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>v{version.version}</span>
                        {version.isLatest && (
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-xs">
                            Latest
                          </span>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => handleDownload(selectedVersion.downloadLink)}
                className="bg-linear-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 group w-full sm:w-auto cursor-pointer"
              >
                <IconBrandAndroid className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                <p>Download for Android</p>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-lg px-8 py-6 rounded-xl backdrop-blur-sm group w-full sm:w-auto"
              >
                <IconBrandApple className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <p>Coming to iOS</p>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-sm text-muted-foreground mt-1">Forever</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">No Ads</div>
                <div className="text-sm text-muted-foreground mt-1">Ever</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">Open Source</div>
                <div className="text-sm text-muted-foreground mt-1">Always</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
