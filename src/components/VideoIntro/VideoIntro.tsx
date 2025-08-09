import './VideoIntro.css';
import LabelBadge from '../Hero/LabelBadge';

const VideoIntro = () => {
  return (
    <section id="watch-first" className="video-section">
        <div className = "video-label-wrapper">
          <LabelBadge text="Watch This First" />
        </div>
        
      <h2 className="video-title">Understand how this ebook will help you</h2>
      <p className="video-subtitle">
        A quick overview of what you'll learn, how it helps, and why it works.
      </p>

      <iframe
        className="video-iframe"
        src="https://www.youtube.com/embed/ijweZXBqhG8"
        title="Overview Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default VideoIntro;