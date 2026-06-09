# Full-Stack Learning Context & Lesson Plan

**Last Updated:** June 2, 2026  
**Learner:** Engineer II (Frontend-specialized, rounding with Node.js backend)  
**Goal:** Become a competent full-stack developer who understands all architectural choices

---

## Table of Contents

1. [Learner Context](#learner-context)
2. [Current State Assessment](#current-state-assessment)
3. [Repository Structure & Decisions](#repository-structure--decisions)
4. [Custom Lesson Plan (Socratic Method)](#custom-lesson-plan-socratic-method)
5. [Technical Deep Dives](#technical-deep-dives)
6. [Building Your Portfolio Piece](#building-your-portfolio-piece)

---

## Learner Context

### Professional Background

- **Title:** Engineer II (higher pay tier)
- **Specialization:** React/Next.js/Apollo Client/TypeScript
- **Current Responsibilities:**
  - Frontend development in React with state management
  - Performance optimization (Core Web Vitals)
  - Shared library work (web/mobile data handling, transformations)
  - Release management and project leadership
  - Server-side components and Next.js server-side patterns

### Learning Trajectory

- **Experience:** Strong React fundamentals (hooks, state, performance, streaming)
- **Gap:** Limited direct Node.js server work (have done it, but not primary focus)
- **Goal Reframe:** Not becoming a backend specialist, but understanding full-stack systems holistically
- **Additional Context:** Currently taking AI engineering classes; interested in integrating AI into this sandbox

### Learning Style Preferences

- **Method:** Socratic (guiding questions, not direct solutions)
- **Pace:** 4-5 hours per week
- **Learning Type:** Deep dive into 5 things (not broad survey)
- **Ownership:** Make intentional decisions, not follow ChatGPT suggestions blindly
- **Background:** Art and design background (thinks visually about problems)

### Personal Details

- **Cat:** Buick 🐱
- **Fishing concept:** Interested in AI + cats + fishing as portfolio feature theme

---

## Current State Assessment

### Repository: `jwollin/sandbox`

**Status:** Mid-level learning monorepo with strong foundations but unfinished architecture decisions

#### What's Working Well

1. **Monorepo structure** — Nx 22.7.5 professionally configured
2. **Tech stack** — Express 5.2.1, Pino logging, Zod validation (production-grade choices)
3. **TypeScript setup** — Path aliases, linting, formatting enforced
4. **Middleware architecture** — Request ID, validation, error handling middleware in place
5. **Intentional thinking** — You're questioning decisions rather than following tutorials blindly

#### Critical Gaps

**Build Configuration**

- `tsconfig.app.json` outputs to `../../dist/out-tsc`
- `project.json` expects `dist/apps/api`
- Path alias issue: `@routes/route-registry` not resolving at runtime
- Using `tsc-alias` without understanding why
- **Impact:** You can't debug or modify build without getting lucky

**Package/Library Structure**

- `packages/` directory exists but empty
- No shared code between `apps/api` and `apps/web/projects`
- No clear distinction between what should be libs, packages, or utils

**Validation Layer**

- Basic Zod validation works, but doesn't compose
- No custom validators
- No async validation (check if username exists)
- Error transformation (Zod errors → API response) is incomplete

**Error Architecture**

- `AppError` class exists but is minimal
- No error context/metadata
- No error cause chains
- No serialization strategy

**Testing & Documentation**

- Jest installed but unused
- No integration tests
- No ADRs (Architecture Decision Records)
- No build documentation

**Observable Issues**

- Logging is console-based, not structured
- No correlation IDs tracked across requests
- No observability strategy

### Decision Log (Locked In)

```
✅ Output directory: dist/apps/api (namespaced, intent-clear)
✅ Build tool exploration: esbuild (investigate alternative to tsc-alias)
✅ Package structure: libs/ (internal, npm-publishing ready)
✅ Main app naming: apps/web/app (generic entry point)
✅ First shared library: libs/shared-types (types + schemas + utils)
✅ Error architecture: Full sophistication (context + chains + serialization)
✅ First feature: AI-related (cats + fishing concept)
```

---

## Repository Structure & Decisions

### Monorepo Layout (Current & Planned)

```
sandbox/
├── apps/
│   ├── api/                    # Express API server
│   │   ├── src/
│   │   │   ├── main.ts       # Entry point
│   │   │   ├── middleware/     # Request pipeline
│   │   │   ├── routes/         # Dynamic route registry
│   │   │   ├── services/       # Business logic
│   │   │   ├── error-handling/ # Error classes
│   │   │   └── lib/            # Utilities
│   │   ├── tsconfig.app.json   # App-specific TS config
│   │   └── project.json        # Nx build config
│   │
│   └── web/
│       └── app/                # Next.js frontend (to be created)
│           ├── src/
│           ├── app/            # App router
│           └── project.json
│
├── libs/
│   ├── shared-types/           # Types, schemas, validators
│   │   ├── src/
│   │   │   ├── schemas/        # Zod schemas
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── validators/     # Custom validators
│   │   │   └── index.ts.hbs        # Public exports
│   │   └── project.json
│   │
│   └── (future: api-client, utils, etc.)
│
├── tsconfig.base.json          # Base TS config (path aliases defined here)
├── tsconfig.json               # Root TS config
├── nx.json                     # Nx configuration
├── package.json                # Root package.json
└── yarn.lock
```

### Key Configuration Decisions

#### 1. Path Aliases

**Decision:** Keep `@routes`, `@utils`, `@middleware`, `@errors`, but understand the pipeline

```jsonc
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@routes/*": ["apps/api/src/routes/*"],
      "@utils/*": ["apps/api/src/lib/utils/*"],
      "@middleware/*": ["apps/api/src/middleware/*"],
      "@errors/*": ["apps/api/src/error-handling/*"],
      "@shared/*": ["libs/shared-types/src/*"],
    },
  },
}
```

**Pipeline:**

1. TypeScript compilation: Keeps aliases as-is
2. tsc-alias OR esbuild: Rewrites to actual paths
3. Runtime: Node executes with real paths

#### 2. Build Output

**Decision:** Standardize on `dist/apps/api` across all configs

```jsonc
// apps/api/tsconfig.app.json
{
  "compilerOptions": {
    "outDir": "../../dist/apps/api", // Must match project.json
  },
}
```

```jsonc
// apps/api/project.json
{
  "targets": {
    "build": {
      "options": {
        "outputPath": "dist/apps/api", // Must match tsconfig
      },
    },
  },
}
```

#### 3. Build Tool Strategy

**Current:** `tsc + tsc-alias`  
**To Explore:** `esbuild` for single-step compilation + native alias handling

---

## Custom Lesson Plan (Socratic Method)

### Overview

Three intensive sessions over 2-3 weeks. Each builds on previous learning. Focus on _understanding_, not memorization.

### Session 1: Fix the Build (Understanding TypeScript Compilation)

**Outcome:** You own your build pipeline. Can modify any config and explain why.

#### Part 1.1: Diagnostic Questions

**Before we change anything, explore your current setup:**

1. **What does `nx build api` do?**
   - What executor does it use? (Check `project.json`)
   - What does that executor do?
   - What files does it create?

2. **Where do compiled files end up?**
   - Run `yarn build:api`
   - Run `find dist -name "*.js" -type f`
   - Do the file locations match what `project.json` says?

3. **What does `tsc-alias` do?**
   - Look at a compiled file: `cat dist/apps/api/src/server.js`
   - Search for `require(\"@routes\"`
   - What does the line look like?
   - Now run `tsc-alias`
   - Check the same file again
   - What changed?

4. **Why is there a mismatch?**
   - `tsconfig.app.json` says `outDir: ../../dist/out-tsc`
   - `project.json` says `outputPath: dist/apps/api`
   - These conflict. What should be the source of truth?

#### Part 1.2: The Path Alias Pipeline (Deep Understanding)

**Diagram it out:**

```
TypeScript Source
↓
tsc compilation
↓ (keeps @routes as-is in output)
JavaScript with require("@routes/...")
↓
tsc-alias OR esbuild
↓ (rewrites to require("../../../src/routes/..."))
JavaScript with real paths
↓
Node runtime
↓ (can resolve real paths)
Success ✓
```

**Questions:**

1. Why can't Node understand `@routes`?
2. Why can't tsc rewrite the paths itself?
3. What does `tsc-alias` actually do line-by-line?
4. Could esbuild do this better? (research, don't answer yet)

#### Part 1.3: Investigate esbuild

**Task:** Research and experiment (without committing changes)

```bash
# Install (don't keep yet)
yarn add -D esbuild

# Try it
esbuild apps/api/src/main.ts \
  --outdir=dist/apps/api \
  --format=cjs \
  --platform=node

# Check output
cat dist/apps/api/server.js | head -20
```

**Questions:**

1. Did it work?
2. Does the output have real paths or `@routes` aliases?
3. Is this simpler than `tsc + tsc-alias`?
4. What would you lose if you switched?

#### Part 1.4: Make the Call

**Decision point:** Should you use esbuild or stick with tsc-alias?

**To decide, answer:**

1. What's the difference in build time?
2. What's the difference in output size?
3. Which feels more maintainable to you?
4. Which aligns with Nx conventions?

---

### Session 2: Create `libs/shared-types` (Library Structure & Dependency Management)

**Outcome:** You understand how Nx manages libraries and cross-app dependencies.

#### Part 2.1: Design the Library

**Questions before building:**

1. **What code should be in `libs/shared-types`?**
   - What types exist in your API right now?
   - What Zod schemas do you have?
   - What would the frontend need to know?

2. **How should it be organized?**
   - One barrel export (`index.ts.hbs`)?
   - Sub-paths (`@shared/schemas`, `@shared/types`)?
   - Both?

3. **Who uses what?**
   - Does the frontend need all schemas?
   - Are some API-internal only?

#### Part 2.2: Create the Library Structure

**Steps (with understanding):**

1. **Create the folder structure** (manually or with Nx generator)

   ```
   libs/shared-types/
   ├── src/
   │   ├── schemas/
   │   │   └── index.ts.hbs       # All Zod schemas exported
   │   ├── types/
   │   │   └── index.ts.hbs       # TypeScript types
   │   ├── validators/
   │   │   └── custom.ts      # Custom validation functions
   │   └── index.ts.hbs           # Public API (barrel export)
   ├── project.json           # Nx config for this lib
   └── tsconfig.json
   ```

2. **Define the public API** (what consumers can import)

   ```typescript
   // libs/shared-types/src/index.ts.hbs
   export * from './schemas';
   export * from './types';
   export * from './validators';
   ```

3. **Create path aliases** in `tsconfig.base.json`
   ```json
   "@shared/*": ["libs/shared-types/src/*"]
   ```

#### Part 2.3: Move Code Into the Library

**What to move:**

- Current Zod schemas from `apps/api` → `libs/shared-types/src/schemas/`
- API response types → `libs/shared-types/src/types/`
- Utilities that could be shared → `libs/shared-types/src/validators/`

**Question:** How do you ensure both `api` and `web` can import from this library?

#### Part 2.4: Test the Dependency

**Verify it works:**

1. In `apps/api/src/routes`, import from the library:

   ```typescript
   import { userSchema } from '@shared/schemas';
   ```

2. Build and run:

   ```bash
   yarn build:api
   yarn start:api
   ```

3. Does it still work? Why or why not?

---

### Session 3: Build the AI Feature (End-to-End Full-Stack)

**Outcome:** Cats + Fishing + AI = Portfolio piece that proves you understand the whole system

#### Part 3.1: Design the Feature

**Before coding, design:**

1. **What does the AI feature do?**
   - Accepts: description of a fishing trip with a cat
   - Processes: AI generates a creative story/analysis
   - Returns: structured response

2. **API Design:**
   - Endpoint: `POST /api/fishing-stories`
   - Request body: `{ catName: string; location: string; description: string }`
   - Response: `{ id: string; story: string; createdAt: ISO8601 }`

3. **Data Model:**
   - Do you need persistence (database)?
   - Or just in-memory for now?
   - Validation?

4. **Error Cases:**
   - Invalid input
   - AI service failure
   - Rate limiting

#### Part 3.2: Validation & Schemas

**Create Zod schema in `libs/shared-types`:**

```typescript
// libs/shared-types/src/schemas/fishing.ts
import { z } from 'zod';

export const createFishingStorySchema = z.object({
  catName: z.string().min(1).max(100),
  location: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
});

export type CreateFishingStoryInput = z.infer<typeof createFishingStorySchema>;
export type FishingStory = CreateFishingStoryInput & {
  id: string;
  story: string;
  createdAt: string;
};
```

#### Part 3.3: Error Architecture (Sophistication)

**Extend `AppError` with context:**

```typescript
// apps/api/src/error-handling/app-error.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public context?: Record<string, any>,
    public cause?: Error,
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.context && { context: this.context }),
        ...(this.cause && { cause: this.cause.message }),
      },
    };
  }
}
```

**Usage:**

```typescript
throw new AppError(
  'INVALID_INPUT',
  'Fishing story input failed validation',
  400,
  { field: 'catName', reason: 'required' },
  validationError,
);
```

#### Part 3.4: Service Layer

**Create the business logic:**

```typescript
// apps/api/src/services/fishing-story.service.ts
import { CreateFishingStoryInput, FishingStory } from '@shared';

export class FishingStoryService {
  private stories: Map<string, FishingStory> = new Map();

  async createStory(input: CreateFishingStoryInput): Promise<FishingStory> {
    // TODO: Call AI API (use placeholder for now)
    const story = this.generateStory(input);

    const fishingStory: FishingStory = {
      ...input,
      id: crypto.randomUUID(),
      story,
      createdAt: new Date().toISOString(),
    };

    this.stories.set(fishingStory.id, fishingStory);
    return fishingStory;
  }

  private generateStory(input: CreateFishingStoryInput): string {
    // Placeholder (replace with real AI call later)
    return `${input.catName} went fishing at ${input.location}. ${input.description}`;
  }
}
```

#### Part 3.5: Route Handler

**Wire everything together:**

```typescript
// apps/api/src/routes/fishing-stories.ts
import { Router } from 'express';
import { validate } from '@middleware/validate';
import { createFishingStorySchema } from '@shared/schemas';
import { FishingStoryService } from '@services/fishing-story.service';
import { AppError } from '@errors/app-error';

const router = Router();
const service = new FishingStoryService();

router.post('/', validate(createFishingStorySchema), async (req, res, next) => {
  try {
    const story = await service.createStory(req.body);
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
});

export default router;
```

#### Part 3.6: Integration Tests

**Write one test to prove everything works:**

```typescript
// apps/api/src/routes/__tests__/fishing-stories.test.ts
import request from 'supertest';
import app from '../../server';

describe('POST /api/fishing-stories', () => {
  it('should create a fishing story with valid input', async () => {
    const response = await request(app).post('/api/fishing-stories').send({
      catName: 'Buick',
      location: 'Mountain Lake',
      description: 'A brave cat attempting to catch its first fish',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('story');
    expect(response.body.catName).toBe('Buick');
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).post('/api/fishing-stories').send({
      catName: '', // Invalid: empty
      location: 'Mountain Lake',
      description: 'A brave cat',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

#### Part 3.7: Frontend Integration (Next.js)

**Create `apps/web/app` and connect:**

```typescript
// apps/web/app/src/app/page.tsx
'use client';

import { useState } from 'react';
import type { CreateFishingStoryInput } from '@shared/schemas';

export default function Home() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateStory = async (input: CreateFishingStoryInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/fishing-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to create story');
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fishing Stories with Buick 🐱</h1>
      {/* Form UI here */}
      {story && <p>{story.story}</p>}
    </div>
  );
}
```

---

## Technical Deep Dives

### Build Configuration Explained

#### Why the Mismatch Happened

1. ChatGPT suggested `out-tsc` during initial setup
2. You moved on without updating `project.json`
3. Nx can work with mismatched configs (through best-effort resolution)
4. But debugging becomes impossible

#### The Three tsconfig Files

```
tsconfig.json (root)
├── extends: tsconfig.base.json
├── purpose: Root coordinator, tells TS to look elsewhere

tsconfig.base.json (base)
├── compilerOptions: Shared defaults for all projects
├── paths: Path aliases defined here
├── purpose: Single source of truth for shared TS behavior

apps/api/tsconfig.app.json (app-specific)
├── extends: tsconfig.base.json
├── overrides: App-specific compiler options
├── purpose: API-specific settings (e.g., outDir, types)
```

#### Path Resolution Pipeline

```
Development:
  TypeScript understands @routes as alias
  ↓ (via tsconfig.base.json paths)
  Type checking works ✓
  IDE autocomplete works ✓

Compilation (tsc):
  Keeps @routes as-is in .js output
  ↓
  require("@routes/...") in compiled code

Runtime Resolution:
  Node can't find @routes (not a real npm module)
  ↓ FAILS ❌

Fix:
  tsc-alias rewrites imports to real paths
  ↓
  require("../../../src/routes/...")
  ↓
  Node finds it ✓
```

### Validation Architecture Pattern

**Pattern:** Separation of concerns in validation

```
Request arrives
  ↓
Validation middleware (checks schema)
  ↓ (if invalid → AppError → error middleware → HTTP 400)
  ↓ (if valid → pass to handler)
Handler receives typed, validated data
  ↓
Business logic (service layer)
  ↓ (may throw AppError for business rule violations)
  ↓
Response sent or error caught
```

**Why this matters:**

- Invalid data never enters business logic
- Error handling is centralized
- Each layer has one responsibility
- Easy to test each layer independently

### Error Architecture Pattern

**Pattern:** Hierarchical error handling

```
Global error middleware catches all errors
  ↓
If instanceof AppError
  → Known error, send as-is (status code, message, code)
  ✓ Return structured error response
  ↓
Else (unknown error)
  → Programmer error or external library error
  → Log it (for debugging)
  → Send generic "INTERNAL_SERVER_ERROR" (don't expose internals)
```

**Error Context Chain:**

```
Input validation fails (Zod)
  ↓
Catch Zod error
  ↓
Throw AppError(
  code: "VALIDATION_ERROR",
  message: "Invalid input",
  statusCode: 400,
  context: { field: "catName" },
  cause: zodError  ← Original error for debugging
)
```

---

## Building Your Portfolio Piece

### Why This Matters

By the time you finish, you'll have:

1. **A real full-stack feature** (AI + Cats + Fishing)
2. **Working API** with production-grade patterns
3. **Frontend** that consumes it
4. **Tests** that prove it works
5. **Documentation** that explains every decision
6. **Architecture diagrams** (visual, leveraging your design background)
7. **Deployment ready** (can add Docker/CI later)

### What Interviewers See

Instead of "I followed a tutorial," you can say:

_"I built a full-stack system from scratch. Here's my API architecture (show diagram). Here's why I chose Express over Fastify (trade-offs). Here's how I handle errors consistently across the stack (show code). Here's how I validate inputs without letting bad data into business logic (show pattern). I wrote integration tests that prove it works. I deploy it as a monorepo with shared types between frontend and backend. And I can explain every configuration file and why it exists."_

That's senior-level thinking.

### Sharing Your Work

1. **GitHub:** Link to the repo (will be impressive)
2. **Portfolio site:** Deploy it (use your `apps/web/app`)
3. **Blog post:** "How I Built a Full-Stack AI Feature" (leverage design background for diagrams)
4. **Interview prep:** "Walk me through your monorepo setup" (you'll have deep answers)

---

## Next Steps

### Immediate (This Week)

1. Answer the diagnostic questions from Session 1.1
2. Run the build and check output paths
3. Explore esbuild as alternative
4. Report back with findings

### Week 2

1. Make build configuration decision (tsc-alias vs esbuild)
2. Create `libs/shared-types` structure
3. Move existing Zod schemas there
4. Test cross-app imports

### Week 3

1. Design the fishing story feature
2. Build API endpoint with full error handling
3. Write integration test
4. Create frontend (Next.js) that consumes it

### Week 4+

1. Add AI integration (research OpenAI/Claude API)
2. Add database persistence (PostgreSQL)
3. Deploy (Vercel for frontend, Railway for API)
4. Document everything
5. Show it off

---

## Resources & References

### Understanding TypeScript Compilation

- **Key concept:** tsc ≠ runtime. TypeScript compilation is separate from module resolution.
- **Question to ask:** "What does the compiled .js file look like?"

### Understanding Nx

- **Key concept:** Nx doesn't do the compilation; it orchestrates executors.
- **Question to ask:** "Which executor is handling this, and what does that executor do?"

### Understanding Express Middleware

- **Key concept:** Middleware is a function pipeline. Each middleware can modify req/res or pass to next().
- **Question to ask:** "In what order do middlewares run, and what can each one access?"

### Understanding Full-Stack Architecture

- **Key concept:** Different layers, each with a job. Layers shouldn't know about lower layers' implementation.
- **Question to ask:** "If I change from in-memory storage to PostgreSQL, how many files do I need to modify?"

---

## Glossary

**Transpilation:** Converting TypeScript → JavaScript (not bundling, not minifying)  
**Path Alias:** Shorthand for a directory (`@routes` → `apps/api/src/routes`)  
**Middleware:** Function that processes request before it reaches handler  
**AppError:** Custom error class for known, handled errors  
**Validation Schema:** Definition of what a valid input looks like (Zod)  
**Service Layer:** Where business logic lives (between route handler and data layer)  
**Monorepo:** Single repository with multiple projects (apps, libs)  
**Executor:** Tool that Nx uses to run build/test/lint tasks  
**Dependency Injection:** Passing dependencies into functions (vs. global state or imports)

---

## Questions to Ask Yourself Throughout

1. **"Why does this exist?"** — Every config file, every folder, every pattern
2. **"What breaks if I change this?"** — Understand dependencies
3. **"Could I explain this to someone else?"** — If not, dig deeper
4. **"Is there a simpler way?"** — Be pragmatic, not dogmatic
5. **"How does this connect to what I already know?"** — Relate to React patterns

---

**Made for:** Engineer II, Frontend-specialized, Ready to understand the full stack  
**Method:** Socratic (questions > answers)  
**Pace:** 4-5 hours/week over 3-4 weeks  
**Goal:** From "I got this working" to "I understand every choice"
