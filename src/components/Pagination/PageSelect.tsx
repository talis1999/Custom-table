import React, { useMemo } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppSelector } from "../../app/hooks";
import { selectPagesLength } from "../../features/data/data";

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
    <FormControl sx={{ maxWidth: 100, px: 1 }} size="small">
      <Select
        sx={{ height: 30, position: "relative", top: 2 }}
        value={page}
        onChange={handlePageChange}
      >
        {pages.map((page) => (
          <MenuItem value={page}>{page}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PageSelect;
