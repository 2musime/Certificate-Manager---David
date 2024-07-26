import React from 'react';
import "../styles/Dropdown.css";

const Dropdown: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  const handleDelete = () => {
      onDelete();
  };

  return (
    <div className="buttonDiv">
      <button onClick={onEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Dropdown;
