import { useState } from 'react';
import './WhatInside.css';
import WhatInsideBox from './WhatInsideBox';
import houseIcon from '../../assets/houseIcon.png';
import calendarIcon from '../../assets/calendarIcon.png';
import list from '../../assets/list.png';

export default function WhatInside() {
  // 1..3 state
  const [chapterIndex, setChapterIndex] = useState<number>(1);

  // All three boxes (unchanged content)
  const boxes = [
    {
      number: 1,
      imageSrc: houseIcon,
      iconSizeClass: 'icon-big',
      title: 'The Housing Market',
      subchapters: [
        'Understanding the Housing Crisis',
        'Housing Types and Pricing',
        'Rental Contracts & Legal Aspects',
        'Financial Aspects of Renting',
        'The Searching Process',
        'The Viewings',
        'Dealing with Housing Scams',
      ],
    },
    {
      number: 2,
      imageSrc: calendarIcon,
      iconSizeClass: 'icon-small',
      title: 'The Search Process Routine',
      subchapters: [
        'The Most Common Housing Questions',
        'The Practical Guide',
        'Student Housing',
        'Renting Through Agencies',
        'Searching the Open Market',
        'How to Structure Your Daily Routine',
      ],
    },
    {
      number: 3,
      imageSrc: list,
      iconSizeClass: 'icon-mid',
      title: 'The 30 Day Strategy',
      subchapters: [
        'Set Your Area & Budget',
        'Register on Platforms',
        'Join Facebook Groups',
        'Daily Routine',
        'At the Viewing',
      ],
    },
  ];

  // Compute active box (1-based -> 0-based)
  const active = boxes[(chapterIndex - 1 + boxes.length) % boxes.length];

  // Next: 1 -> 2 -> 3 -> 1
  const goNext = () =>
    setChapterIndex((prev) => (prev >= 3 ? 1 : prev + 1));

  return (
    <section id="what-inside" className="whatinside-section">
      <div className="whatinside-label-wrapper">
        <div className="whatinside-label-badge">What’s inside</div>
      </div>

      <h2 className="whatinside-title">How will you get this done</h2>
      <p className="whatinside-subtitle">
        The complete breakdown of what you’ll learn inside the ebook
      </p>

      {/* Single active box */}
      <div className="whatinside-single">
        <WhatInsideBox
          key={active.number}
          number={active.number}
          imageSrc={active.imageSrc}
          iconSizeClass={active.iconSizeClass}
          title={active.title}
          subchapters={active.subchapters}
        />

        {/* Controls */}
        <div className="whatinside-controls">
          <button type="button" className="next-chapter-btn" onClick={goNext}>
            Next chapter <span className="arrow">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
