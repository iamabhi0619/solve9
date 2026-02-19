export interface Version {
  version: string;
  date: string;
  downloadLink: string;
  isLatest?: boolean;
  changes?: string[];
}

export const versions: Version[] = [
  {
    version: "1.5.0",
    date: "2026-02-18",
    isLatest: true,
    downloadLink:
      "https://github.com/iamabhi0619/solve9/releases/download/v1.1.0/solve9-v1.5.0.apk",
    changes: [
      "Added a new Settings screen with navigation support.",
      "Introduced ThemeSelector with light/dark mode and multiple accent color options.",
      "Persisted theme preferences using AsyncStorage.",
      "Added BoardLoader with rotating spinner and pulsing skeleton grid.",
      "Implemented SkeletonGrid and SkeletonCell for improved loading experience.",
      "Added global.css with theme-based color variables.",
      "Created centralized theme.ts module for theme management.",
      "Added useTheme hook to expose current theme and resolved mode.",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-01-20",
    downloadLink:
      "https://github.com/iamabhi0619/solve9/releases/download/v1.1.0/solve9-v1.1.0.apk",
    changes: [
      "Added Async Storage support for saving game data locally.",
      "Added auto-complete functionality.",
      "Enhanced Sudoku cell animations to reflect value changes more clearly.",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-10",
    downloadLink:
      "https://github.com/iamabhi0619/solve9/releases/download/v1.0.0/solve9-v1.0.0.apk",
    changes: [
      "9×9 Sudoku grid with 3×3 grouping",
      "Cell, row, column & same-number highlighting",
      "Conflict detection with red highlights",
    ],
  },
];

export const latestVersion = versions.find((v) => v.isLatest) || versions[0];
