import React, { useState, useEffect } from "react";
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
  selectColumns,
  selectSelectedColumns,
  setSelectedColumns,
} from "../../features/columns/columns";
import useDebounce from "../../hooks/useDebounce";
import getSelectedColumnsCounter from "../../utils/getSelectedColumnsCounter";

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

  const currentColumns: Column[] = useAppSelector(selectColumns);
  const currentSelectedColumns: string[] = useAppSelector(
    selectSelectedColumns
  );
  const stringifiedCurrentSelectedColumns: string =
    currentSelectedColumns.join(", ");

  const [columnIds, setColumnIds] = useState<string[]>([]);
  const stringifiedColumnIds: string = columnIds.join(", ");
  const selectedColumnsCounter: string = getSelectedColumnsCounter(
    columnIds.length
  );

  const debouncedStringifiedColumnIds: string =
    useDebounce<string>(stringifiedColumnIds);
  const debouncedColumnIds: string[] =
    debouncedStringifiedColumnIds.split(", ");

  useEffect(() => {
    setColumnIds(currentSelectedColumns);
  }, [stringifiedCurrentSelectedColumns]);

  useEffect(() => {
    dispatch(setSelectedColumns(debouncedColumnIds));
  }, [debouncedStringifiedColumnIds]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: keys },
    } = event;

    if (Array.isArray(keys) && Boolean(keys.length))
      setColumnIds([...keys].sort());
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
        renderValue={() => selectedColumnsCounter}
        MenuProps={MenuProps}
      >
        {currentColumns.map((column) => (
          <MenuItem key={`column-select-item-${column.id}`} value={column.id}>
            <Checkbox checked={columnIds.includes(column.id)} />
            <ListItemText primary={column.title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnsSelect;
