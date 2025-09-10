export default function PhotoCard({ photo, onClick }) {
  return (
    <div className="cursor-pointer flex flex-col">
      <img
        src={photo.image}
        alt={`Photo ${photo.id}`}
        className="w-full max-h-60 h-auto rounded-lg object-cover"
        onClick={onClick}
      />
      <div className="mt-2 text-sm text-gray-600 font-medium text-left">
        ID: {photo.id}
      </div>
    </div>
  );
}
