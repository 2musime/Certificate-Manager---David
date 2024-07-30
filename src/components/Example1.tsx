import React, { useEffect, useState } from 'react';
import { getCertificates, deleteCertificate } from '../DB/indexedDB';
import Button from './Button';
import Table from './Table';
import GearIcon from '../icons/gear';
import '../styles/Table.css';
import { useNavigate } from 'react-router';
import { useLanguage } from './context/LanguageContext';

const Example1: React.FC = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<any[]>([]);
  const { translations } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      const data = await getCertificates();
      setCertificates(data);
    }

    fetchData();
  }, []);

  const handleEditNavigate = (id: string) => {
    navigate(`/edit-certificate/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteCertificate(id);
        setCertificates((prevCertificates) =>
          prevCertificates.filter((certificate) => certificate.id !== id)
        );
      } catch (error) {
        console.error('Failed to delete certificate', error);
      }
    }
    navigate('/example1');
  };

  const handleRowClick = (rowData: { [key: string]: any }) => {
    handleEditNavigate(rowData.id);
  };

  const renderRowActions = (row: { [key: string]: any }) => {
    return (
      <GearIcon
        onEdit={() => handleEditNavigate(row.id)}
        onDelete={() => handleDelete(row.id)}
      />
    );
  };

  const headers = [translations['supplier'], translations['certificateType'], translations['validFrom'], translations['validTo']];

  const tableData = certificates.map((certificate) => ({
    supplier: certificate.supplier,
    certificateType: certificate.certificateType,
    validFrom: certificate.validFrom,
    validTo: certificate.validTo,
    id: certificate.id,
  }));

  return (
    <div>
      <Button onNewCertificate={() => navigate('/new-certificate')} />
      <Table
        headers={headers}
        data={tableData}
        onRowClick={handleRowClick}
        renderRowActions={renderRowActions}
        selectableRows={false}
      />
    </div>
  );
};

export default Example1;
