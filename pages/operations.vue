<script setup lang="ts">
import { query, type AuditEvent, type OpsNotice, type WorkQueueItem } from "#contentrain";

const notices = query("ops-notice").locale("en").all() as OpsNotice[];
const queue = query("work-queue-item").locale("en").all() as WorkQueueItem[];
const events = query("audit-event").locale("en").sort("timestamp", "desc").all() as AuditEvent[];
</script>

<template>
  <AdminShell
    active-path="/operations"
    kicker="Operations"
    title="Operational copy should move as fast as the workflows it describes."
    description="Warnings, approval steps, and admin guidance change too often to live inside deploy-only Vue strings."
  >
    <div class="content-grid">
      <section class="section-block">
        <h2>Notices</h2>
        <div class="stack">
          <article v-for="notice in notices" :key="notice.id" class="surface notice-card">
            <div class="queue-head">
              <h3>{{ notice.title }}</h3>
              <span class="pill" :class="`tone-${notice.tone ?? 'info'}`">{{ notice.tone }}</span>
            </div>
            <p class="muted">{{ notice.body }}</p>
          </article>
        </div>
      </section>

      <section class="section-block">
        <h2>Queue</h2>
        <div class="stack">
          <article v-for="item in queue" :key="item.id" class="surface queue-card">
            <div class="queue-head">
              <h3>{{ item.title }}</h3>
              <span class="pill" :class="`tone-${item.priority ?? 'medium'}`">{{ item.priority }}</span>
            </div>
            <p class="muted">{{ item.summary }}</p>
            <div class="meta-row muted">
              <span>{{ item.owner }}</span>
              <span>{{ item.due_label }}</span>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section class="section-block">
      <h2>Audit stream</h2>
      <div class="stack">
        <article v-for="event in events" :key="event.id" class="surface audit-card">
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
