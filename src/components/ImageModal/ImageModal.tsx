import Modal from "react-modal";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
}

interface ImageModalProps {
  image: Image;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose} ariaHideApp={false}>
      <img src={image.urls.regular} alt={image.alt_description} />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ImageModal;

