import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Select, useToast } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { getDatabase, ref, child, update, set } from "firebase/database";

export default function ProfileInfo({ user }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
      age,
      name,
      identity,
      notifyWhenViewCountsEqual: 1,
      enableViewedNotify: true,
      latestTimestamp: Date.now() / 1000 | 0,
      email: user.email,
    })
      .then(() => {
        var member = {};
        member[identity] = user.uid;
        update(ref(db, `groups/${group}/members`), member)
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
         <div className="w-52">
          <p className="pb-2 text-sm text-black opacity-50">年紀 </p>
          <Select
            isDisabled={loading}
            focusBorderColor="#0000002d"
            placeholder="    "
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="16-20">16-20</option>
            <option value="21-25">21-25</option>
            <option value="26-30">26-30</option>
            <option value="31-35">31-35</option>
            <option value="36-40">36-40</option>
            <option value="41-45">41-45</option>
            <option value="46-50">46-50</option>
            <option value="51-55">51-55</option>
            <option value="56-60">56-60</option>
            <option value="61-65">61-65</option>
            <option value="66-70">66-70</option>
          </Select>
        </div>
        <div className="w-52">
          <p className="pb-2 text-sm text-black opacity-50">身份 </p>
          <Select
            isDisabled={loading}
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
            isDisabled={loading}
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
