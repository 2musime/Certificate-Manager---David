import React from 'react';
import "../table/Table.css";
import { useLanguage } from '../../context/LanguageContext';
interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

interface TableProps {
  onNewCertificate?: () => void;
  data?: Certificate[];
}

const Table: React.FC<TableProps> = ({ onNewCertificate, data = [] }) => {
  const { translations } = useLanguage();

  return (
    <div>
      <button className="new-certificate-button" onClick={onNewCertificate}>
        {translations['newCertificate']}
      </button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>{translations['supplier']}</th>
              <th>{translations['certificateType']}</th>
              <th>{translations['validFrom']}</th>
              <th>{translations['validTo']}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((certificate) => (
              <tr key={certificate.id}>
                <td>{certificate.supplier}</td>
                <td>{certificate.certificateType}</td>
                <td>{certificate.validFrom}</td>
                <td>{certificate.validTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
