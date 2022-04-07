import "../styles/globals.css";
import { useState } from "react";

import { I18nextProvider } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";

import { i18n } from "../config/i18n";
import { theme } from "../config/chakraTheme";
import { AuthContext } from "../context/AuthContext";

import "../config/firebase";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState({});

  return (
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </I18nextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
