import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

export default function Index() {
  return (
    <>
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center first-line:overscroll-none">
        <Image src={"/favicon.png"} alt="main" width={130} height={130} />
        <Link href="/signup" passHref>
          <Button className=" mb-6 mt-4 ">Add New User </Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button>Go Dashboard</Button>
        </Link>
      </main>
    </>
  );
}
