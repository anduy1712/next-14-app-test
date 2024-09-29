"use client";

import { Tooltip as MUITooltip } from "@mui/material";
import React from "react";
import Tooltip from "../tooltip/tooltip";

const Popper = () => {
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);
  return (
    <div className="App">
      <Tooltip
        open={tooltipIsOpen}
        title={
          <p className="text-sm leading-5">
            Your account now has{" "}
            <span className="font-bold">premium privilege</span>. Enjoy enhanced
            features!
          </p>
        }
        showIconClose
        disableHoverListener
        arrow
        placement="top"
        onClose={() => setTooltipIsOpen(false)}
      >
        <span>Hover over me or click the button</span>
      </Tooltip>
    </div>
  );
};

export default Popper;
