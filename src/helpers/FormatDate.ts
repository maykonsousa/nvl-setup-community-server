import { format, parseISO } from "date-fns";

export default function formatDate(date: Date): string {
  return format(parseISO(date.toISOString()), "dd/MM/yyyy HH:mm:ss");
}
