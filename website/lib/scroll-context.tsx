"use client";

import { createContext, useContext, useRef, RefObject } from "react";

interface ScrollContextType {
  homeRef: RefObject<HTMLElement | null>;
  featuresRef: RefObject<HTMLElement | null>;
  toolsRef: RefObject<HTMLElement | null>;
  statsRef: RefObject<HTMLElement | null>;
  opensourceRef: RefObject<HTMLElement | null>;
  downloadRef: RefObject<HTMLElement | null>;
  scrollToSection: (ref: RefObject<HTMLElement | null>) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const homeRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const opensourceRef = useRef<HTMLElement>(null);
  const downloadRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 64; // 64px offset for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        homeRef,
        featuresRef,
        toolsRef,
        statsRef,
        opensourceRef,
        downloadRef,
        scrollToSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}
