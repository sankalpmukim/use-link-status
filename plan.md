# Plan for `use-link-status` NPM Package

## 1. Project Setup & Tooling

### 1.1. Initialize Git and GitHub

[DONE]

- `git init`
- Create a `.gitignore` with:
  ```
  node_modules
  dist
  ```
- Initial commit: `git add . && git commit -m "Initial commit"`
- Create a GitHub repo and push (optional, but recommended)

### 1.2. Create `package.json`

- Use `npm init` or manually create with fields:
  - `name`, `version`, `description`, `keywords`, `homepage`, `bugs`, `author`, `repository`, `files`, `type`, `main`, `license`
- Add `next` as a **peerDependency**:
  ```json
  "peerDependencies": {
    "next": ">=15.0.0"
  }
  ```

### 1.3. Add License

- Create a `LICENSE` file (MIT recommended)

### 1.4. Add README

- Document usage, API, and installation

## 2. TypeScript & Build Setup

### 2.1. Install TypeScript

- `npm install --save-dev typescript`

### 2.2. Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "module": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

## 3. Prettier Setup

- `npm install --save-dev prettier`
- Create `.prettierrc`:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 80,
    "tabWidth": 2
  }
  ```
- Add scripts to `package.json`:
  ```json
  "scripts": {
    "format": "prettier --write .",
    "check-format": "prettier --check ."
  }
  ```

## 4. Testing Setup (Vitest)

- `npm install --save-dev vitest`
- Add test script:
  ```json
  "scripts": {
    "test": "vitest run",
    "dev": "vitest"
  }
  ```

## 5. CI Setup (GitHub Actions)

- Create `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  on:
    pull_request:
    push:
      branches:
        - main
  concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true
  jobs:
    ci:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Use Node.js
          uses: actions/setup-node@v4
          with:
            node-version: "20"
        - name: Install dependencies
          run: npm install
        - name: Run CI
          run: npm run ci
  ```
- Add `ci` script:
  ```json
  "scripts": {
    "ci": "npm run build && npm run check-format && npm run test"
  }
  ```

## 6. Changesets for Versioning/Publishing

- `npm install --save-dev @changesets/cli`
- `npx changeset init`
- In `.changeset/config.json`, set:
  ```json
  {
    "access": "public",
    "commit": true
  }
  ```
- Add scripts:
  ```json
  "scripts": {
    "local-release": "changeset version && changeset publish",
    "prepublishOnly": "npm run ci"
  }
  ```

## 7. Source Code Implementation

### 7.1. Directory Structure

```
src/
  context.tsx
  NextLink.tsx
  useLinkStatus.ts
  index.ts
```

### 7.2. Context Implementation (`src/context.tsx`)

```tsx
import React, { createContext, useContext, useState, useCallback } from "react";

interface LinkStatusContextType {
  pendingPathName: string | null;
  setPendingPathName: (path: string | null) => void;
}

const LinkStatusContext = createContext<LinkStatusContextType | undefined>(
  undefined
);

export const LinkStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pendingPathName, setPendingPathName] = useState<string | null>(null);
  const setPending = useCallback(
    (path: string | null) => setPendingPathName(path),
    []
  );
  return (
    <LinkStatusContext.Provider
      value={{ pendingPathName, setPendingPathName: setPending }}
    >
      {children}
    </LinkStatusContext.Provider>
  );
};

export const useLinkStatusContext = () => {
  const ctx = useContext(LinkStatusContext);
  if (!ctx)
    throw new Error(
      "useLinkStatusContext must be used within LinkStatusProvider"
    );
  return ctx;
};
```

### 7.3. NextLink Wrapper (`src/NextLink.tsx`)

```tsx
import * as React from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLinkStatusContext } from "./context.js";

export const Link: React.FC<LinkProps & { children: React.ReactNode }> = (
  props
) => {
  const { setPendingPathName } = useLinkStatusContext();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    setPendingPathName(null);
  }, [pathname, setPendingPathName]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setPendingPathName(
      typeof props.href === "string" ? props.href : props.href.toString()
    );
    if (props.onClick) props.onClick(e);
  };

  return (
    <NextLink {...props} onClick={handleClick}>
      {props.children}
    </NextLink>
  );
};
```

### 7.4. useLinkStatus Hook (`src/useLinkStatus.ts`)

```ts
import { useLinkStatusContext } from "./context.js";

interface UseLinkStatusOptions {
  prefix: string;
  root?: boolean;
}

export function useLinkStatus({ prefix, root }: UseLinkStatusOptions) {
  const { pendingPathName } = useLinkStatusContext();
  let isPending = false;
  if (pendingPathName) {
    if (root) {
      isPending = pendingPathName === prefix;
    } else {
      isPending = pendingPathName.startsWith(prefix);
    }
  }
  return { isPending };
}
```

### 7.5. Exports (`src/index.ts`)

```ts
export { LinkStatusProvider } from "./context.js";
export { Link as NextLink } from "./NextLink.js";
export { useLinkStatus } from "./useLinkStatus.js";
```

## 8. Testing

- Write tests for context, hook, and NextLink wrapper in `src/*.test.ts(x)` files using Vitest and React Testing Library.

## 9. Build & Publish

- Build: `npm run build`
- Add a changeset: `npx changeset`
- Commit and release: `npm run local-release`

---

**Follow this plan to create a robust, production-ready React hook and component library for Next.js navigation status!**
