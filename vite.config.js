import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import babel from "@rollup/plugin-babel";
import dfxJson from "./dfx.json";

// List of all aliases for canisters
const aliases = Object.entries(dfxJson.canisters).reduce(
  (acc, [name, _value]) => {
    // Get the network name, or `local` by default.
    const networkName = process.env["DFX_NETWORK"] || "local";
    const outputRoot = path.join(
      __dirname,
      ".dfx",
      networkName,
      "canisters",
      name
    );

    return {
      ...acc,
      ["dfx-generated/" + name]: path.join(outputRoot),
    };
  },
  {}
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      ...aliases,
    },
  },
  define: {
    "process.env": {},
  },
  rollupInputOptions: {
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              corejs: 2,
              useBuiltIns: "usage",
              targets: {
                ie: "11",
              },
            },
          ],
        ],
      }),
    ],
  },
  server: {
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: "https://snjck-naaaa-aaaah-qbqia-cai.ic0.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
