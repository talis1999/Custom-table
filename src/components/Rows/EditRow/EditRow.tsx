import React, { useCallback, useEffect, useState } from "react";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getInitialState } from "../../../app/store";
import {
  FormErrors,
  SelectedRow,
  UpsertPayload,
  selectFormErrors,
  selectSelectedRow,
  selectUpsertPayload,
  setUpsertPayload,
} from "../../../features/data/data";
import {
  Column,
  selectColumns,
  selectFilteredColumns,
} from "../../../features/columns/columns";
import { COLUMNS_PADDING_X } from "../../../features/columns/constants";
import {
  getInitialUpsertPayload,
  shouldInitUpsertPayload,
} from "../../../features/data/utils";

import EditField from "./EditField";
import { StoreKeys } from "../../../utils/localStorage";

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

  const columns: Column[] = useAppSelector(selectColumns);
  const stringifiedColumns: string = JSON.stringify(columns);

  const filteredColumns: Column[] = useAppSelector(selectFilteredColumns);
  const selectedRow: SelectedRow = useAppSelector(selectSelectedRow);
  const upsertPayload: UpsertPayload = useAppSelector(selectUpsertPayload);
  const formErrors: FormErrors = useAppSelector(selectFormErrors);

  const isUpsertPayloadEmpty: boolean = isEmpty(upsertPayload);

  const [newUpsertPayload, setNewUpsertPayload] = useState<UpsertPayload>(
    getInitialState(StoreKeys.UpsertPayload)
  );
  const stringifiedNewUpsertPayload: string = JSON.stringify(newUpsertPayload);

  useEffect(() => {
    if (shouldInitUpsertPayload(selectedRow?.rowId, isUpsertPayloadEmpty))
      dispatch(setUpsertPayload(getInitialUpsertPayload(columns)));
  }, [selectedRow?.rowId, stringifiedColumns, isUpsertPayloadEmpty]);

  useEffect(() => {
    setNewUpsertPayload(upsertPayload);
  }, [upsertPayload]);

  useEffect(() => {
    dispatch(setUpsertPayload(newUpsertPayload));
  }, [stringifiedNewUpsertPayload]);

  const updateUpsertPayload = useCallback(
    (columnId: string, newValue: string | number | boolean) =>
      setNewUpsertPayload((prevState) => ({
        ...prevState,
        [columnId]: newValue,
      })),
    [setNewUpsertPayload]
  );

  if (!selectedRow?.upsertModeActive || isEmpty(newUpsertPayload)) return null;

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
          alignItems: "baseline",
          borderWidth: "0px 1px",
          borderColor: "lightGray",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {filteredColumns.map(({ id, title, type, width, options }) => (
          <EditField
            key={`edit-field-${id}`}
            columnId={id}
            title={title}
            type={type}
            value={newUpsertPayload[id]}
            updateUpsertPayload={updateUpsertPayload}
            width={width}
            options={options}
            error={formErrors[id]}
          />
        ))}
      </Paper>
    </ThemeProvider>
  );
};

export default EditRow;
