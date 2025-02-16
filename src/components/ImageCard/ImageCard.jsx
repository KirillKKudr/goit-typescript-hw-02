import styles from "./ImageCard.module.css"

export default function ImageCard({ src, alt }) {
    return <img src={src} alt={alt} />;
  }