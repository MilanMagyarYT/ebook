import { useState } from 'react';
import './DropdownList.css';

interface DropdownListProps {
  items: string[];
}

const DropdownList = ({ items }: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleText = isOpen ? "Hide chapter overview" : "Show topics covered";

  return (
    <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
        <span className="dropdown-label">{toggleText}</span>
      </button>

      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li key={index} className="dropdown-item">
              <div className="dropdown-card">{item}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
