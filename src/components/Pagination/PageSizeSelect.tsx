import React, { useEffect, useState } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getLimit, setLimit } from "../../features/data/data";

import { PAGE_SIZES } from "../../constants/constants";

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 80,
    },
  },
};

const PageSizeSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentLimit: number = useAppSelector(getLimit);
  const [pageSize, setPageSize] = useState<number>(25);

  useEffect(() => {
    setPageSize(currentLimit);
  }, [currentLimit]);

  useEffect(() => {
    dispatch(setLimit(pageSize));
  }, [pageSize]);

  const handlePageSizeChange = (event: SelectChangeEvent<number>): void => {
    setPageSize(event.target.value as number);
  };

  return (
    <FormControl sx={{ my: 1, maxWidth: 150 }} size="small">
      <Select
        MenuProps={MenuProps}
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        {PAGE_SIZES.map((pageSize) => (
          <MenuItem value={pageSize}>{`${pageSize} rows`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PageSizeSelect;
