import { query, singleton } from "#contentrain";

export default defineEventHandler(() => {
  const overview = singleton("dashboard-overview").locale("en").get();
  const seo = singleton("seo-defaults").locale("en").get();
  const stats = query("dashboard-stat").locale("en").all();
  const queue = query("work-queue-item").locale("en").all();
  const notices = query("ops-notice").locale("en").all();
  const audit = query("audit-event").locale("en").sort("timestamp", "desc").limit(3).all();

  return {
    audit,
    notices,
    overview,
    queue,
    seo,
    stats,
  };
});
