import React from "react";
import { Box, IconButton, Divider } from "@mui/material";
import CompressIcon from "@mui/icons-material/CompressOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import { blue, red } from "@mui/material/colors";

const SelectedRowMenu: React.FC = () => {
  return (
    <Box
      sx={{
        border: "solid 1px lightGray",
        borderRadius: 5,
        px: 0.5,
        py: "1px",
        display: "flex",
        gap: 0.5,
      }}
    >
      <IconButton
        aria-label="group"
        onClick={() => {}}
        sx={{
          ":hover": {
            color: blue[200],
          },
        }}
      >
        <CompressIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="add"
        onClick={() => {}}
        sx={{ ":hover": { color: blue[200] } }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="edit"
        onClick={() => {}}
        sx={{ ":hover": { color: blue[200] } }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => {}}
        sx={{ ":hover": { color: blue[200] } }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Divider sx={{ my: "-1px" }} orientation="vertical" flexItem />
      <IconButton
        aria-label="cancel"
        onClick={() => {}}
        sx={{ ":hover": { color: red[300] } }}
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SelectedRowMenu;
