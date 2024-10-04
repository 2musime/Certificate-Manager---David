import React, { useEffect, useState } from 'react';
import '../participant/ParticipantLookupModal.css';

interface ParticipantLookupModalProps {
  onAddParticipant: (participants: { name: string; department: string; email: string }[]) => void;
  onClose: () => void;
}

interface Participant {
  name: string;
  firstName: string;
  userId: string;
  department: string;
  plant: string;
  email: string;
}

const ParticipantLookupModal: React.FC<ParticipantLookupModalProps> = ({ onAddParticipant, onClose }) => {
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [firstNameSearchTerm, setFirstNameSearchTerm] = useState('');
  const [userIdSearchTerm, setUserIdSearchTerm] = useState('');
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [plantSearchTerm, setPlantSearchTerm] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

  const apiUrl = `https://localhost:7164/api/controller/Participants`;

  useEffect(() => {
    const fetchParticipants = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setParticipants(data);
    };

    fetchParticipants();
  }, []);

  const fetchParticipantByName = async (name: string) => {
    const params = new URLSearchParams({ participantName: name });
    const res = await fetch(`https://localhost:7164/api/controller/Participants?${params}`);
    const data = await res.json();
    setParticipants(data);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearchTerm(e.target.value);
    fetchParticipantByName(e.target.value);
  };

  const handleReset = () => {
    setNameSearchTerm('');
    setFirstNameSearchTerm('');
    setUserIdSearchTerm('');
    setDepartmentSearchTerm('');
    setPlantSearchTerm('');
  };

  const handleParticipantSelection = (participant: Participant) => {
    const isSelected = selectedParticipants.find((p: Participant) => p.userId === participant.userId);
    if (isSelected) {
      setSelectedParticipants(prevSelected =>
        prevSelected.filter(p => p.userId !== participant.userId)
      );
    } else {
      setSelectedParticipants(prevSelected => [...prevSelected, participant]);
    }
  };

  const handleSelect = () => {
    onAddParticipant(selectedParticipants);
    onClose();
  };

  return (
    <div className="pmodal-overlay">
      <div className="pmodal-content">
        <div className="topbar">
          <h3>Search for persons</h3>
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        <div className="search-criteria">
          <h4>Search criteria</h4>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={nameSearchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstNameSearchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="First name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={userIdSearchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="User ID"
              />
            </div>
            <div className="input-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={departmentSearchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="Department"
              />
            </div>
            <div className="input-group">
              <label htmlFor="plant">Plant</label>
              <input
                type="text"
                id="plant"
                name="plant"
                value={plantSearchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="Plant"
              />
            </div>
          </div>
          <div className="button-row">
            <button className="search-btn">Search</button>
            <button className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="person-list">
          <h4>Person list</h4>
          <table className="participant-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>First Name</th>
                <th>User ID</th>
                <th>Department</th>
                <th>Plant</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {participants?.map((participant, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="participant"
                      checked={selectedParticipants.some(p => p.userId === participant.userId)}
                      onChange={() => handleParticipantSelection(participant)}
                    />
                  </td>
                  <td>{participant.name}</td>
                  <td>{participant.firstName}</td>
                  <td>{participant.userId}</td>
                  <td>{participant.department}</td>
                  <td>{participant.plant}</td>
                  <td>{participant.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-row">
            <button className="select-btn" onClick={handleSelect}>Select</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantLookupModal;
