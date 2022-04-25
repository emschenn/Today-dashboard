import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Select, useToast } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { getDatabase, ref, child, get, set } from "firebase/database";

export default function ProfileInfo({ user }) {
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [group, setGroup] = useState("");
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const db = getDatabase();

  function setUserData() {
    setLoading(true);
    set(ref(db, "users/" + user.uid), {
      group,
      line,
      name,
      identity,
      notifyWhenViewCountsEqual: 1,
      email: user.email,
    })
      .then(() => {
        toast({
          position: "top",
          duration: 2000,
          render: () => (
            <div className="w-full rounded-xl bg-[#E3DFCC] px-8 py-4 font-bold shadow-md">
              用戶設定完成 ✔
            </div>
          ),
          isClosable: true,
          onCloseComplete: () => {
            setLoading(false);
            router.reload(window.location.pathname);
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const onSubmitClick = () => {
    if (!group || !name) return;
    setUserData();
  };

  console.log(user);
  return (
    <AnimatePresence>
      <motion.div
        className=" flex w-60 flex-col items-center space-y-6"
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -1000 }}
      >
        {/* <div>
          <p className="pb-2 text-sm text-black opacity-50">電子信箱</p>
          <Input
            focusBorderColor="#0000002d"
            isReadOnly={true}
            type="text"
            value={user?.email}
          ></Input>
        </div> */}
        <div>
          <p className="pb-2 text-sm text-black opacity-50">姓名</p>
          <Input
            focusBorderColor="#0000002d"
            isDisabled={loading}
            placeholder="您的稱呼"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div>
          <p className="pb-2 text-sm text-black opacity-50">LINE </p>
          <Input
            focusBorderColor="#0000002d"
            isDisabled={loading}
            type="text"
            placeholder="電話 or ID"
            value={line}
            onChange={(e) => setLine(e.target.value)}
          ></Input>
        </div>
        <div className="w-52">
          <p className="pb-2 text-sm text-black opacity-50">身份 </p>
          <Select
            focusBorderColor="#0000002d"
            placeholder="    "
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          >
            <option value="mom">媽媽</option>
            <option value="dad">爸爸</option>
            <option value="daughter">兒子</option>
            <option value="son">女兒</option>
          </Select>
        </div>
        <div className="w-52">
          <p className="pb-2 text-sm text-black opacity-50">Group ID </p>
          <Select
            focusBorderColor="#0000002d"
            placeholder="    "
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div className="pt-8">
          <Button isDisabled={loading} onClick={onSubmitClick}>
            完成
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
