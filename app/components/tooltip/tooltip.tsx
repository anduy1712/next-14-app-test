import { Tooltip as MUITooltip } from "@mui/material";
import React from "react";
import { TooltipProps, TooltipVariants } from "./types";

const styles: Record<TooltipVariants, { arrow: string; tooltip: string }> = {
  default: {
    arrow: "text-[#FFB800]",
    tooltip: "bg-[#FFB800] text-black p-[12px] rounded-[12px]",
  },
};

const Tooltip = ({
  variants = "default",
  children,
  title,
  showIconClose = false,
  onClose,
  ...restProps
}: TooltipProps) => {
  const Content = (
    <div className="flex items-start gap-2">
      <span className="flex-1">{title}</span>
      {onClose && (
        <button className="w-[16px] hover:cursor-pointer" onClick={onClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.53009 3.46967C4.23719 3.17678 3.76232 3.17678 3.46943 3.46967C3.17653 3.76256 3.17653 4.23744 3.46943 4.53033L6.93917 8.00008L3.46957 11.4697C3.17667 11.7626 3.17667 12.2375 3.46957 12.5303C3.76246 12.8232 4.23733 12.8232 4.53023 12.5303L7.99983 9.06074L11.4694 12.5303C11.7623 12.8232 12.2372 12.8232 12.5301 12.5303C12.823 12.2374 12.823 11.7626 12.5301 11.4697L9.06049 8.00008L12.5302 4.53035C12.8231 4.23745 12.8231 3.76258 12.5302 3.46969C12.2373 3.17679 11.7625 3.17679 11.4696 3.46969L7.99983 6.93942L4.53009 3.46967Z"
              fill="black"
            />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <>
      <MUITooltip
        {...restProps}
        title={Content}
        slotProps={{
          arrow: { className: styles[variants].arrow },
          tooltip: { className: styles[variants].tooltip },
        }}
      >
        {children}
      </MUITooltip>
    </>
  );
};

export default Tooltip;
