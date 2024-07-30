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

const Dropdown: React.FC<DropdownProps> = ({ onEdit, onDelete, translations }) => {
  return (
    <div className="dropdown-menu">
      <button onClick={onEdit}>{translations.edit}</button>
      <button onClick={onDelete}>{translations.delete}</button>
    </div>
  );
};

export default Dropdown;
