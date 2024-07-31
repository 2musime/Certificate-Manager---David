import React, { useEffect, useState } from 'react';
import { getCertificates, deleteCertificate } from '../DB/indexedDB';
<<<<<<< HEAD
import Button from './Button';
=======
>>>>>>> f67b3b1 (Feature/Task-5-KAN-55 Delete functionality is implemented well)
import Table from './Table';
import GearIcon from '../icons/gear';
import '../styles/Table.css';
import { useNavigate } from 'react-router';
import { useLanguage } from './context/LanguageContext';

const Example1: React.FC = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<any[]>([]);
<<<<<<< HEAD
  const { translations } = useLanguage();
=======
>>>>>>> f67b3b1 (Feature/Task-5-KAN-55 Delete functionality is implemented well)

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
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        setCertificates((prevCertificates) =>
          prevCertificates.filter((certificate) => certificate.id !== id)
        );
      } catch (error) {
        console.error('Failed to delete certificate', error);
      }
    }
<<<<<<< HEAD
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
=======
  };

  return (
    <div>
      <h2></h2>
      <Table data={[]} onNewCertificate={() => navigate('/new-certificate')} />
      <table>
        <thead>
          <tr>
            <td></td>
            <td>{translations['supplier']}</td>
            <td>{translations['certificateType']}</td>
            <td>{translations['validFrom']}</td>
            <td>{translations['validTo']}</td>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td>
                <GearIcon
                  onEdit={() => handleEditNavigate(certificate.id)}
                  onDelete={() => handleDelete(certificate.id)}
                />
              </td>
              <td>{certificate.supplier}</td>
              <td>{certificate.certificateType}</td>
              <td>{certificate.validFrom}</td>
              <td>{certificate.validTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> f67b3b1 (Feature/Task-5-KAN-55 Delete functionality is implemented well)
    </div>
  );
};

export default Example1;
