import './WhatInsideBox.css';
import DropdownList from './DropdownList';

interface WhatInsideBoxProps {
  number: number;
  imageSrc: string;
  title: string;
  subchapters: string[];
  iconSizeClass: string;
}

export default function WhatInsideBox({
  number,
  imageSrc,
  title,
  subchapters,
  iconSizeClass,
}: WhatInsideBoxProps) {
  return (
    <div className="whatinside-box">
      <div className="box-number">{number}</div>
      <div className="box-icon-wrapper">
        <img src={imageSrc} alt={title} className={`box-icon ${iconSizeClass}`} />
      </div>
      <h3 className="box-title">{title}</h3>
      <DropdownList items={subchapters} />
    </div>
  );
}
