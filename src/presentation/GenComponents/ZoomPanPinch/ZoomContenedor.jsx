import * as React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

export function ZoomContenedor({
  children,
  initScale,
  initPositionX,
  initPositionY,
}) {
  return (
    <TransformWrapper
      initialScale={initScale}
      initialPositionX={initPositionX}
      initialPositionY={initPositionY}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <div
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            // backgroundColor: "red",
          }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              aria-label="menos"
              onClick={() => zoomOut()}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="mas"
              onClick={() => zoomIn()}
            >
              <AddIcon />
            </IconButton>

            <IconButton
              color="primary"
              aria-label="default"
              onClick={() => resetTransform()}
            >
              <ClearIcon />
            </IconButton>
          </Stack>
          <TransformComponent>
            <div
              style={{
                minWidth: "100vw",
                minHeight: "100vh",
              }}
            >
              {children}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
}

/* 

======================================================================
======================================================================
EXAMPLE
======================================================================
======================================================================

<ZoomContenedor initScale={1} initPositionX={0} initPositionY={0}>
  <div className={DesingMicroServices.DivContent}>
    <Line startX={745} startY={211} endX={225} endY={225} />
    <Rectangle
      initialX={50}
      initialY={50}
      texto={
        "Título nuemro dsa sadasdas dasdasd asdadadada sdasds adaasdsads dasdsadasdasda ssdasdasda sdasd adasdasdasdas sa d as d as d as d as d a sd a sd a ds asdas d as d as d as d as d sa d as d as d a sd a sd"
      }
    />
    <Rectangle initialX={200} initialY={200} texto={"HOLA"} />
  </div>
</ZoomContenedor> 

*/
