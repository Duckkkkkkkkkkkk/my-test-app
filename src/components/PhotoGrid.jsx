import { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";

export default function PhotoGrid({ onPhotoClick }) {
  const [photos, setPhotos] = useState([]);

useEffect(() => {
  fetch("http://test-backend.itdelta.agency/api/images")
    .then(res => {
      console.log("Ответ от сервера:", res);
      return res.json();
    })
    .then(data => {
      console.log("Данные после json():", data);
      setPhotos(data);
    })
    .catch(err => {
      console.error("Ошибка при запросе:", err);
    });
}, []);


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {photos.map(photo => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo.id)} />
      ))}
    </div>
  );
}
