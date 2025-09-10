import { useState } from "react";
import PhotoGrid from "./components/PhotoGrid";
import PhotoModal from "./components/PhotoModal";
import Profile from "./components/Profile";

function App() {
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  return (
<div className="min-h-screen min-w-screen bg-[#f5f5f5] overflow-x-hidden">
      <Profile />
      <div className="mt-16 px-4 md:px-8">
        <PhotoGrid onPhotoClick={setSelectedPhotoId} />
      </div>
      {selectedPhotoId && (
        <PhotoModal imageId={selectedPhotoId} onClose={() => setSelectedPhotoId(null)} />
      )}
    </div>
  );
}

export default App;
