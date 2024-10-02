import React, { FC, useEffect, useState } from 'react';
import '../supplier/SupplierLookupModal.css';
import useTranslation from '../../../context/useTranslation';

interface SupplierLookupModalProps {
  onClose: () => void;
  onSelectSupplier: (name: string) => void;
}
interface Supplier {
  supplierName: string;
  supplierIndex: string;
  city: string;
}

const SupplierLookupModal: FC<SupplierLookupModalProps> = ({ onClose, onSelectSupplier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [indexSearchTerm, setIndexSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const translate = useTranslation();
  

  const [suppliers, setsuppliers] = useState<Supplier[]>([]);

  const apiUrl = `https://localhost:7164/api/Supplier/Suppliers`;

  useEffect(() => {
    const fetchSuppliers = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setsuppliers(data);
    };

    fetchSuppliers();
  }, []);

  const fetchSuppliersByName = async (name: string) => {
    const params = new URLSearchParams({ supplierName: name });
    const res = await fetch(`https://localhost:7164/api/Supplier/SearchByName?${params}`);
    const data = await res.json();
    setsuppliers(data);
  };

  const fetchSuppliersByIndex = async (index: string) => {
    const params = new URLSearchParams({ supplierIndex: index });
    const res = await fetch(`https://localhost:7164/api/Supplier/SearchByIndex?${params}`);
    const data = await res.json();
    setsuppliers(data);
  };

  const fetchSuppliersByCity = async (city: string) => {
    const params = new URLSearchParams({ city });
    const res = await fetch(`https://localhost:7164/api/Supplier/SearchByCity?${params}`);
    const data = await res.json();
    setsuppliers(data);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchSuppliersByName(e.target.value);
  };

  const handleIndexSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexSearchTerm(e.target.value);
    fetchSuppliersByIndex(e.target.value);
  };

  const handleCitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchTerm(e.target.value);
    fetchSuppliersByCity(e.target.value);
  };

  return (
    <div className="smodal-overlay">
      <div className="smodal-content">
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
            <button className="reset-btn" onClick={() => { setSearchTerm(''); setIndexSearchTerm(''); setCitySearchTerm(''); }}> {translate('reset')}</button>
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
              {Array.isArray(suppliers) && suppliers.map((supplier, index) => (
                <tr key={index} onClick={() => onSelectSupplier(supplier.supplierName)}>
                  <td><input type="radio" name="supplier" /></td>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.supplierIndex}</td>
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
