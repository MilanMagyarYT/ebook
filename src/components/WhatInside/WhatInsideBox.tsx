import './WhatInsideBox.css';

interface WhatInsideBoxProps {
  number: number;
  imageSrc: string;
  title: string;
  description: string;
  iconSizeClass: string; // NEW prop
}

export default function WhatInsideBox({ number, imageSrc, title, description, iconSizeClass }: WhatInsideBoxProps) {
  return (
    <div className="whatinside-box">
      <div className="box-number">{number}</div>
      <div className="box-icon-wrapper">
        <img src={imageSrc} alt={title} className={`box-icon ${iconSizeClass}`} />
      </div>
      <h3 className="box-title">{title}</h3>
      <p className="box-description">{description}</p>
    </div>
  );
}
