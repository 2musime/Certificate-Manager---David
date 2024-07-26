import React from 'react';
import "../styles/Dropdown.css"
interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  translations: {
    edit: string;
    delete: string;
  };
}

<<<<<<< HEAD
const Dropdown: React.FC<DropdownProps> = ({ onEdit, onDelete, translations }) => {
  return (
    <div className="dropdown-menu">
      <button onClick={onEdit}>{translations.edit}</button>
      <button onClick={onDelete}>{translations.delete}</button>
=======
const Dropdown: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  const handleDelete = () => {
      onDelete();
  };

  return (
    <div className="buttonDiv">
      <button onClick={onEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
>>>>>>> f67b3b1 (Feature/Task-5-KAN-55 Delete functionality is implemented well)
    </div>
  );
};

export default Dropdown;
