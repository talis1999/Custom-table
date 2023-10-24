import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import PrevIcon from "@mui/icons-material/ChevronLeftTwoTone";
import NextIcon from "@mui/icons-material/ChevronRightTwoTone";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getPage, selectPagesLength, setPage } from "../../features/data/data";
import useDebounce from "../../hooks/useDebounce";

const PageIndexControl: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(getPage);
  const currentPagesLength = useAppSelector(selectPagesLength);

  const [pageIndexValue, setPageIndexValue] = useState(currentPage);
  const debouncedPageIndexValue = useDebounce(pageIndexValue);

  useEffect(() => {
    dispatch(setPage(debouncedPageIndexValue));
  }, [debouncedPageIndexValue]);

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
      <Box>{`Page ${pageIndexValue} of ${currentPagesLength}`}</Box>
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
