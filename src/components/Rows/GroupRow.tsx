import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import ListIcon from "@mui/icons-material/ListAltOutlined";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  GroupRow as GroupRowType,
  SelectedRow,
  selectSelectedRow,
  setSelectedRow,
} from "../../features/data/data";

interface GroupRowProps {
  row: GroupRowType;
}

const GroupRow: React.FC<GroupRowProps> = ({ row }) => {
  const dispatch = useAppDispatch();
  const selectedRow: SelectedRow = useAppSelector(selectSelectedRow);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("ROW_VALUE--", row.value);
    dispatch(
      setSelectedRow({
        rowId: "",
        groupValue: row.value,
        upsertModeActive: false,
      })
    );
  };

  return (
    <Paper
      variant="outlined"
      square
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        pl: 5,
        py: 3,
        my: "2px",
        alignItems: "center",
        backgroundColor:
          selectedRow.groupValue === row.value ? "#778ba2" : "#66788c",
        borderWidth: 0,
        transition: "background-color 0.3s ease",
        ":hover": { bgcolor: "#778ba2", cursor: "pointer" },
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1.5 }}>
        <ListIcon fontSize="large" />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", position: "relative", top: "1px" }}
        >
          {`${row.columnTitle}: ${row.value}`}
        </Typography>
      </Box>
      <Divider sx={{ my: -3 }} orientation="vertical" flexItem />
      <Box
        sx={{
          display: "flex",
          py: 1.5,
          px: 1,
          fontWeight: "bold",
          width: "150px",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {row.rowsCount}
      </Box>
    </Paper>
  );
};

export default GroupRow;
