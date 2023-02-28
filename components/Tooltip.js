import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = {
  fontFamily: "IBM Plex Mono, monospace",
  borderRadius: "md", // add a border radius
  fontWeight: "normal", // change the font weight
  borderRadius: "4px",
  background: "rgba(0,0,0,0.9)", // add a border
};

export const tooltipTheme = defineStyleConfig({ baseStyle });
