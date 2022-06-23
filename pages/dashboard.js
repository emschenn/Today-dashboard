import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input, Button, Select, useToast } from "@chakra-ui/react";
import { getDatabase, ref, child, get } from "firebase/database";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const db = getDatabase();
  const [data, setData] = useState({});
  const [processedData, setProcessedData] = useState({});
  const [target, setTarget] = useState("");

  function preprocessPhotoData(data) {
    let childId, parentId;
    const { members, photos } = data;
    let precessedPhotoData = {
      upload: { parent: 0, child: 0 },
      viewed: { parent: 0, child: 0 },
      saved: { parent: 0, child: 0 },
    };
    Object.keys(members).forEach((key) => {
      if (key == "mom" || key == "dad") parentId = members[key];
      else childId = members[key];
    });
    Object.values(photos).forEach((value) => {
      const { authorId, viewCounts, isSaved } = value;
      if (authorId == childId) {
        precessedPhotoData.upload.child++;
      } else {
        precessedPhotoData.upload.parent++;
      }

      if (viewCounts) {
        const { mom, dad, daughter, son } = viewCounts;
        precessedPhotoData.viewed.parent += mom || dad || 0;
        precessedPhotoData.viewed.child += daughter || son || 0;
      }

      if (isSaved) {
        const { mom, dad, daughter, son } = isSaved;
        if (mom || dad) precessedPhotoData.saved.parent++;
        if (daughter || son) precessedPhotoData.saved.child++;
      }
    });
    console.log(precessedPhotoData);
    return precessedPhotoData;
  }

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

  useEffect(() => {
    if (target != "") {
      let d = preprocessPhotoData(data[target]);
      console.log(d["upload"]);
      setProcessedData(d);
    }
  }, [target, data]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="m-auto flex h-screen w-1/2 flex-col  justify-center first-line:overscroll-none">
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
        {Object.keys(processedData).length > 1 && (
          <div className="flex w-full flex-row gap-x-4  py-8">
            {["upload", "viewed", "saved"].map((i) => (
              <div className="flex w-60 flex-col items-center " key={i}>
                <h1 className="py-1 font-bold capitalize">{i} </h1>
                <h2 className="pb-2">
                  {`Total: ${Object.values(processedData[i]).reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue
                  )}`}
                </h2>
                <Doughnut
                  data={{
                    labels: Object.keys(processedData[i]),
                    datasets: [
                      {
                        label: "# of Votes",
                        data: Object.values(processedData[i]),
                        backgroundColor: ["#b4653d", "#d3bf3b"],
                        borderColor: Array.from(
                          {
                            length: 2,
                          },
                          () => "#ffffff"
                        ),
                        borderWidth: 2,
                      },
                    ],
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
