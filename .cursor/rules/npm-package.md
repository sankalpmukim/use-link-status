# How To Create An NPM Package | Total TypeScript

In this guide, we'll go through every single step you need to take to publish a package to npm.

This is not a minimal guide. We'll be setting up a fully production-ready package from an empty directory. This will include:

- [Git](https://git-scm.com/) for version control
- [TypeScript](https://www.typescriptlang.org/) for writing our code and keeping it type-safe
- [Prettier](https://prettier.io/) for formatting our code
- [Vitest](https://vitest.js.org/) for running our tests
- [GitHub Actions](https://docs.github.com/en/actions) for running our CI process
- [Changesets](https://github.com/changesets/changesets) for versioning and publishing our package

If you want to see the finished product, check out this [demo repo](https://github.com/mattpocock/tt-package-demo).

If you prefer video content, I've created a video walkthrough of this guide:

In this section, we'll create a new git repository, set up a `.gitignore`, create an initial commit, create a new repository on GitHub, and push our code to GitHub.

### 1.1: Initialize the repo

Run the following command to initialize a new git repository:

```
git init
```

### 1.2: Set up a `.gitignore`

Create a `.gitignore` file in the root of your project and add the following:

```
node_modules
```

### 1.3: Create an initial commit

Run the following command to create an initial commit:

```
git add .
git commit -m "Initial commit"
```

### 1.4: Create a new repository on GitHub

Using the [GitHub CLI](https://cli.github.com/), run the following command to create a new repository. I've chosen the name `tt-package-demo` for this example:

```
gh repo create tt-package-demo --source=. --public
```

### 1.5: Push to GitHub

Run the following command to push your code to GitHub:

```
git push --set-upstream origin main
```

In this section, we'll create a `package.json` file, add a `license` field, create a `LICENSE` file, and add a `README.md` file.

### 2.1: Create a `package.json` file

Create a `package.json` file with these values:

```
{
  "name": "tt-package-demo",
  "version": "1.0.0",
  "description": "A demo package for Total TypeScript",
  "keywords": ["demo", "typescript"],
  "homepage": "https://github.com/mattpocock/tt-package-demo",
  "bugs": {
    "url": "https://github.com/mattpocock/tt-package-demo/issues"
  },
  "author": "Matt Pocock <team@totaltypescript.com> (https://totaltypescript.com)",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mattpocock/tt-package-demo.git"
  },
  "files": ["dist"],
  "type": "module",
  "main": "dist/index.js"
}
```

- `name` is the name by which people will install your package. It must be unique on npm. You can create [organization scopes](https://docs.npmjs.com/about-organization-scopes-and-packages) (such as `@total-typescript/demo`) for free, these can help make it unique.
- `version` is the version of your package. It should follow [semantic versioning](https://semver.org/): the `0.0.1` format. Each time you publish a new version, you should increment this number.
- `description` and `keywords` are short descriptions of your package. They're listed in searches in the npm registry.
- `homepage` is the URL of your package's homepage. The GitHub repo is a good default, or a docs site if you have one.
- `bugs` is the URL where people can report issues with your package.
- `author` is you! You can add optionally add your email and website. If you have multiple contributors, you can specify them as an array of `contributors` with the same formatting.
- `repository` is the URL of your package's repository. This creates a link on the npm registry to your GitHub repo.
- `files` is an array of files that should be included when people install your package. In this case, we're including the `dist` folder. `README.md`, `package.json` and `LICENSE` are included by default.
- `type` is set to `module` to indicate that your package uses ECMAScript modules, not CommonJS modules.
- `main` tells Node where to find the entry point of your package.

### 2.2: Add the `license` field

Add a `license` field to your `package.json`. Choose a license [here](https://choosealicense.com/licenses/). I've chosen [MIT](https://choosealicense.com/licenses/mit/).

```
{
  "license": "MIT"
}
```

### 2.3: Add a `LICENSE` file

Create a file called `LICENSE` (no extension) containing the text of your license. For MIT, this is:

```
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Change the `[year]` and `[fullname]` placeholders to the current year and your name.

### 2.4: Add a `README.md` file

Create a `README.md` file with a description of your package. Here's an example:

```
**tt-package-demo**

A demo package for Total TypeScript.
```

This will be shown on the npm registry when people view your package.

In this section, we'll install TypeScript, set up a `tsconfig.json`, create a source file, create an index file, set up a `build` script, run our build, add `dist` to `.gitignore`, set up a `ci` script, and configure our `tsconfig.json` for the DOM.

### 3.1: Install TypeScript

Run the following command to install TypeScript:

```
npm install --save-dev typescript
```

We add `--save-dev` to install TypeScript as a development dependency. This means it won't be included when people install your package.

### 3.2: Set up a `tsconfig.json`

Create a `tsconfig.json` with the following values:

```
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    /* If transpiling with TypeScript: */
    "module": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "sourceMap": true,

    /* AND if you're building for a library: */
    "declaration": true,

    /* AND if you're building for a library in a monorepo: */
    "declarationMap": true
  }
}
```

These options are explained in detail in my [TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet).

### 3.3: Configure your `tsconfig.json` for the DOM

If your code runs in the DOM (i.e. requires access to `document`, `window`, or `localStorage` etc), skip this step.

If your code doesn't require access to DOM API's, add the following to your `tsconfig.json`:

```
{
  "compilerOptions": {
    // ...other options
    "lib": ["es2022"]
  }
}
```

This prevents the DOM typings from being available in your code.

If you're not sure, skip this step.

### 3.4: Create A Source File

Create a `src/utils.ts` file with the following content:

```
export const add = (a: number, b: number) => a + b;
```

### 3.5: Create An Index File

Create a `src/index.ts` file with the following content:

```
export { add } from "./utils.js";
```

The `.js` extension will look odd. [This article](https://www.totaltypescript.com/relative-import-paths-need-explicit-file-extensions-in-ecmascript-imports) explains more.

### 3.6: Set up a `build` script

Add a `scripts` object to your `package.json` with the following content:

```
{
  "scripts": {
    "build": "tsc"
  }
}
```

This will compile your TypeScript code to JavaScript.

### 3.7: Running Your Build

Run the following command to compile your TypeScript code:

```
npm run build
```

This will create a `dist` folder with your compiled JavaScript code.

### 3.8: Add `dist` to `.gitignore`

Add the `dist` folder to your `.gitignore` file:

```
node_modules
dist
```

This will prevent your compiled code from being included in your git repository.

### 3.9: Set up a `ci` script

Add a `ci` script to your `package.json` with the following content:

```
{
  "scripts": {
    "ci": "npm run build"
  }
}
```

This gives us a quick shortcut for running all required operations on CI.

In this section, we'll install Prettier, set up a `.prettierrc`, set up a `format` script, run the `format` script, set up a `check-format` script, add the `check-format` script to our `CI` script, and run the `CI` script.

Prettier is a code formatter that automatically formats your code to a consistent style. This makes your code easier to read and maintain.

### 4.1: Install Prettier

Run the following command to install Prettier:

```
npm install --save-dev prettier
```

### 4.2: Set up a `.prettierrc`

Create a `.prettierrc` file with the following content:

```
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

You can add more options to this file to customize Prettier's behavior. You can find a full list of options [here](https://prettier.io/docs/en/options.html).

### 4.3: Set up a `format` script

Add a `format` script to your `package.json` with the following content:

```
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

This will format all files in your project using Prettier.

### 4.4: Run the `format` script

Run the following command to format all files in your project:

```
npm run format
```

You might notice some files change. Commit them with:

```
git add .
git commit -m "Format code with Prettier"
```

### 4.5: Set up a `check-format` script

Add a `check-format` script to your `package.json` with the following content:

```
{
  "scripts": {
    "check-format": "prettier --check ."
  }
}
```

This will check if all files in your project are formatted correctly.

### 4.6: Adding to our `CI` script

Add the `check-format` script to your `ci` script in your `package.json`:

```
{
  "scripts": {
    "ci": "npm run build && npm run check-format"
  }
}
```

This will run the `check-format` script as part of your CI process.

In this section, we'll install `vitest`, create a test, set up a `test` script, run the `test` script, set up a `dev` script, and add the `test` script to our `CI` script.

`vitest` is a modern test runner for ESM and TypeScript. It's like Jest, but better.

### 5.1: Install `vitest`

Run the following command to install `vitest`:

```
npm install --save-dev vitest
```

### 5.2: Create a test

Create a `src/utils.test.ts` file with the following content:

```
import { add } from "./utils.js";
import { test, expect } from "vitest";

test("add", () => {
  expect(add(1, 2)).toBe(3);
});
```

This is a simple test that checks if the `add` function returns the correct value.

### 5.3: Set up `test` script

Add a `test` script to your `package.json` with the following content:

```
{
  "scripts": {
    "test": "vitest run"
  }
}
```

`vitest run` runs all tests in your project once, without watching.

### 5.4: Run the `test` script

Run the following command to run your tests:

```
npm run test
```

You should see the following output:

```
 ✓ src/utils.test.ts (1)
   ✓ add

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

This indicates that your test passed successfully.

### 5.5: Set up `dev` script

A common workflow is to run your tests in watch mode while developing. Add a `dev` script to your `package.json` with the following content:

```
{
  "scripts": {
    "dev": "vitest"
  }
}
```

This will run your tests in watch mode.

### 5.6: Adding to our `CI` script

Add the `test` script to your `ci` script in your `package.json`:

```
{
  "scripts": {
    "ci": "npm run build && npm run check-format && npm run test"
  }
}
```

In this section, we'll create a GitHub Actions workflow that runs our CI process on every commit and pull request.

This is a crucial step in ensuring that our package is always in a working state.

### 6.1: Creating our workflow

Create a `.github/workflows/ci.yml` file with the following content:

```
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

This file is what GitHub uses as its instructions for running your CI process.

- `name` is the name of the workflow.
- `on` specifies when the workflow should run. In this case, it runs on pull requests and pushes to the `main` branch.
- `concurrency` prevents multiple instances of the workflow from running at the same time, using `cancel-in-progress` to cancel any existing runs.
- `jobs` is a set of jobs to run. In this case, we have one job called `ci`.
- `actions/checkout@v4` checks out the code from the repository.
- `actions/setup-node@v4` sets up Node.js and npm.
- `npm install` installs the project's dependencies.
- `npm run ci` runs the project's CI script.

If any part of our CI process fails, the workflow will fail and GitHub will let us know by showing a red cross next to our commit.

### 6.2: Testing our workflow

Push your changes to GitHub and check the Actions tab in your repository. You should see your workflow running.

This will give us a warning on every commit made, and every PR made to the repository.

In this section, we'll install `@changesets/cli`, initialize Changesets, make changeset releases public, set `commit` to `true`, set up a `local-release` script, add a changeset, commit your changes, run the `local-release` script, and finally see your package on npm.

Changesets is a tool that helps you version and publish your package. It's an incredible tool that I recommend to anyone publishing packages to npm.

### 7.1: Install `@changesets/cli`

Run the following command to initialise Changesets:

```
npm install --save-dev @changesets/cli
```

### 7.2: Initialize Changesets

Run the following command to initialize Changesets:

```
npx changeset init
```

This will create a `.changeset` folder in your project, containing a `config.json` file. This is also where your changesets will live.

### 7.3: Make changeset releases public

In `.changeset/config.json`, change the `access` field to `public`:

```
// .changeset/config.json
{
  "access": "public"
}
```

Without changing this field, `changesets` won't publish your package to npm.

### 7.4: Set `commit` to `true`:

In `.changeset/config.json`, change the `commit` field to `true`:

```
// .changeset/config.json
{
  "commit": true
}
```

This will commit the changeset to your repository after versioning.

### 7.5: Set up a `local-release` script

Add a `local-release` script to your `package.json` with the following content:

```
{
  "scripts": {
    "local-release": "changeset version && changeset publish"
  }
}
```

This script will run your CI process and then publish your package to npm. This will be the command you run when you want to release a new version of your package from your local machine.

### 7.6 Run CI in `prepublishOnly`

Add a `prepublishOnly` script to your `package.json` with the following content:

```
{
  "scripts": {
    "prepublishOnly": "npm run ci"
  }
}
```

This will automatically run your CI process before publishing your package to npm.

This is useful to separate from the `local-release` script in case a user accidentally runs `npm publish` without running `local-release`. Thanks to [Jordan Harband](https://x.com/ljharb) for the suggestion!

### 7.7: Add a changeset

Run the following command to add a changeset:

```
npx changeset
```

This will open an interactive prompt where you can add a changeset. Changesets are a way to group changes together and give them a version number.

Mark this release as a `patch` release, and give it a description like "Initial release".

This will create a new file in the `.changeset` folder with the changeset.

### 7.8: Commit your changes

Commit your changes to your repository:

```
git add .
git commit -m "Prepare for initial release"
```

### 7.9: Run the `local-release` script

Run the following command to release your package:

```
npm run local-release
```

This will run your CI process, version your package, and publish it to npm.

It will have created a `CHANGELOG.md` file in your repository, detailing the changes in this release. This will be updated each time you release.

### 7.10: See your package on npm

Go to:

```
http://npmjs.com/package/<your package name>
```

You should see your package there! You've done it! You've published to npm!

You now have a fully set up package. You've set up:

- A TypeScript project with the latest settings
- Prettier, which both formats your code and checks that it's formatted correctly
- `vitest`, which runs your tests
- GitHub Actions, which runs your CI process
- Changesets, which versions and publishes your package

For further reading, I'd recommend setting up the [Changesets GitHub action](https://github.com/changesets/action) and [PR bot](https://github.com/changesets/bot) to automatically recommend contributors add changesets to their PR's. They are both phenomenal.

And if you've got any more questions, let me know!
