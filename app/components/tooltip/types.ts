import { TooltipProps as MUITooltipProps } from "@mui/material";

export type TooltipVariants = "default";
export type TooltipProps = MUITooltipProps & {
  variants?: TooltipVariants;
  children: JSX.Element;
  open?: boolean;
  showIconClose?: boolean;
  onClose?: () => void;
};
