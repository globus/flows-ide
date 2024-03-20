import { extendTheme } from "@chakra-ui/react";
/**
 * The Globus brand color palette.
 */
const BRAND_PALETTE = {
  100: "#f5f9fd",
  200: "#cddaeb",
  300: "#94c9fb",
  400: "#1e70b9",
  500: "#335b96",
  600: "#244b8b",
  700: "#214277",
  800: "#273866",
  900: "#273866",
};

const theme = extendTheme({
  colors: {
    brand: BRAND_PALETTE,
    blue: BRAND_PALETTE,
  },
});

export default theme;
