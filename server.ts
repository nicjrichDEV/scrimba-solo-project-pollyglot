import index from "./index.html";

Bun.serve({
  routes: { "/": index, "/api/translate": {} },
  development: {
    hmr: true,
    console: true,
  },
});
