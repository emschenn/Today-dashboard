import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function DatetimeCharts({ data }) {
  const [processedData, setProcessedData] = useState({});

  function preprocessPhotoData(data) {
    let childId, parentId;
    let preprocessData = { all: {}, parent: {}, child: {} };
    const { members, photos } = data;
    Object.keys(members).forEach((key) => {
      if (key == "mom" || key == "dad") parentId = members[key];
      else childId = members[key];
    });
    Object.values(photos).forEach((value) => {
      const { authorId, viewCounts, isSaved, recIndex, date } = value;
      const d = /2022-(\d*-\d*)/g.exec(date)[1];
      if (preprocessData.all[d]) {
        preprocessData.all[d]++;
        if (authorId == parentId) {
          preprocessData.parent[d]++;
        }
        if (authorId == childId) {
          preprocessData.child[d]++;
        }
      } else {
        preprocessData.all[d] = 1;
        if (authorId == parentId) {
          preprocessData.parent[d] = 1;
        } else {
          preprocessData.parent[d] = 0;
        }
        if (authorId == childId) {
          preprocessData.child[d] = 1;
        } else {
          preprocessData.child[d] = 0;
        }
      }
    });
    console.log(preprocessData);

    return preprocessData;
  }

  useEffect(() => {
    if (!data) return;
    let d = preprocessPhotoData(data);
    setProcessedData(d);
  }, [data]);

  return (
    <div className=" flex w-full content-center ">
      {Object.keys(processedData).length > 0 && (
        <Line
          key={"key"}
          options={options}
          data={{
            labels: Object.keys(processedData.all),
            datasets: ["all", "parent", "child"].map((key) => ({
              label: key,
              data: Object.values(processedData[key]),
              borderColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
              backgroundColor: "#ffffff",
            })),
          }}
        />
      )}
    </div>
  );
}
