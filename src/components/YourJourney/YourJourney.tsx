import './YourJourney.css';
import YourJourneyLabel from './YourJourneyLabel';
import YourJourneyTitle from './YourJourneyTitle';
import YourJourneySubtitle from './YourJourneySubtitle';
import YourJourneyBox from './YourJourneyBox';

import icon1 from '../../assets/journeyBook.png';
import icon2 from '../../assets/journeyCalendar.png';
import icon3 from '../../assets/journeyHouse.png';

export default function YourJourney() {
  return (
    <section id="roadmap" className="yourjourney-section">
      <div className="yourjourney-label-wrapper">
        <YourJourneyLabel text="Your housing journey" />
      </div>
      <YourJourneyTitle text="After you get the guide" />
      <YourJourneySubtitle text="Three simple steps to go from reading to results" />

      <div className="yourjourney-box-wrapper">
        <YourJourneyBox
          number={1}
          imageSrc={icon1}
          title="Understand the Housing System"
          description="Read the first chapter to learn how Dutch housing works, lower living costs, and prepare for viewings."
          imageHeight='133px'
          imageWidth='133px'
          imageMarginTop='5px'
          imageMarginBottom='-15px'
        />
        <YourJourneyBox
          number={2}
          imageSrc={icon2}
          title="Choose Your Plan"
          description="Pick the daily strategy that fits your situation and timing. Follow our clear routines to apply smarter and stay consistent."
          imageHeight='133px'
          imageWidth='133px'
          imageMarginTop='10px'
          imageMarginBottom='-20px'
        />
        <YourJourneyBox
          number={3}
          imageSrc={icon3}
          title="Secure Your Place"
          description="Apply what you've learned, follow the routine, and get the room you want faster"
          imageHeight='245px'
          imageWidth='245px'
          imageMarginTop='-30px'
          imageMarginBottom='-85px'
        />
      </div>
    </section>
  );
}
