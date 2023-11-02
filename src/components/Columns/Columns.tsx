import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Column as ColumnType,
  SortByColumn,
  selectFilteredColumns,
  selectSortByColumn,
  Order,
  setSortByColumn as setCurrentSortByColumn,
} from "../../features/columns/columns";

import Column from "./Column";
import useDebounce from "../../hooks/useDebounce";
import { stringToSortByColumn } from "../../features/columns/utils";

const Columns: React.FC = () => {
  const dispatch = useAppDispatch();

  const columns: ColumnType[] = useAppSelector(selectFilteredColumns);
  const CurrentSortByColumn: SortByColumn = useAppSelector(selectSortByColumn);

  const [sortByColumn, setSortByColumn] = useState<SortByColumn>({
    columnId: "",
    order: Order.Ascending,
  });
  const stringifiedSortByColumn: string = `${sortByColumn.columnId}, ${sortByColumn.order}`;

  const debouncedStringifiedSortByColumn: string = useDebounce<string>(
    stringifiedSortByColumn
  );
  const debouncedSortByColumn: SortByColumn = stringToSortByColumn(
    debouncedStringifiedSortByColumn
  );

  useEffect(() => {
    setSortByColumn(CurrentSortByColumn);
  }, [CurrentSortByColumn]);

  useEffect(() => {
    dispatch(setCurrentSortByColumn(debouncedSortByColumn));
  }, [debouncedStringifiedSortByColumn]);

  return (
    <Box
      sx={{
        backgroundColor: "#66788c",
        color: "#F5F7F8",
        px: 3,
        py: 1.5,
        display: "flex",
      }}
    >
      {columns.map(({ id, title, width }) => (
        <Column key={`col-${id}`} title={title} width={width} />
      ))}
    </Box>
  );
};

export default Columns;
