interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default ImageCard;
