import Image from "next/image";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Timeline() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/photos/?client_id=GzX3FXEmZYCDT3EsEm6pBqyVRgXvNPPgw3d8SJpdsBE"
      )
      .then((response) => {
        console.log(response);
        setPhotos(response.data);
      });
  }, []);

  return (
    <div className="py-20">
      {photos?.map(({ urls, id }) => (
        <div className=" m-8" key={id}>
          <Image
            className="rounded-lg"
            src={urls.small}
            alt={id}
            width={300}
            height={200}
          />
        </div>
      ))}
      <div className="flex items-center justify-center pt-14 pb-4">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-red-700  text-center text-white">
          Share a Moment!
        </div>
      </div>
    </div>
  );
}
