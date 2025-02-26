function ImageCard({ src, name, onClick }) {
  console.log("from imagecard: ", name, src);
  return (
    <div onClick={onClick}>
      <img src={src} alt="name" />
      <p>{name}</p>
    </div>
  );
}

export default ImageCard;
