import React from 'react';
import "../styles/Dropdown.css";

const Dropdown: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit }) => {
  return (
    <div className="buttonDiv">
      <button onClick={onEdit}>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Dropdown;
