import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatDate(date: Date): string {
  return format(date, "dd/MM/yyyy HH:mm:ss", {
    locale: ptBR,
  });
}
