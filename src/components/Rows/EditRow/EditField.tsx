import React, { memo } from "react";
import {
  Box,
  FormControl,
  TextField,
  Checkbox,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { red, green } from "@mui/material/colors";

import {
  COLUMN_DEFAULT_WIDTH,
  ColumnTypes,
} from "../../../features/columns/constants";

interface EditFieldProps {
  columnId: string;
  title: string;
  type: string;
  value: string | number | boolean;
  updateUpsertPayload: (
    columnId: string,
    newValue: string | number | boolean
  ) => void;
  width?: number;
  options?: string[] | number[];
  error?: string;
}

const EditField: React.FC<EditFieldProps> = ({
  columnId,
  title,
  type,
  value,
  updateUpsertPayload,
  width = COLUMN_DEFAULT_WIDTH,
  options = [],
  error = "",
}) => {
  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUpsertPayload(columnId, event.target.value);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUpsertPayload(columnId, event.target.checked);
  };

  const handleSelect = (event: SelectChangeEvent<typeof value>) => {
    updateUpsertPayload(columnId, event.target.value);
  };

  const stringToNumber = () => {
    if (type === ColumnTypes.Number && value !== "")
      updateUpsertPayload(columnId, parseFloat(value as string));
  };

  return (
    <Box
      sx={{
        width: `${width}px`,
        px: 2,
        py: 1,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {type === ColumnTypes.String && (
        <TextField
          id={`${title}-input`}
          label={`${title}`}
          size="small"
          value={value}
          onChange={handleWrite}
          error={Boolean(error)}
          helperText={Boolean(error) && error}
        />
      )}
      {type === ColumnTypes.Number && (
        <TextField
          id={`${title}-input`}
          label={`${title}`}
          size="small"
          type="number"
          value={value}
          onChange={handleWrite}
          onBlur={stringToNumber}
          error={Boolean(error)}
          helperText={Boolean(error) && error}
        />
      )}
      {type === ColumnTypes.Boolian && (
        <Checkbox
          id={`${title}-input`}
          inputProps={{ "aria-label": `${title}` }}
          sx={{
            color: red[200],
            "&.Mui-checked": {
              color: green[400],
            },
            top: "6px",
          }}
          checked={Boolean(value)}
          onChange={handleCheck}
        />
      )}
      {type === ColumnTypes.Options && (
        <FormControl fullWidth>
          <InputLabel id={`${title}-select-label`} size="small">
            {title}
          </InputLabel>
          <Select
            labelId={`${title}-select-label`}
            id={`${title}-input`}
            label={title}
            size="small"
            value={value}
            onChange={handleSelect}
          >
            {options.map((option) => (
              <MenuItem key={`${title}-option-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default memo(EditField);
