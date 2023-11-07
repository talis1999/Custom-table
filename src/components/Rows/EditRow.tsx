import React from "react";
import { Box, Paper } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {} from "../../features/data/data";
import { Column, selectFilteredColumns } from "../../features/columns/columns";
import { COLUMNS_PADDING_X } from "../../features/columns/constants";
import EditField from "./EditField";

interface RowProps {
  //row: RowType;
}

const EditRow: React.FC<RowProps> = ({}) => {
  const dispatch = useAppDispatch();
  const columns: Column[] = useAppSelector(selectFilteredColumns);

  return (
    <Paper
      variant="outlined"
      square
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: COLUMNS_PADDING_X,
        py: 2,
        alignItems: "center",
        color: "#252525",
        bgcolor: "#ffffff",
        borderWidth: "0px 1px",
        borderColor: "lightGray",
        position: "sticky",
        top: 0,
        zIndex: 1,
        //opacity: 0.5,
      }}
    >
      {columns.map(({ title, type, width, options }) => (
        <EditField title={title} type={type} width={width} options={options} />
      ))}
    </Paper>
  );
};

export default EditRow;
