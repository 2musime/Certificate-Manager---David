import React, { useState } from 'react';
import '../styles/ParticipantLookupModal.css';

interface ParticipantLookupModalProps {
  onSelectParticipant: (participant: { name: string; department: string; email: string }) => void;
  onClose: () => void;
}

const ParticipantLookupModal: React.FC<ParticipantLookupModalProps> = ({ onSelectParticipant, onClose }) => {
  const [participant, setParticipant] = useState({ name: '', department: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectParticipant(participant);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={participant.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" value={participant.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={participant.email} onChange={handleChange} required />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantLookupModal;
