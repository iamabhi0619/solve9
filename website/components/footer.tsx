"use client";

import {
  IconBrandGithub,
  IconHeart,
  IconMail,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center space-x-3 group w-fit">
              <div className="w-10 h-10 bg-white rounded-lg p-0.5 flex items-center justify-center transition-transform group-hover:scale-110">
                <Image src={"/icon.svg"} alt="Solve9 Logo" width={40} height={40} className="h-full w-full" />
              </div>
              <span className="text-xl font-bold gradient-text">Solve9</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The smartest way to play Sudoku.
              Free, open-source, and ad-free forever.
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/iamabhi0619"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all hover:scale-110"
              >
                <IconBrandGithub className="w-4 h-4" />
              </a>
              <a
                href="mailto:iamabhi0619@gmail.com"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all hover:scale-110"
              >
                <IconMail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Features", href: "#features" },
                { label: "Tools", href: "#tools" },
                { label: "Statistics", href: "#stats" },
                { label: "Download", href: "#download" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-muted-foreground hover:text-foreground transition-colors hover:pl-1 duration-200 inline-block">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Developer</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "GitHub Repository", href: "https://github.com/iamabhi0619/solve9" },
                { label: "Report Issues", href: "https://github.com/iamabhi0619/solve9/issues" },
                { label: "Contributing", href: "https://github.com/iamabhi0619/solve9/blob/main/CONTRIBUTING.md" },
                { label: "MIT License", href: "https://github.com/iamabhi0619/solve9/blob/main/LICENSE" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {label}
                    <IconExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Built With</h3>
            <ul className="space-y-2.5 text-sm">
              {["React Native & Expo", "TypeScript", "NativeWind (Tailwind)", "Zustand State Mgmt", "AsyncStorage"].map(tech => (
                <li key={tech} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Solve9. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <IconHeart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" /> by the Solve9 Team
          </p>
        </div>
      </div>
    </footer>
  );
}
