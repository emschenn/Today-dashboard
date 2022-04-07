import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: "#E5B940",
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
});
