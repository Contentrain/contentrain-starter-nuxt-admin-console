import { query } from "#contentrain";

export default defineEventHandler(() => {
  const notices = query("ops-notice").locale("en").all();
  const queue = query("work-queue-item").locale("en").all();
  const events = query("audit-event").locale("en").sort("timestamp", "desc").all();

  return {
    events,
    notices,
    queue,
  };
});
