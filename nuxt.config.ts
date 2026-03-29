export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  alias: {
    "#contentrain": "./.contentrain/client/index.mjs",
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Nuxt Admin Console Starter",
      meta: [
        {
          name: "description",
          content: "Operator-focused Nuxt starter with Contentrain-managed UI strings, settings, and audit-heavy content.",
        },
      ],
    },
  },
});
