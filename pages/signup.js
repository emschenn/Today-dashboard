import { useEffect, useState } from "react";
import Head from "next/head";

import Login from "../components/Login";
import ProfileInfo from "../components/ProfileInfo";

export default function SignUpPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState();

  return (
    <>
      <Head>
        <title>User Sign Up</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
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
