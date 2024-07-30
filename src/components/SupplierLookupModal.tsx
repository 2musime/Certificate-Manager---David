import React, { FC, useState } from 'react';
import '../styles/SupplierLookupModal.css';
import useTranslation from './context/useTranslation';

interface SupplierLookupModalProps {
  onClose: () => void;
  onSelectSupplier: (name: string) => void;
}

const SupplierLookupModal: FC<SupplierLookupModalProps> = ({ onClose, onSelectSupplier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [indexSearchTerm, setIndexSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const translate = useTranslation();

  const suppliers = [
    { name: 'ANDEMIS GmbH', index: '1', city: 'Stuttgart' },
    { name: 'Strutgut', index: '2', city: 'Berlin' },
    { name: 'Munich', index: '3', city: 'Munich' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleIndexSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexSearchTerm(e.target.value);
  };

  const handleCitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchTerm(e.target.value);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      supplier.index.toLowerCase().includes(indexSearchTerm.toLowerCase()) &&
      supplier.city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="topbar">
          <h3>{translate('search_for_suppliers')}</h3>
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        <div className="search-criteria">
          <h4>{translate('search_criteria')}</h4>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="searchTerm">{translate('supplier_name')}</label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
                placeholder={translate('supplier_name')}
              />
            </div>
            <div className="input-group">
              <label htmlFor="searchIndex">{translate('index')}</label>
              <input
                type="text"
                id="searchIndex"
                value={indexSearchTerm}
                onChange={handleIndexSearchChange}
                className="search-input"
                placeholder={translate('index')}
              />
            </div>
            <div className="input-group">
              <label htmlFor="searchCity">{translate('city')}</label>
              <input
                type="text"
                id="searchCity"
                value={citySearchTerm}
                onChange={handleCitySearchChange}
                className="search-input"
                placeholder={translate('city')}
              />
            </div>
          </div>
          <div className="button-row">
            <button className="search-btn">{translate('search')}</button>
            <button className="reset-btn" onClick={() => { setSearchTerm(''); setIndexSearchTerm(''); setCitySearchTerm(''); }}>{translate('reset')}</button>
          </div>
        </div>
        <div className="supplier-list">
          <h4>{translate('supplier_list')}</h4>
          <table className="supplier-table">
            <thead>
              <tr>
                <th></th>
                <th>{translate('supplier_name')}</th>
                <th>{translate('index')}</th>
                <th>{translate('city')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index} onClick={() => onSelectSupplier(supplier.name)}>
                  <td><input type="radio" name="supplier" /></td>
                  <td>{supplier.name}</td>
                  <td>{supplier.index}</td>
                  <td>{supplier.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-row">
            <button className="select-btn" onClick={onClose}>{translate('select')}</button>
            <button className="cancel-btn" onClick={onClose}>{translate('cancel')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierLookupModal;
