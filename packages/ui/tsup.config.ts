import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@digitallinked/utils", "@radix-ui/react-slot", "@radix-ui/react-avatar", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-navigation-menu", "@radix-ui/react-tabs", "@radix-ui/react-toast"],
  noExternal: ["class-variance-authority", "lucide-react", "tailwind-merge"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
