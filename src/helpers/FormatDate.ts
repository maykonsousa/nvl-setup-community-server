import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatDate(date: Date): string {
  //remove 3 hours from date
  date.setHours(date.getHours() - 3);
  return format(date, "dd/MM/yyyy HH:mm:ss", {
    locale: ptBR,
  });
}
