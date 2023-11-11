import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchRounded";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getInitialState } from "../../app/store";
import { getSearchQuery, setSearchQuery } from "../../features/data/data";
import useDebounce from "../../hooks/useDebounce";
import { StoreKeys } from "../../utils/localStorage";

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentSearchQuery: string = useAppSelector(getSearchQuery);
  const [searchValue, setSearchValue] = useState<string>(
    getInitialState(StoreKeys.SearchValue)
  );
  const debouncedSearchValue: string = useDebounce<string>(searchValue);

  useEffect(() => {
    setSearchValue(currentSearchQuery);
  }, [currentSearchQuery]);

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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" variant="outlined">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
