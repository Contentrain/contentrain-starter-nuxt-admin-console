<script setup lang="ts">
import { dictionary, query, type BillingPlan, type SettingsGroup } from "#contentrain";

const copy = dictionary("ui-copy").locale("en").get();
const groups = query("settings-group").locale("en").all() as SettingsGroup[];
const plans = query("billing-plan").locale("en").all() as BillingPlan[];
</script>

<template>
  <AdminShell
    active-path="/localization"
    kicker="Localization"
    title="Dictionary-backed admin UI strings are easier to review than template literals."
    description="This view makes the string layer explicit so teams can reason about app chrome, notices, and plan naming before they ship."
  >
    <div class="content-grid">
      <section class="section-block">
        <h2>Dictionary preview</h2>
        <div class="stack">
          <article v-for="(value, key) in copy" :key="key" class="surface setting-row dictionary-row">
            <strong>{{ key }}</strong>
            <span class="muted">{{ value }}</span>
          </article>
        </div>
      </section>

      <section class="section-block">
        <h2>Settings tied to i18n</h2>
        <div class="stack">
          <article v-for="group in groups" :key="group.id" class="surface settings-card">
            <h3>{{ group.title }}</h3>
            <p class="muted">{{ group.summary }}</p>
            <div class="setting-items">
              <div v-for="item in group.items ?? []" :key="item.label" class="setting-row">
                <div>
                  <strong>{{ item.label }}</strong>
                  <p class="muted">{{ item.hint }}</p>
                </div>
                <div class="setting-value">
                  <span>{{ item.value }}</span>
                  <span v-if="item.status" class="pill">{{ item.status }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section class="section-block">
      <h2>Plan naming as product copy</h2>
      <div class="stat-grid">
        <article v-for="plan in plans" :key="plan.id" class="surface plan-card" :class="{ featured: plan.featured }">
          <div class="queue-head">
            <h3>{{ plan.name }}</h3>
            <span v-if="plan.status_badge" class="pill">{{ plan.status_badge }}</span>
          </div>
          <div class="price-block">
            <strong>{{ plan.price_label }}</strong>
            <span class="muted">{{ plan.cadence }}</span>
          </div>
          <ul class="bullet-list">
            <li v-for="feature in plan.features ?? []" :key="feature">{{ feature }}</li>
          </ul>
        </article>
      </div>
    </section>
  </AdminShell>
</template>
