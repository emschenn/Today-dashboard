import Head from "next/head";
import { useEffect, useState } from "react";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function PhotosOperationCharts({ data }) {
  const [processedData, setProcessedData] = useState({});

  function preprocessPhotoData(data) {
    let childId,
      parentId,
      tmp = 0,
      tmp1 = 0;
    const { members, photos } = data;
    let precessedPhotoData = {
      upload: { parent: 0, child: 0 },
      viewed: { parent: 0, child: 0 },
      saved: { parent: 0, child: 0 },
      fromRec: { parent: 0, child: 0 },
    };
    Object.keys(members).forEach((key) => {
      if (key == "mom" || key == "dad") parentId = members[key];
      else childId = members[key];
    });
    Object.values(photos).forEach((value) => {
      const { authorId, viewCounts, isSaved, recIndex } = value;
      if (authorId == childId) {
        precessedPhotoData.upload.child++;
        if (recIndex > -1) {
          precessedPhotoData.fromRec.child++;
        }
      } else {
        precessedPhotoData.upload.parent++;
        if (recIndex > -1) {
          precessedPhotoData.fromRec.parent++;
        }
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
    console.log(tmp1, tmp);
    return precessedPhotoData;
  }

  useEffect(() => {
    if (!data) return;
    let d = preprocessPhotoData(data);
    setProcessedData(d);
  }, [data]);

  return (
    <>
      {Object.keys(processedData).length > 1 && (
        <div className="flex w-full flex-row justify-between gap-x-1 py-8">
          {Object.keys(processedData).map((i) => (
            <div className="flex flex-1 flex-col items-center  " key={i}>
              <h1 className="py-1 font-bold capitalize">{i} </h1>
              <h2 className="pb-2">
                {`Total: ${Object.values(processedData[i]).reduce(
                  (previousValue, currentValue) => previousValue + currentValue
                )}`}
              </h2>
              <Doughnut
                className="h-full w-full"
                options={{ responsive: true }}
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
    </>
  );
}
