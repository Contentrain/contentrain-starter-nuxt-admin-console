<script setup lang="ts">
import { dictionary, singleton, type Footer, type Navigation, type SiteSettings } from "#contentrain";

const props = defineProps<{
  activePath: string;
  description: string;
  kicker: string;
  title: string;
}>();

type NavigationItem = NonNullable<Navigation["items"]>[number];

const site = singleton("site-settings").locale("en").get() as SiteSettings;
const navigation = singleton("navigation").locale("en").get() as Navigation;
const footer = singleton("footer").locale("en").get() as Footer;
const copy = dictionary("ui-copy").locale("en");
const navItems = (navigation.items ?? []) as NavigationItem[];

function isActive(href: string) {
  if (href === "/") {
    return props.activePath === "/";
  }

  return props.activePath.startsWith(href);
}
</script>

<template>
  <div class="admin-app">
    <aside class="sidebar">
      <NuxtLink to="/" class="brand">{{ site.site_name }}</NuxtLink>
      <p class="sidebar-copy">{{ site.site_tagline }}</p>

      <nav class="sidebar-nav">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.href"
          class="nav-link"
          :class="{ active: isActive(item.href) }"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.emphasis" class="pill">Live</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-panel surface">
        <div class="eyebrow">{{ copy.get("surface.caption") ?? "Structured operator content" }}</div>
        <p class="muted">
          {{ copy.get("surface.note") ?? "Ideal for settings screens, warnings, workflows, and admin i18n." }}
        </p>
        <a :href="navigation.cta_href ?? 'https://docs.contentrain.io/'" class="button ghost">
          {{ navigation.cta_label ?? "Open Docs" }}
        </a>
      </div>
    </aside>

    <main class="main-panel">
      <header class="topbar">
        <div>
          <div class="eyebrow">{{ kicker }}</div>
          <h1>{{ title }}</h1>
          <p class="lead">{{ description }}</p>
        </div>
        <div class="topbar-meta">
          <span class="pill">{{ navigation.announcement_label }}</span>
          <a href="https://studio.contentrain.io/" class="text-link">Studio</a>
        </div>
      </header>

      <slot />

      <footer class="footer">
        <div class="footer-copy">
          <span>{{ footer.blurb }}</span>
          <span>{{ footer.legal_notice }}</span>
        </div>
        <div class="footer-columns">
          <section v-for="column in footer.columns ?? []" :key="column.title" class="footer-column">
            <strong>{{ column.title }}</strong>
            <div class="footer-links">
              <a v-for="link in column.links ?? []" :key="link.label" :href="link.href">
                {{ link.label }}
              </a>
            </div>
          </section>
        </div>
      </footer>
    </main>
  </div>
</template>
