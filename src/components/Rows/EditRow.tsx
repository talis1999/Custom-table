import React from "react";
import { Paper, ThemeProvider, createTheme } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SelectedRow, selectSelectedRow } from "../../features/data/data";
import { Column, selectFilteredColumns } from "../../features/columns/columns";
import { COLUMNS_PADDING_X } from "../../features/columns/constants";
import EditField from "./EditField";

const theme = createTheme({
  palette: {
    background: {
      paper: "#ffffff",
    },
    text: {
      primary: "#252525",
    },
  },
});

const EditRow: React.FC = () => {
  const dispatch = useAppDispatch();

  const columns: Column[] = useAppSelector(selectFilteredColumns);
  const selectedRow: SelectedRow = useAppSelector(selectSelectedRow);

  if (!selectedRow?.upsertModeActive) return null;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        variant="outlined"
        square
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          px: COLUMNS_PADDING_X,
          pt: 0.5,
          pb: 0.75,
          alignItems: "center",
          borderWidth: "0px 1px",
          borderColor: "lightGray",
          position: "sticky",
          top: 0,
          zIndex: 1,
          // opacity: 0.8,
        }}
      >
        {columns.map(({ title, type, width, options }) => (
          <EditField
            title={title}
            type={type}
            width={width}
            options={options}
          />
        ))}
      </Paper>
    </ThemeProvider>
  );
};

export default EditRow;
