import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: { small: string };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.list}>
      {images.map((img) => (
        <li className={styles.list_item} key={img.id} onClick={() => onImageClick(img)}>
          <ImageCard src={img.urls.small} alt={img.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
