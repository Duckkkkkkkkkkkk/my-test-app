import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotoModal({ imageId, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!imageId) return;

    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `http://test-backend.itdelta.agency/api/image/${imageId}`
        );
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
      await axios.post(
        `http://test-backend.itdelta.agency/api/image/${imageId}/comments`,
        { comment },
        { headers: { "Content-Type": "application/json" } }
      );

      const newComment = {
        id: photo.comments.length + 1,
        author: "Гость (Вы)",
        text: comment,
      };

      setPhoto((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));

      setComment("");
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    }
  };

  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button className="absolute top-4 right-4 text-gray-600 text-дп p-0 bg-transparent border-none leading-none hover:text-black" onClick={onClose}>
          ✕ 
        </button>

        <img
          src={photo.largeImage}
          alt={`Photo ${photo.id}`}
          className="mx-auto w-64 aspect-square object-cover rounded-2xl mb-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
        />

        <form onSubmit={handleSubmit} className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=""
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={3}
          />
          <p className="text-gray-500 text-sm">
            Write a few sentences about the photo.
          </p>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" mt-4 bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-[7px] px-[19px] rounded-lg transition"
            >
              Save
            </button>
          </div>
        </form>

        {/* список комментариев */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Comments</h3>
          {photo.comments?.length > 0 ? (
            <div className="space-y-2">
              {photo.comments.map((c) => (
                <div key={c.id} className="text-gray-800">
                  <span className="font-semibold">{c.author}:</span>{" "}
                  {c.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">Комментариев нет</div>
          )}
        </div>
      </div>
    </div>
  );
}
