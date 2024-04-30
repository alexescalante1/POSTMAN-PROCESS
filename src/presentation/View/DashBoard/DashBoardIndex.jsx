import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AssideDashBoard } from "./AssideDashBoard";
import { LogoDashBoard } from "./LogoDashBoard";
import { SearchDashBoard } from "./SearchDashBoard";
import { ContentAppDashBoard } from "./ContentAppDashBoard";
import { RightNavDashBoard } from "./RightNavDashBoard";
import { BodyBaseDashBoard } from "./BodyBaseDashBoard";

export function DashBoardIndex({ children }) {
  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <AssideDashBoard />
          <LogoDashBoard />
          <SearchDashBoard />
          {/* <ContentAppDashBoard /> */}
          <Box sx={{ flexGrow: 1 }} />
          <RightNavDashBoard />
        </Toolbar>
      </AppBar>
      <BodyBaseDashBoard>
        {children}
      </BodyBaseDashBoard>
    </>
  );
}
