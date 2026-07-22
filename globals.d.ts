// Ambient declarations for non-code side-effect imports.
//
// TypeScript 6.0 introduced TS2882, which requires a module/type declaration
// even for side-effect imports (e.g. `import "foo.css"`). Next.js handles CSS
// via its build pipeline but does not provide these type declarations, so we
// declare them here.
declare module "*.css";
