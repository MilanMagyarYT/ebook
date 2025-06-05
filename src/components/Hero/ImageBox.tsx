import bookCover from "../../assets/Find.png";

const ImageBox = () => {
  return (
    <div className="book-box">
      <img
        src={bookCover}
        alt="Student Housing Guide"
        className="book-image"
      />
    </div>
  );
};

export default ImageBox;
