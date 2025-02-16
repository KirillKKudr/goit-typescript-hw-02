import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import axios from "axios";

const API_KEY = "6ty7wQg7-kFUoyifT_1CjnBZtguD0ytMFc4SZMWtFbk";
const BASE_URL = "https://api.unsplash.com/search/photos";

interface Image {
  id: string;
  urls: { small: string; regular?: string };
  alt_description: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ results: Image[] }>(BASE_URL, {
          params: { query, page, client_id: API_KEY },
        });

        // Обновляем изображения, гарантируя наличие `regular`
        const formattedImages = response.data.results.map(img => ({
          ...img,
          urls: { small: img.urls.small, regular: img.urls.regular ?? img.urls.small }
        }));

        setImages((prev) => [...prev, ...formattedImages]);
        setError(null);
      } catch (err) {
        setError("Failed to upload images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const openModal = (image: Image) => setModalImage(image);

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
};

export default App;

