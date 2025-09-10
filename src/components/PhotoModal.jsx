import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotoModal({ imageId, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!imageId) return;

    const fetchPhoto = async () => {
      try {
        console.log("Запрос к API фото:", imageId);
        const response = await axios.get(`http://test-backend.itdelta.agency/api/image/${imageId}`);
        console.log("Ответ с сервера:", response.data);
        setPhoto(response.data);
      } catch (error) {
        console.error("Ошибка при получении фото:", error);
      }
    };

    fetchPhoto();
  }, [imageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      console.log("Отправка комментария:", comment);
      await axios.post(
        `http://test-backend.itdelta.agency/api/image/${imageId}/comments`,
        { comment },
        { headers: { "Content-Type": "application/json" } }
      );

      const newComment = {
        id: photo.comments.length + 1,
        author: "Гость (Вы)",
        text: comment
      };

      setPhoto(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));

      setComment("");
      console.log("Комментарий добавлен локально!");
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    }
  };

  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-дп p-0 bg-transparent border-none leading-none hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={photo.largeImage} alt={`Photo ${photo.id}`} className="w-full mb-4 rounded-lg object-cover" />
        <div className="flex-1 overflow-y-auto max-h-64 mb-4 space-y-2 p-2 bg-gray-50 rounded">
          {photo.comments?.length > 0 ? photo.comments.map(c => (
            <div key={c.id} className="flex items-start gap-2 border-b pb-1">
              <div className="font-bold text-gray-700">#{c.id} {c.author}:</div>
              <div className="text-gray-800">{c.text}</div>
            </div>
          )) : <div className="text-gray-400">Комментариев нет</div>}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Добавить комментарий"
            className="flex-1 border rounded-lg bg-gray-100 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="bg-green-500 text-white px-4 rounded-lg">Отправить</button>
        </form>
      </div>
    </div>
  );
}
