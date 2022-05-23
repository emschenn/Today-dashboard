import "../styles/globals.css";
import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../config/chakraTheme";
import { AuthContext } from "../context/AuthContext";

import "../config/firebase";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState({});

  return (
    <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
