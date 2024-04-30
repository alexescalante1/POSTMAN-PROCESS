import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { blueGrey } from "@mui/material/colors";

export const BodyBaseDashBoard = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? blueGrey[100] : "#022830",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};
