import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function formatDate(date: Date): string {
  return format(parseISO(date.toISOString()), "dd/MM/yyyy HH:mm:ss");
}
