export interface Version {
  version: string;
  date: string;
  downloadLink: string;
  isLatest?: boolean;
  changes?: string[];
}

export const versions: Version[] = [
  {
    version: "1.1.0",
    date: "2026-01-20",
    downloadLink:
      "https://release-assets.githubusercontent.com/github-production-release-asset/1125868982/f7af7f33-aef7-4b1e-bc9a-f8198fdb2e2b?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-01-24T08%3A46%3A17Z&rscd=attachment%3B+filename%3Dsolve9-v1.1.0.apk&rsct=application%2Fvnd.android.package-archive&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-01-24T07%3A45%3A46Z&ske=2026-01-24T08%3A46%3A17Z&sks=b&skv=2018-11-09&sig=d1x3O8FbBEe5yM5TNjSSpd6DrNzR%2F7cN0BjfLzb1FdE%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc2OTI0MjcxMiwibmJmIjoxNzY5MjQwOTEyLCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.krqhp47bGhMhzvV89EO26n8wMz6LT9vpv2hSVV_uGmQ&response-content-disposition=attachment%3B%20filename%3Dsolve9-v1.1.0.apk&response-content-type=application%2Fvnd.android.package-archive",
    isLatest: true,
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
      "https://release-assets.githubusercontent.com/github-production-release-asset/1125868982/9614ecc0-9fa6-43c3-b3b3-04e0569a4489?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-01-24T08%3A47%3A24Z&rscd=attachment%3B+filename%3Dsolve9-v1.0.0.apk&rsct=application%2Fvnd.android.package-archive&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-01-24T07%3A47%3A02Z&ske=2026-01-24T08%3A47%3A24Z&sks=b&skv=2018-11-09&sig=PHDWF9x5CKmZDa3cNaL6783n7jZW8QL0PyE5eoRhfhI%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc2OTI0Mjg1MiwibmJmIjoxNzY5MjQxMDUyLCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.QA6UImYafKvdK-cgOkf5eg4Wg5YfiSGUf5l9GDS7pTE&response-content-disposition=attachment%3B%20filename%3Dsolve9-v1.0.0.apk&response-content-type=application%2Fvnd.android.package-archive",
    changes: [
      "9×9 Sudoku grid with 3×3 grouping",
      "Cell, row, column & same-number highlighting",
      "Conflict detection with red highlights",
    ],
  },
];

export const latestVersion = versions.find((v) => v.isLatest) || versions[0];
