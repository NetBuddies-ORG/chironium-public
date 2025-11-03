
  # Chironium Website Design

  This is a code bundle for Chironium Website Design. The original project is available at https://www.figma.com/design/BIvrSHUBly4fSlCqiLkczy/Chironium-Website-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  ### Next.js
  - Dev server: `npm run dev` (http://localhost:3000)
  - Production build: `npm run build` then `npm run start`

  Your existing React app is routed through Next.js App Router at `app/page.tsx`, with global styles loaded in `app/layout.tsx`.

  ### Project Architecture
  We introduced a light, explicit structure without moving existing files. Use barrels + a TS path alias for clean imports.

  - Path alias: `@/*` → `src/*` (configured in `tsconfig.json`)
  - High-level domains (barrels):
    - `src/providers` → cross-cutting providers (Theme)
    - `src/layouts` → app/page-level layouts (MainLayout)
    - `src/features/*` → app feature modules
      - `landing` (LandingPage)
      - `project` (ProjectLauncher)
      - `media` (MediaModule)
      - `derush` (DerushModule)
      - `analysis` (AnalysisModule)
      - `interpretation` (InterpretationModule)
    - `src/shared/components` → reusable primitives (Spectrogram, Waveform, ImageWithFallback)

  Import examples:
  - In pages/components:
    ```ts
    import { ThemeProvider } from '@/providers';
    import { MainLayout } from '@/layouts';
    import { LandingPage } from '@/features/landing-page';
    import { ProjectLauncher } from '@/features/project';
    ```

  Notes:
  - Existing implementations remain under `src/components/*` for now; barrels re-export them to keep imports tidy.
  - You can progressively move files into `src/features/*`, `src/shared/*`, etc., without changing import paths for consumers.

  ### Linting & Formatting
  - Lint: `npm run lint` (uses ESLint flat config at `eslint.config.mjs`)
  - Format: `npm run format` (Prettier with `.prettierrc`)
  