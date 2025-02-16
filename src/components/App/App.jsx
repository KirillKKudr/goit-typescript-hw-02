import  { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import axios from "axios";

const API_KEY = "6ty7wQg7-kFUoyifT_1CjnBZtguD0ytMFc4SZMWtFbk";
const BASE_URL = "https://api.unsplash.com/search/photos";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: { query, page, client_id: API_KEY },
        });
        setImages((prev) => [...prev, ...response.data.results]);
        setError(null);
      } catch (err) {
        setError("Failed to upload images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const openModal = (image) => setModalImage(image);

  const closeModal = () => setModalImage(null);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
