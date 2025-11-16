import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import path from "path";
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"), // 源码路径
  //     "@yx": path.resolve(__dirname, "./packages"), // 组件库路径
  //   },
  //   extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 让所有组件样式能共享全局变量、mixin
  //       additionalData: `@use "@yx/theme-chalk/src/mixins/config.scss" as *;`,
  //     },
  //   },
  // },
  // build: {
  //   target: "modules",
  //   outDir: "dist",
  //   minify: true,
  //   rollupOptions: {
  //     input: path.resolve(__dirname, "packages/index.ts"),
  //     output: [
  //       {
  //         format: "es",
  //         dir: "dist/es",
  //         entryFileNames: "[name].js",
  //         preserveModules: true,
  //         exports: "named",
  //       },
  //       {
  //         format: "cjs",
  //         dir: "dist/lib",
  //         entryFileNames: "[name].js",
  //         preserveModules: true,
  //         exports: "named",
  //       },
  //     ],
  //     external: ["vue"], // 不打包 Vue
  //   },
  //   lib: {
  //     entry: path.resolve(__dirname, "packages/index.ts"),
  //     name: "YxComponents",
  //     fileName: "yx-components",
  //     formats: ["es", "cjs"],
  //   },
  // },
});
