import './LabelBadge.css';

interface LabelBadgeProps {
  text: string;
}

const LabelBadge = ({ text }: LabelBadgeProps) => {
  return <div className="label-badge">{text}</div>;
};

export default LabelBadge;
