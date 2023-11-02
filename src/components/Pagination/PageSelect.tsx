import React, { useMemo } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppSelector } from "../../app/hooks";
import { selectPagesLength } from "../../features/data/data";

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 70,
    },
  },
};

interface PageSelectProps {
  page: number;
  goToPage: (page: number) => void;
}

const PageSelect: React.FC<PageSelectProps> = ({ page, goToPage }) => {
  const currentPagesLength: number = useAppSelector(selectPagesLength);

  const pages = useMemo(
    () => Array.from({ length: currentPagesLength }, (_, index) => index + 1),
    [currentPagesLength]
  );

  const handlePageChange = (event: SelectChangeEvent<number>): void => {
    goToPage(event.target.value as number);
  };

  return (
    <FormControl sx={{ minWidth: 70, maxWidth: 100, px: 1 }} size="small">
      <Select
        sx={{ height: 30, position: "relative", top: 2 }}
        MenuProps={MenuProps}
        value={page}
        onChange={handlePageChange}
      >
        {pages.map((page) => (
          <MenuItem key={`page-${page}`} value={page}>
            {page}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PageSelect;
