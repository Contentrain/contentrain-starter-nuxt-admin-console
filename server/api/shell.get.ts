import { dictionary, singleton } from "#contentrain";

export default defineEventHandler(() => {
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const copy = dictionary("ui-copy").locale("en").get();

  return {
    copy,
    footer,
    navigation,
    site,
  };
});
