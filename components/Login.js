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
