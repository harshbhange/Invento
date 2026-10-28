# Graph Report - Invento  (2026-10-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 311 nodes · 461 edges · 17 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b30e19ad`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- profile-form.tsx
- dependencies
- user-button.tsx
- devDependencies
- compilerOptions
- components.json
- profile.tsx
- compilerOptions
- theme-provider.tsx
- App.tsx
- auth.api.ts
- package.json
- index.d.ts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 15 edges
3. `Button()` - 8 edges
4. `scripts` - 7 edges
5. `ThemeProvider()` - 6 edges
6. `aliases` - 6 edges
7. `tailwind` - 6 edges
8. `Field()` - 5 edges
9. `Card()` - 5 edges
10. `CardContent()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Profile()` --indirect_call--> `getUserProfile_Api()`  [INFERRED]
  src/pages/user/profile.tsx → src/api/user.api.ts
- `AuthLayOut()` --indirect_call--> `getUserDetails_API()`  [INFERRED]
  src/pages/layout/auth.layout.tsx → src/api/user.api.ts
- `Profile()` --indirect_call--> `getUserDetails_API()`  [INFERRED]
  src/pages/user/profile.tsx → src/api/user.api.ts
- `CompanyRegisterForm()` --calls--> `checkCompanyNameIsValid()`  [EXTRACTED]
  src/components/company/company-register-form.tsx → src/api/company.ts
- `CompanyRegisterForm()` --calls--> `registerCompany()`  [EXTRACTED]
  src/components/company/company-register-form.tsx → src/api/company.ts

## Import Cycles
- None detected.

## Communities (17 total, 0 thin omitted)

### Community 0 - "profile-form.tsx"
Cohesion: 0.09
Nodes (24): AuthApiType, api, checkCompanyNameIsValid(), registerCompany(), createProfile_Api(), getUserDetails_APIType, getUserProfile_Api(), AuthFormProps (+16 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (37): axios, class-variance-authority, cn, @fontsource-variable/geist, @hookform/resolvers, lucide-react, dependencies, axios (+29 more)

### Community 2 - "user-button.tsx"
Cohesion: 0.09
Nodes (11): logOutApi(), TopNavBar(), Avatar(), DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuSeparator() (+3 more)

### Community 3 - "devDependencies"
Cohesion: 0.07
Nodes (29): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+21 more)

### Community 4 - "compilerOptions"
Cohesion: 0.08
Nodes (25): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+17 more)

### Community 5 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "profile.tsx"
Cohesion: 0.23
Nodes (12): Badge(), badgeVariants, Button(), buttonVariants, Card(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 8 - "theme-provider.tsx"
Cohesion: 0.14
Nodes (16): App(), ProfileFormWrapper(), ProfileGifDisplay(), disableTransitionsTemporarily(), getSystemTheme(), isEditableTarget(), isTheme(), ResolvedTheme (+8 more)

### Community 9 - "App.tsx"
Cohesion: 0.19
Nodes (11): getUserDetails_API(), CompanyJoinFormWrapper(), CompanyRegisterFormWrapper(), loggedInUserAtom, ApiFunction, useApi(), Register(), Company() (+3 more)

### Community 10 - "auth.api.ts"
Cohesion: 0.28
Nodes (9): loginUserAPi(), registerUserAPI(), AuthForm(), AuthFormWrapper(), LogIn(), LoginInput, loginSchema, RegisterInput (+1 more)

### Community 11 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, format, lint, preview (+3 more)

### Community 12 - "index.d.ts"
Cohesion: 0.18
Nodes (10): AUTH_FORM_WARPPER_TYPES, Company, CompanyMember, companyRole, gender, joinRequestStatus, Profile, provider (+2 more)

### Community 13 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **120 isolated node(s):** `getUserDetails_APIType`, `AuthFormProps`, `AUTH_FORM_WARPPER_TYPES`, `Company`, `CompanyMember` (+115 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `Button()` connect `profile.tsx` to `profile-form.tsx`, `user-button.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `getUserDetails_APIType`, `AuthFormProps`, `AUTH_FORM_WARPPER_TYPES` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `profile-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08970099667774087 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `user-button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._