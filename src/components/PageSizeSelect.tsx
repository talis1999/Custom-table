import React, { useState } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const PageSizeSelect: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(25);

  const handlePageSizeChange = (event: SelectChangeEvent<number>): void => {
    setPageSize(event.target.value as number);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <Select value={pageSize} onChange={handlePageSizeChange}>
        <MenuItem value={25}>{`${25} rows`}</MenuItem>
        <MenuItem value={50}>{`${50} rows`}</MenuItem>
        <MenuItem value={100}>{`${100} rows`}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PageSizeSelect;
