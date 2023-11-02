import React, { useCallback, useEffect, useState } from "react";
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
import {
  stringToSortByColumn,
  getReverseOrder,
} from "../../features/columns/utils";

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

  const changeSortByColumn = useCallback(
    (columnId: string) => {
      setSortByColumn((prevState) => {
        if (prevState.columnId === columnId)
          return { ...prevState, order: getReverseOrder(prevState.order) };
        return { columnId, order: Order.Ascending };
      });
    },
    [setSortByColumn]
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
        <Column
          key={`col-${id}`}
          columnId={id}
          title={title}
          isSelected={id === sortByColumn.columnId}
          isAscending={
            sortByColumn.order === Order.Ascending ||
            id !== sortByColumn.columnId
          }
          changeSortByColumn={changeSortByColumn}
          width={width}
        />
      ))}
    </Box>
  );
};

export default Columns;
