function ImageCard({ src, name, onClick, id }) {
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <figure id={id} onClick={onClick}>
      <img src={src} alt="name" />
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export default ImageCard;
