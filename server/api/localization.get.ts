import { dictionary, query } from "#contentrain";

export default defineEventHandler(() => {
  const copy = dictionary("ui-copy").locale("en").get();
  const groups = query("settings-group").locale("en").all();
  const plans = query("billing-plan").locale("en").all();

  return {
    copy,
    groups,
    plans,
  };
});
