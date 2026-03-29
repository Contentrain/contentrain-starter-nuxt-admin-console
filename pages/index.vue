<script setup lang="ts">
import {
  query,
  singleton,
  type AuditEvent,
  type DashboardOverview,
  type DashboardStat,
  type OpsNotice,
  type SeoDefaults,
  type WorkQueueItem,
} from "#contentrain";

const overview = singleton("dashboard-overview").locale("en").get() as DashboardOverview;
const seo = singleton("seo-defaults").locale("en").get() as SeoDefaults;
const stats = query("dashboard-stat").locale("en").all() as DashboardStat[];
const queue = query("work-queue-item").locale("en").all() as WorkQueueItem[];
const notices = query("ops-notice").locale("en").all() as OpsNotice[];
const audit = query("audit-event").locale("en").sort("timestamp", "desc").limit(3).all() as AuditEvent[];

useSeoMeta({
  title: seo.meta_title,
  description: seo.meta_description,
});
</script>

<template>
  <AdminShell
    active-path="/"
    :kicker="overview.eyebrow ?? 'Overview'"
    :title="overview.title"
    :description="overview.summary"
  >
    <section class="hero-banner surface">
      <div>
        <span class="pill">{{ overview.environment_badge }}</span>
        <p class="muted">{{ overview.status_note }}</p>
      </div>
      <NuxtLink :to="overview.primary_cta_href ?? '/localization'" class="button">
        {{ overview.primary_cta_label ?? "Open localization view" }}
      </NuxtLink>
    </section>

    <section class="section-block">
      <h2>Console metrics</h2>
      <div class="stat-grid">
        <article v-for="item in stats" :key="item.id" class="surface stat-card">
          <span class="muted">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <span class="delta" :class="item.trend ?? 'steady'">{{ item.delta }}</span>
          <p class="muted">{{ item.note }}</p>
        </article>
      </div>
    </section>

    <div class="content-grid">
      <section class="section-block">
        <h2>Approval queue</h2>
        <div class="stack">
          <article v-for="item in queue" :key="item.id" class="surface queue-card">
            <div class="queue-head">
              <div>
                <h3>{{ item.title }}</h3>
                <p class="muted">{{ item.summary }}</p>
              </div>
              <span class="pill" :class="`tone-${item.status ?? 'queued'}`">{{ item.status }}</span>
            </div>
            <div class="meta-row muted">
              <span>{{ item.owner }}</span>
              <span>{{ item.due_label }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <h2>Active notices</h2>
        <div class="stack">
          <article v-for="notice in notices" :key="notice.id" class="surface notice-card">
            <div class="queue-head">
              <h3>{{ notice.title }}</h3>
              <span class="pill" :class="`tone-${notice.tone ?? 'info'}`">{{ notice.tone }}</span>
            </div>
            <p class="muted">{{ notice.body }}</p>
            <a v-if="notice.cta_href" :href="notice.cta_href" class="text-link">
              {{ notice.cta_label ?? "Open" }}
            </a>
          </article>
        </div>
      </section>
    </div>

    <section class="section-block">
      <h2>Recent audit history</h2>
      <div class="stack">
        <article v-for="event in audit" :key="event.id" class="surface audit-card">
          <div class="queue-head">
            <div>
              <h3>{{ event.title }}</h3>
              <p class="muted">{{ event.actor }} · {{ event.target }}</p>
            </div>
            <span class="pill" :class="`tone-${event.severity ?? 'info'}`">{{ event.severity }}</span>
          </div>
          <p class="muted">{{ event.summary }}</p>
          <div class="meta-row muted">
            <span>{{ event.timestamp }}</span>
          </div>
        </article>
      </div>
    </section>
  </AdminShell>
</template>
