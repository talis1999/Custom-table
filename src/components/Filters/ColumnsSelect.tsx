import React, { useEffect, useMemo } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Column,
  SelectedColumns,
  selectColumns,
  selectSelectedColumns,
  selectFilteredColumns,
} from "../../features/columns/columns";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const ColumnsSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentColumns = useAppSelector(selectColumns);
  const currentFilteredColumns = useAppSelector(selectFilteredColumns);
  const currentSelectedColumns = useAppSelector(selectSelectedColumns);

  const [columnIds, setColumnIds] = React.useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = React.useState<SelectedColumns>(
    {}
  );

  useEffect(() => {
    const keys: string[] = currentFilteredColumns.map((column) => column.id);
    setColumnIds(keys);
  }, [currentFilteredColumns]);

  useEffect(() => {
    setSelectedColumns(currentSelectedColumns);
  }, [currentSelectedColumns]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: keys },
    } = event;
    console.log("KEYS--", keys);
    // avoid empty array !
    if (Array.isArray(keys)) {
      const newSelectedColumns: SelectedColumns = {};
      keys.forEach((key) => {
        newSelectedColumns[key] = true;
      });
      setColumnIds(keys);
      setSelectedColumns(newSelectedColumns);
    }
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel id="column-select-label">Columns</InputLabel>
      <Select
        labelId="column-select-label"
        id="column-select"
        multiple
        value={columnIds}
        onChange={handleChange}
        input={<OutlinedInput label="Columns" />}
        renderValue={(selected) => `${selected.length} columns selected`}
        MenuProps={MenuProps}
      >
        {currentColumns.map((column) => (
          <MenuItem key={`column-select-item-${column.id}`} value={column.id}>
            <Checkbox checked={Boolean(selectedColumns[column.id])} />
            <ListItemText primary={column.title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnsSelect;
