import React, { useEffect, useState } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getLimit, setLimit } from "../../features/data/data";

import { PAGE_SIZES } from "../../constants/constants";

const PageSizeSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentLimit: number = useAppSelector(getLimit);
  const [pageSize, setPageSize] = useState<number>(currentLimit);

  useEffect(() => {
    dispatch(setLimit(pageSize));
  }, [pageSize]);

  const handlePageSizeChange = (event: SelectChangeEvent<number>): void => {
    setPageSize(event.target.value as number);
  };

  return (
    <FormControl sx={{ my: 1, minWidth: 100 }} size="small">
      <Select value={pageSize} onChange={handlePageSizeChange}>
        {PAGE_SIZES.map((pageSize) => (
          <MenuItem value={pageSize}>{`${pageSize} rows`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PageSizeSelect;
