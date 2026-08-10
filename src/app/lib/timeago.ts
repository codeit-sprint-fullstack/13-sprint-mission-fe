import { format, register } from "timeago.js";
import type { TDate } from "timeago.js/lib/interface";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

export function formatAgo(date: TDate, lang = "ko"): string {
  return format(date, lang);
}
