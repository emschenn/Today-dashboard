import { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Timeline from "../components/Timeline";

import { AuthContext } from "../context/AuthContext";

export default function Main() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex h-screen w-screen items-center justify-center ">
        <Timeline />
      </main>
    </>
  );
}