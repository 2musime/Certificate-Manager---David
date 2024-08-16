import React, { useState } from 'react';
import '../styles/ParticipantLookupModal.css';

interface ParticipantLookupModalProps {
  onAddParticipant: (participants: { name: string; department: string; email: string }[]) => void;
  onClose: () => void;
}

interface IParticipant {
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
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('ITM');
  const [plantSearchTerm, setPlantSearchTerm] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<IParticipant[]>([]);

  const participants: IParticipant[] = [
    { name: 'Simon', firstName: 'John', userId: '123', department: 'ITM', plant: 'Plant1', email: 'john.doe@example.com' },
    { name: 'Wolfgang', firstName: 'Jane', userId: '456', department: 'ITM', plant: 'Plant2', email: 'jane.smith@example.com' },
    { name: 'Doe', firstName: 'Richard', userId: '789', department: 'ITM', plant: 'Plant3', email: 'richard.doe@example.com' },
    { name: 'Smith', firstName: 'Anna', userId: '101', department: 'ITM', plant: 'Plant4', email: 'anna.smith@example.com' },
    { name: 'Taylor', firstName: 'Emily', userId: '112', department: 'ITM', plant: 'Plant5', email: 'emily.taylor@example.com' },
  ];

  const filteredParticipants = participants.filter(participant => {
    return (
      participant.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      participant.firstName.toLowerCase().includes(firstNameSearchTerm.toLowerCase()) &&
      participant.userId.toLowerCase().includes(userIdSearchTerm.toLowerCase()) &&
      participant.department.toLowerCase().includes(departmentSearchTerm.toLowerCase()) &&
      participant.plant.toLowerCase().includes(plantSearchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setNameSearchTerm(value);
        break;
      case 'firstName':
        setFirstNameSearchTerm(value);
        break;
      case 'userId':
        setUserIdSearchTerm(value);
        break;
      case 'department':
        setDepartmentSearchTerm(value);
        break;
      case 'plant':
        setPlantSearchTerm(value);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setNameSearchTerm('');
    setFirstNameSearchTerm('');
    setUserIdSearchTerm('');
    setDepartmentSearchTerm('ITM');
    setPlantSearchTerm('');
  };

  const handleParticipantSelection = (participant: IParticipant) => {
    const isSelected = selectedParticipants.find(p => p.userId === participant.userId);
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
    <div className="modal-overlay">
      <div className="modal-content">
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
            </div><br />
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
              {filteredParticipants.map((participant, index) => (
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
