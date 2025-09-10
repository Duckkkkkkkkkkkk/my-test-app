import { useState, useEffect } from "react";
import axios from "axios";
import PhotoCard from "./PhotoCard";

export default function PhotoGrid({ onPhotoClick }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://test-backend.itdelta.agency/api/images");
        console.log("Ответ от сервера:", response);
        console.log("Данные:", response.data);
        setPhotos(response.data);
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => onPhotoClick(photo.id)}
        />
      ))}
    </div>
  );
}
