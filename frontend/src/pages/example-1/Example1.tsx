import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../common/context/LanguageContext';
import Table from '../../common/components/table/Table';
import GearIcon from '../../common/components/icons/gear';
import '../example-1/Table.css';

interface Certificate {
  id: number;
  supplierDetails: string;
  type: string;
  validFrom: string;
  validTo: string;
}

const Example1: React.FC = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { translations } = useLanguage();

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await fetch('https://localhost:7164/api/Certificates');
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    }
    fetchCertificates();
  }, []);

  const handleEditNavigate = (id: number) => {
    navigate(`/edit-certificate/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await fetch(`https://localhost:7164/api/Certificates/${id}`, { method: 'DELETE' });
        setCertificates((prevCertificates) =>
          prevCertificates.filter((certificate) => certificate.id !== id)
        );
      } catch (error) {
        console.error('Failed to delete certificate', error);
      }
    }
  };

  return (
    <div>
      <h2>{translations['certificates']}</h2>
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
              <td>{certificate.supplierDetails}</td>
              <td>{certificate.type}</td>
              <td>{certificate.validFrom}</td>
              <td>{certificate.validTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Example1;
