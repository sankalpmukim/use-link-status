# use-link-status

We have to build a simple react component library that can be used in next.js 15 onwards (next.js is going to need to be added as a peer dependency.)

The `npm-package.md` file gives instructions to create a high quality best practices npm package

We want to build a hook called useLinkStatus with the API that looks like below

```typescript
const { isPending: isPendingRoot } = useLinkStatus({ prefix: "/", root: true });
const { isPending } = useLinkStatus({ prefix: "/dashboard" });
```

### Why?

We want to create a simple reapeatable versatile utility, which can be put inside of Nav Bars or Sidebars, and show loading spinners, based on more aware state of the page. Give better UX.

### How!

#### Data Modeling

We will create a context, and export the provider component that the user of the NPM package will have to wrap their components. Inside the context, we will store one state var, `pendingPathName: null | string = null` on mount.

#### NextLink Components

We will expose a wrapper to `Link` component of Next.js. The name of the component that we export out will be called `NextLink`. Since it is a wrapper, at the type level, we will match the entire API signature of the Next.js `Link` component. We will add an additional onClick function, that will setPendingPathName to what is passed in to the Link tag's href. Therefore, until it gets rendered, `pendingPathName` will contain that pathname. We have to add logic such as using `usePathname` that sets pendingPathName back to `null` when the page load finishes/errors.

#### useLinkStatus Hook

The `useLinkStatus({ prefix: string, root: boolean })` hook will be quite simple, it will just return pendingPathName.startsWith(prefix) with edge case handling for root case.

Convert this empty repository with a few Markdowns, to a complete full fledged NPM package implementation as above.
Write down a detailed step by step plan in plan.md.
