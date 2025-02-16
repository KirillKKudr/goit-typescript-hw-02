import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css"

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.list}>
      {images.map((img) => (
        <li className={styles.list_item} key={img.id} onClick={() => onImageClick(img)}>
          <ImageCard src={img.urls.small} alt={img.alt_description} />
        </li>
      ))}
    </ul>
  );
}
