"use client";

import { IconBrandGithub, IconDownload, IconMenu2, IconX, IconHome, IconSparkles, IconTool, IconChartBar, IconCode, IconBrandAndroid } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { latestVersion } from "@/lib/versions";
import Link from "next/link";
import { useScroll } from "@/lib/scroll-context";
import Image from "next/image";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { homeRef, featuresRef, toolsRef, statsRef, opensourceRef, downloadRef, scrollToSection } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 20);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDirectDownload = () => {
    window.open(latestVersion.downloadLink, "_blank");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent backdrop-blur-md border-transparent"
      }`}>
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-violet-400 to-accent transition-all duration-150 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection(homeRef)}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-white rounded-lg p-0.5 flex items-center justify-center transition-transform group-hover:scale-110">
              <Image src={'/icon.svg'} alt="Solve9 Logo" width={40} height={40} className="h-full w-full" />
            </div>
            <span className="text-xl font-bold gradient-text">Solve9</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { label: "Features", ref: featuresRef, icon: IconSparkles },
              { label: "Tools", ref: toolsRef, icon: IconTool },
              { label: "Stats", ref: statsRef, icon: IconChartBar },
              { label: "Open Source", ref: opensourceRef, icon: IconCode },
            ].map(({ label, ref, icon: Icon }) => (
              <button
                key={label}
                onClick={() => scrollToSection(ref)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5 group"
              >
                <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                {label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="group">
                <IconBrandGithub className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                GitHub
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => scrollToSection(downloadRef)}
              className="group shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              <IconBrandAndroid className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? (
              <IconX className="w-6 h-6" />
            ) : (
              <IconMenu2 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-card/30 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-2 flex flex-col items-start">

              <Button
                onClick={() => {
                  scrollToSection(featuresRef);
                  setMobileMenuOpen(false);
                }}
                variant={'ghost'}
              >
                Features
              </Button>
              <Button
                onClick={() => {
                  scrollToSection(toolsRef);
                  setMobileMenuOpen(false);
                }}
                variant={'ghost'}
              >
                Tools
              </Button>
              <Button
                onClick={() => {
                  scrollToSection(statsRef);
                  setMobileMenuOpen(false);
                }}
                variant={'ghost'}
              >
                Stats
              </Button>
              <Button
                onClick={() => {
                  scrollToSection(opensourceRef);
                  setMobileMenuOpen(false);
                }}
                variant={'ghost'}
              >
                Open Source
              </Button>
              <div className="pt-2 space-y-2 w-full flex gap-2">
                <Link href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className=" border-white/10 hover:bg-white/5 flex-1">
                    <IconBrandGithub className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    handleDirectDownload();
                    setMobileMenuOpen(false);
                  }}
                  className={'flex-1'}
                >
                  <IconDownload className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </nav >
  );
}
