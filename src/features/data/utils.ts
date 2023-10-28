import { Row } from "./data";

interface PaginateRowsArgs {
  rows: Row[];
  page: number;
  limit: number;
}

export const rowIncludes = (row: Row, searchQuery: string): boolean => {
  const lowerCasedSearchQuery: string = searchQuery.toLowerCase();

  return Object.keys(row).some((key) => {
    if (key === "id" || typeof row[key] === "boolean") return false;
    return row[key].toString().toLowerCase().includes(lowerCasedSearchQuery);
  });
};

export const paginateRows = ({
  rows = [],
  page = 1,
  limit = 25,
}: PaginateRowsArgs): Row[] => {
  return rows.slice((page - 1) * limit, page * limit);
};
