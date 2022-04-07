import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Login from "../components/Login";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";

export default function Admin() {
  const router = useRouter();

  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState();

  return (
    <>
      {/* <Header /> */}
      <main className="flex h-screen w-screen flex-col items-center  overscroll-none  ">
        <div className="flex items-center space-x-2  py-20 text-sm font-medium">
          <p
            className={`${
              !isRegistered ? "bg-primary text-white" : ""
            } rounded-full px-3 py-1`}
          >
            註冊帳戶
          </p>
          <span> → </span>
          <p
            className={`${
              isRegistered ? "bg-primary text-white" : ""
            } rounded-full px-3 py-1`}
          >
            登記個人資料
          </p>
        </div>
        {isRegistered ? (
          <ProfileInfo user={user} />
        ) : (
          <Login doneRegister={() => setIsRegistered(true)} setUser={setUser} />
        )}
      </main>
    </>
  );
}
