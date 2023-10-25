import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PrevIcon from "@mui/icons-material/ChevronLeftTwoTone";
import NextIcon from "@mui/icons-material/ChevronRightTwoTone";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getPage, selectPagesLength, setPage } from "../../features/data/data";
import useDebounce from "../../hooks/useDebounce";
import PageSelect from "./PageSelect";

const PageIndexControl: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(getPage);
  const currentPagesLength = useAppSelector(selectPagesLength);

  const [pageIndexValue, setPageIndexValue] = useState<number>(currentPage);
  const debouncedPageIndexValue = useDebounce<number>(pageIndexValue);

  // Handling dispatch after proper debounce
  useEffect(() => {
    dispatch(setPage(debouncedPageIndexValue));
  }, [debouncedPageIndexValue]);

  // Updating pageIndexValue in case of external changes to currentPage (redux state value)
  useEffect(() => {
    setPageIndexValue(currentPage);
  }, [currentPage]);

  const goPrev = () => {
    setPageIndexValue((page) => page - 1);
  };

  const goNext = () => {
    setPageIndexValue((page) => page + 1);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="previos"
        onClick={goPrev}
        disabled={pageIndexValue === 1}
      >
        <PrevIcon />
      </IconButton>
      <Typography>page</Typography>
      <PageSelect page={pageIndexValue} goToPage={setPageIndexValue} />
      <Typography>{`of ${currentPagesLength}`}</Typography>
      <IconButton
        aria-label="next"
        onClick={goNext}
        disabled={pageIndexValue === currentPagesLength}
      >
        <NextIcon />
      </IconButton>
    </Box>
  );
};

export default PageIndexControl;
