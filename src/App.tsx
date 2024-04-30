import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./Main/Config/MaterialUIConfig";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "./GlobalContext";
import RoutersApp from "./Main/Routes/Routers";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { state } = useGlobalContext();
  const [mode, setMode] = React.useState(lightTheme);
  useEffect(() => {
    setMode(state?.mode === "light" ? lightTheme : darkTheme);
  }, [state]);

  return (
    <>
      <ThemeProvider theme={mode}>
      {/* <ThemeProvider theme={lightTheme}> */}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <BrowserRouter>
            <RoutersApp />
          </BrowserRouter>
          <ToastContainer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
