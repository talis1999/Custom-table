import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrevIcon from "@mui/icons-material/ChevronLeftTwoTone";
import NextIcon from "@mui/icons-material/ChevronRightTwoTone";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getPage, selectPagesLength, setPage } from "../../features/data/data";

const PageIndexControl: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(getPage);
  const currentPagesLength = useAppSelector(selectPagesLength);

  const goPrev = () => {
    dispatch(setPage(currentPage - 1));
  };
  const goNext = () => {
    dispatch(setPage(currentPage + 1));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="previos"
        onClick={goPrev}
        disabled={currentPage === 1}
      >
        <PrevIcon />
      </IconButton>
      <Box>{`Page ${currentPage} of ${currentPagesLength}`}</Box>
      <IconButton
        aria-label="next"
        onClick={goNext}
        disabled={currentPage === currentPagesLength}
      >
        <NextIcon />
      </IconButton>
    </Box>
  );
};

export default PageIndexControl;
