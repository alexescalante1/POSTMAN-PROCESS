import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

export const LogoDashBoard = () => {
    return (
      <>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          COHESION APP
        </Typography>
      </>
    );
  };