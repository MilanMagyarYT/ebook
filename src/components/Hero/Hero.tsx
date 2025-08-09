import LabelBadge from './LabelBadge';
import ImageBox from './ImageBox';
import CTAButton from './CTAButton';
import InfoBox from './InfoBox';
import Logo from '../../assets/logo.png';
import './Hero.css';
import { useEffect, useState } from "react";

const useIsDesktop = (breakpoint: number = 768): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isDesktop;
};

const Hero = () => {
  const isDesktop = useIsDesktop();

  return (
    <section id="for-students" className="hero-section">
      <img src={Logo} alt="Logo" className="hero-logo" />
      <div className="label-wrapper">
        <LabelBadge text="For international & Dutch students" />
      </div>

      {isDesktop ? (
        <div className="hero-desktop-wrapper">
          <div className="hero-image-wrapper">
            <ImageBox />
          </div>
          <div className="hero-content-wrapper">
            <h2 className="hero-subtitle">Find your next home in <br /> under 30 days</h2>
            <p className="hero-description">
              A step-by-step e-book showing how to get a place, even if you're starting late
            </p>
            <CTAButton />
            <div className="hero-info-wrapper">
              <InfoBox />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-content-box">
            <ImageBox />
            <h2 className="hero-subtitle">Find a home in <br />
              under 30 days</h2>
            <p className="hero-description">
              A step-by-step e-book showing how to get a place, even if you're starting late
            </p>
          </div>
          <CTAButton />
          <div className="hero-info-wrapper">
            <InfoBox />
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
