<script setup lang="ts">
type ModelField = {
  type?: string;
};

type ModelSchema = {
  domain: string;
  fields?: Record<string, ModelField>;
  id: string;
  kind: string;
};

type Group = {
  domain: string;
  models: ModelSchema[];
};

const { data } = await useFetch<{ groups: Group[] }>("/api/architecture");
</script>

<template>
  <AdminShell
    active-path="/architecture"
    kicker="Architecture"
    title="Admin surfaces get easier when the content model is readable."
    description="This page reads local Contentrain model files and groups them into the domains used by the console."
  >
    <div class="content-grid">
      <section v-for="group in data?.groups ?? []" :key="group.domain" class="section-block">
        <h2 style="text-transform: capitalize">{{ group.domain }}</h2>
        <div class="stack">
          <article v-for="model in group.models" :key="model.id" class="surface settings-card">
            <div class="queue-head">
              <h3>{{ model.id }}</h3>
              <span class="pill">{{ model.kind }}</span>
            </div>
            <div class="setting-items">
              <div v-for="(definition, fieldName) in model.fields ?? {}" :key="fieldName" class="setting-row">
                <strong>{{ fieldName }}</strong>
                <span class="muted">{{ definition.type ?? "unknown" }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </AdminShell>
</template>
