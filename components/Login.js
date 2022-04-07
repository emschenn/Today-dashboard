// import { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
// import { FormControl } from "@chakra-ui/react";
// import { getDatabase, ref, child, get } from "firebase/database";

// import { AuthContext } from "../context/AuthContext";
// import { CustomFormErrorMessage, CustomInput } from "./UI/CustomForm";
// import { CustomButton } from "./UI/CustomButton";

// export default function Login({ gotoGroupSetup }) {
//   const { t } = useTranslation();
//   const { auth, setAuth } = useContext(AuthContext);
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [account, setAccount] = useState("");
//   const [accountErrMsg, setAccountErrMsg] = useState(null);
//   const [password, setPassword] = useState("");
//   const [passwordErrMsg, setPasswordErrMsg] = useState(null);
//   const [loginErr, setLoginErr] = useState("");

//   function isAllFieldsValid() {
//     setPasswordErrMsg(null);
//     setAccountErrMsg(null);
//     if (account === "" || password === "") {
//       if (account === "") {
//         setAccountErrMsg(`${t("init.account")} ${t("init.notEmpty")}`);
//       }
//       if (password === "") {
//         setPasswordErrMsg(`${t("init.password")} ${t("init.notEmpty")}`);
//       }
//       return false;
//     } else if (password.length < 6) {
//       setPasswordErrMsg(t("init.passwordTooShort"));
//       return false;
//     }
//     return true;
//   }

//   function clearAndStartAsync() {
//     setLoading(true);
//     setLoginErr("");
//   }

//   function checkGroupData(uid) {
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `users/${uid}`))
//       .then((snapshot) => {
//         setLoading(false);
//         if (snapshot.exists() && snapshot.val().group) {
//           setAuth((auth) => ({
//             ...auth,
//             group: snapshot.val().group,
//           }));
//           router.push("main");
//         } else {
//           gotoGroupSetup();
//         }
//       })
//       .catch((err) => {
//         setLoading(false);
//         setLoginErr(err.message);
//       });
//   }

//   const onLoginClick = () => {
//     if (!isAllFieldsValid()) return;
//     clearAndStartAsync();
//     signInWithEmailAndPassword(getAuth(), `${account}@mail.com`, password)
//       .then((response) => {
//         setAuth((auth) => ({
//           ...auth,
//           user: { ...response.user },
//         }));
//         checkGroupData(response.user.uid);
//       })
//       .catch((err) => {
//         if (err.code == "auth/user-not-found") {
//           setAccountErrMsg(t("init.userNotFound"));
//         } else if (err.code == "auth/wrong-password") {
//           setPasswordErrMsg(t("init.wrongPassword"));
//         } else {
//           setLoginErr(err.code);
//         }
//         setLoading(false);
//       });
//   };

//   const onRegisterClick = () => {
//     if (!isAllFieldsValid()) return;
//     clearAndStartAsync();
//     createUserWithEmailAndPassword(getAuth(), `${account}@mail.com`, password)
//       .then((response) => {
//         setAuth((auth) => ({
//           ...auth,
//           user: { ...response.user },
//         }));
//         setLoading(false);
//         gotoGroupSetup();
//       })
//       .catch((err) => {
//         if (err.code == "auth/email-already-in-use") {
//           setAccountErrMsg(t("init.accountAlreadyExists"));
//         } else {
//           setLoginErr(err.code);
//         }
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <p className="text-secondary">{loginErr}</p>
//       <FormControl isInvalid={accountErrMsg}>
//         <CustomInput
//           isDisabled={loading}
//           type="text"
//           value={account}
//           placeholder={t("init.account")}
//           onChange={(e) => setAccount(e.target.value)}
//         ></CustomInput>
//         <CustomFormErrorMessage>{accountErrMsg}</CustomFormErrorMessage>
//       </FormControl>
//       <FormControl isInvalid={passwordErrMsg}>
//         <CustomInput
//           isDisabled={loading}
//           type="password"
//           value={password}
//           placeholder={t("init.password")}
//           onChange={(e) => setPassword(e.target.value)}
//           className=" text-white"
//         ></CustomInput>
//         <CustomFormErrorMessage>{passwordErrMsg}</CustomFormErrorMessage>
//       </FormControl>
//       <div className="flex flex-col space-y-4 pt-20">
//         <CustomButton onClick={onLoginClick}>{t("init.login")}</CustomButton>
//         <CustomButton onClick={onRegisterClick}>
//           {t("init.register")}
//         </CustomButton>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Login({ doneRegister, setUser }) {
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegisterClick = () => {
    setLoading(true);

    createUserWithEmailAndPassword(getAuth(), account, password)
      .then((userCredential) => {
        setLoading(false);
        setUser(userCredential.user);
        doneRegister();
      })
      .catch((err) => {
        setLoginErr(err.code);
        setLoading(false);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -1000 }}
        className=" flex w-60 flex-col items-center space-y-6"
      >
        {loginErr && (
          <p className="text-sm text-secondary">
            <b>ERROR: </b>
            {loginErr}
          </p>
        )}
        <div>
          <p className="pb-2 text-sm text-black opacity-50">帳號</p>
          <Input
            focusBorderColor="#0000002d"
            isDisabled={loading}
            placeholder="您的電子信箱"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          ></Input>
        </div>
        <div>
          <p className="pb-2 text-sm text-black opacity-50">密碼 </p>
          <Input
            focusBorderColor="#0000002d"
            isDisabled={loading}
            type="password"
            placeholder="六位以上密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <div className="pt-8">
          <Button isDisabled={loading} onClick={onRegisterClick}>
            註冊
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
