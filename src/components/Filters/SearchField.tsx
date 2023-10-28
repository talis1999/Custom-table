import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getSearchQuery, setSearchQuery } from "../../features/data/data";
import useDebounce from "../../hooks/useDebounce";

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentSearchQuery: string = useAppSelector(getSearchQuery);
  const [searchValue, setSearchValue] = useState<string>(currentSearchQuery);
  const debouncedSearchValue: string = useDebounce<string>(searchValue);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchValue));
  }, [debouncedSearchValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value as string);
  };

  return (
    <TextField
      label="Search"
      id="search-input"
      size="small"
      value={searchValue}
      onChange={handleSearch}
    />
  );
};

export default SearchField;
