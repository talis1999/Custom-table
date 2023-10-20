import React from "react";
import { Container } from "@mui/material";

import CustomTable from "./components/CustomTable";

const App: React.FC = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <CustomTable />
    </Container>
  );
};

export default App;
