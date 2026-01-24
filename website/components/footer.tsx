"use client";

import {
  IconBrandGithub,
  IconBrandTwitter,
  IconHeart,
  IconMail,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
                S9
              </div>
              <span className="text-xl font-bold gradient-text">Solve9</span>
            </a>
            <p className="text-sm text-muted-foreground">
              The smartest way to play Sudoku.
              Free, open-source, and ad-free forever.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-foreground transition-colors">
                  Tools
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-foreground transition-colors">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-foreground transition-colors">
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold mb-4">Developer</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/iamabhi0619/solve9" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/iamabhi0619/solve9/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Report Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/iamabhi0619/solve9/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Contributing
                </a>
              </li>
              <li>
                <a href="https://github.com/iamabhi0619/solve9/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/iamabhi0619"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all hover:scale-110"
              >
                <IconBrandGithub className="w-5 h-5" />
              </a>
              <a
                href="mailto:iamabhi0619@gmail.com"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all hover:scale-110"
              >
                <IconMail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Solve9. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Made with <IconHeart className="w-4 h-4 text-accent" /> by the Solve9 Team
          </p>
        </div>
      </div>
    </footer>
  );
}
