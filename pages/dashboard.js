import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Input, Button, Select, useToast } from "@chakra-ui/react";
import { getDatabase, ref, child, get } from "firebase/database";

import PhotosOperationCharts from "../components/PhotosOperationCharts";
import DatetimeCharts from "../components/DatetimeCharts";

export default function Dashboard() {
  const db = getDatabase();
  const [data, setData] = useState({});
  const [target, setTarget] = useState("");

  useEffect(() => {
    get(ref(db, "groups/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [db]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="m-auto flex h-screen w-1/2 flex-col  justify-center">
        <div className="grid w-60  grid-cols-2 items-center    ">
          <div> Select Target:</div>
          <Select
            focusBorderColor="#0000002d"
            placeholder="    "
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {Object.keys(data).map((k) => (
              <option value={k} key={k}>
                {k}
              </option>
            ))}
          </Select>
        </div>
        <PhotosOperationCharts data={data[target]} />
        <DatetimeCharts data={data[target]} />
      </main>
    </>
  );
}
