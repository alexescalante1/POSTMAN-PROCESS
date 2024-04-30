import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.classList.add("hide-content");
      const requestFullScreen =
        elem.requestFullscreen ||
        elem.webkitRequestFullscreen ||
        elem.msRequestFullscreen;

      if (requestFullScreen) {
        requestFullScreen.call(elem);
        setIsFullscreen(true);
      }
    } else {
      elem.classList.remove("hide-content");
      const exitFullScreen =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;

      if (exitFullScreen) {
        exitFullScreen.call(document);
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={toggleFullScreen}
      >
        <Badge>
          {isFullscreen == true ? (
            <>
              <FullscreenExitIcon />
            </>
          ) : (
            <>
              <FullscreenIcon />
            </>
          )}
        </Badge>
      </IconButton>
    </>
  );
};
