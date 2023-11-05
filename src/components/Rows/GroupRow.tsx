import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import ListIcon from "@mui/icons-material/ListAltOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  SelectedRow,
  selectSelectedRow,
  setSelectedRow,
} from "../../features/data/data";
import { Column, selectFilteredColumns } from "../../features/columns/columns";

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
        transition: "background-color 0.3s ease",
        ":hover": { bgcolor: "#778ba2", cursor: "pointer" },
        backgroundColor: "#66788c",
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1.5 }}>
        <ListIcon fontSize="large" />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", position: "relative", top: "1px" }}
        >
          {`${"Name"}: ${"Alex"}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          border: "solid 2px #e6e9ea",
          borderTop: "hidden",
          borderBottom: "hidden",
          py: 1.5,
          px: 1,
          mx: 4,
          borderRadius: "8px",
          fontWeight: "bold",
          width: "80px",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {18}
      </Box>
    </Paper>
  );
};

export default GroupRow;
