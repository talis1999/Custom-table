import React from "react";
import { Paper, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/ListAltOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Row,
  SelectedRow,
  selectSelectedRow,
  setSelectedRow,
} from "../../features/data/data";
import { Column, selectFilteredColumns } from "../../features/columns/columns";
import { COLUMNS_PADDING_X } from "../../features/columns/constants";

const GroupRow: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns: Column[] = useAppSelector(selectFilteredColumns);
  const selectedRow: SelectedRow = useAppSelector(selectSelectedRow);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(
      setSelectedRow({ rowId: "", groupValue: "", upsertModeActive: false })
    );
  };
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: 5,
        py: 3,
        my: "2px",
        alignItems: "center",
        //backgroundColor: selectedRow.rowId === row.id ? "#8a9db1" : "#768698",
        borderWidth: 0,
        gap: 1.5,
        transition: "background-color 0.3s ease",
        ":hover": { bgcolor: "#778ba2", cursor: "pointer" },
        backgroundColor: "#66788c",
      }}
      onClick={handleClick}
    >
      <ListIcon fontSize="large" />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Group row
      </Typography>
    </Paper>
  );
};

export default GroupRow;
