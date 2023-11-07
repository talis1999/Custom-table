import React from "react";
import {
  Box,
  FormControl,
  TextField,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { red, green } from "@mui/material/colors";

import {
  COLUMN_DEFAULT_WIDTH,
  ColumnTypes,
} from "../../features/columns/constants";

interface EditFieldProps {
  title: string;
  type: string;
  width?: number;
  options?: string[] | number[];
}

const EditField: React.FC<EditFieldProps> = ({
  title,
  type,
  width = COLUMN_DEFAULT_WIDTH,
  options = [],
}) => {
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
          //value={searchValue}
          //onChange={handleSearch}
        />
      )}
      {type === ColumnTypes.Number && (
        <TextField
          id={`${title}-input`}
          label={`${title}`}
          size="small"
          type="number"
          //value={searchValue}
          //onChange={handleSearch}
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
          }}
          //value={searchValue}
          //onChange={handleSearch} "#00b894"
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
            //value={searchValue}
            //onChange={searchValue}
          >
            {options.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default EditField;
