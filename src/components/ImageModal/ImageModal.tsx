import Modal from "react-modal";
import styles from "./ImageModal.module.css";

interface Image {
  urls: { regular: string };
  alt_description: string;
}

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={styles.modal}>
      {image && <img className={styles.img} src={image.urls.regular} alt={image.alt_description} />}
    </Modal>
  );
};

export default ImageModal;
