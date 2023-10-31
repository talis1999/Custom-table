import { Column } from "./columns";

export const generateSelectedColumns = (columns: Column[] = []): string[] =>
  columns.map((column) => column.id);
