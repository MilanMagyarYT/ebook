import './YourJourneyBox.css';

interface YourJourneyBoxProps {
  number: number;
  imageSrc: string;
  title: string;
  description: string;
  imageWidth?: string;
  imageHeight?: string;
  customClassName?: string;
  imageMarginTop?: string;
  imageMarginBottom?: string;
}

export default function YourJourneyBox({
  number,
  imageSrc,
  title,
  description,
  imageWidth,
  imageHeight,
  imageMarginTop,
  imageMarginBottom
}: YourJourneyBoxProps) {
  return (
    <div className="yourjourney-box">
      <div className="box-number">{number}</div>
      <img
        src={imageSrc}
        alt={title}
        className="boxJourney-icon"
        style={{ width: imageWidth, height: imageHeight, marginTop: imageMarginTop, marginBottom: imageMarginBottom}}
      />
      <h3 className="box-title">{title}</h3>
      <p className="box-description">{description}</p>
    </div>
  );
}
