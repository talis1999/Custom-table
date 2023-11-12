import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import {
  Row as RowType,
  GroupRow as GroupRowType,
  selectPaginatedRows,
} from "../../features/data/data";

import Row from "./Row";
import GroupRow from "./GroupRow";
import EditRow from "./EditRow/EditRow";

const Rows: React.FC = () => {
  const rows = useAppSelector(selectPaginatedRows);

  return (
    <Box
      sx={{
        height: "55vh",
        overflowY: "auto",
        backgroundColor: "#a5b1c2",
        position: "relative",
      }}
    >
      <EditRow />
      {Boolean(rows.length) &&
        rows.map((row) =>
          Boolean(row.id) ? (
            <Row key={`row-${row.id}`} row={row as RowType} />
          ) : (
            <GroupRow
              key={`group-row-${row.value}`}
              row={row as GroupRowType}
            />
          )
        )}
    </Box>
  );
};

export default Rows;
