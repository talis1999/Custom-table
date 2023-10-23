import React from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { getPage, selectPagesLength } from "../../features/data/data";

const PageIndexControl: React.FC = () => {
  const currentPage = useAppSelector(getPage);
  const currentPagesLength = useAppSelector(selectPagesLength);

  return <Box>{`Page ${currentPage} of ${currentPagesLength}`}</Box>;
};

export default PageIndexControl;
