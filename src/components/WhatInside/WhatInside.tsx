import './WhatInside.css';
import WhatInsideBox from './WhatInsideBox';
import houseIcon from '../../assets/houseIcon.png';
import calendarIcon from '../../assets/calendarIcon.png';

export default function WhatInside() {
  return (
    <section id="what-inside" className="whatinside-section">
      <div className="whatinside-label-wrapper">
        <div className="whatinside-label-badge">What’s inside</div>
      </div>
      <h2 className="whatinside-title">How it helps you</h2>
      <p className="whatinside-subtitle">The complete breakdown of what you’ll learn inside the ebook</p>

      <div className="whatinside-box-wrapper">
        <WhatInsideBox
          number={1}
          imageSrc={houseIcon}
          iconSizeClass="icon-big"
          title="The Housing Market"
          description="Learn how the Dutch housing system works — pricing, scams, laws, contracts, and how to avoid getting scammed or overpaying."
        />

        <WhatInsideBox
          number={2}
          imageSrc={calendarIcon}
          iconSizeClass="icon-small"
          title="The Search Strategy"
          description="Find out when to start, where to search, and how to apply for housing that fits your budget and timeline — with real templates and proven strategies."
        />
      </div>
    </section>
  );
}
