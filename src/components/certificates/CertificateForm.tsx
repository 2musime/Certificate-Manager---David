import React, { useState, useRef, useEffect } from 'react';
import { addCertificate, updateCertificate, getCertificates } from "../../DB/indexedDB";
import { useNavigate } from 'react-router';
import "../../styles/NewCertificate.css";
import Search from '../../icons/search';
import X from '../../icons/x';
import SupplierLookupModal from '../SupplierLookupModal';
import { useLanguage } from '../context/LanguageContext';

interface ICertificateForm {
  isEdit?: boolean;
  certificateId?: number;
}

const CertificateForm: React.FC<ICertificateForm> = ({ isEdit, certificateId }: ICertificateForm) => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const validFromRef = useRef<HTMLInputElement>(null);
  const validToRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdfFile: null as string | null,
    pdfPreview: '' as string | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isEdit && certificateId) {
      async function fetchData() {
        const certificates = await getCertificates();
        const filteredCertificate = certificates.find((certificate) => certificate.id === certificateId);
        if (filteredCertificate) {
          setFormData({
            validFrom: filteredCertificate.validFrom || '',
            validTo: filteredCertificate.validTo || '',
            certificateType: filteredCertificate.certificateType,
            supplier: filteredCertificate.supplier,
            pdfFile: filteredCertificate.pdfFile || null,
            pdfPreview: filteredCertificate.pdfFile || null,
          });
        }
      }
      fetchData();
    }
  }, [isEdit, certificateId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData({
            ...formData,
            pdfFile: reader.result as string,
            pdfPreview: reader.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert(translations['invalidFileError']);
      alert(translations['invalidFileError']);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdfPreview) {
      setError(translations['pdfRequiredError']);
      return;
    }
    setError(null);

    try {
      if (certificateId && isEdit) {
        await updateCertificate({
          supplier: formData.supplier,
          certificateType: formData.certificateType,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          pdfFile: formData.pdfFile,
        }, certificateId);
      } else {
        await addCertificate({
          supplier: formData.supplier,
          certificateType: formData.certificateType,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          pdfFile: formData.pdfFile,
          id: 0
        });
      }
      navigate('/example1');
      handleReset();
    } catch (error) {
      setError('An error occurred while saving the certificate.');
    }
  };

  const handleReset = () => {
    setFormData({
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      pdfFile: null,
      pdfPreview: null,
    });
    setError(null);
  };

  const handleSelectSupplier = (supplier: string) => {
    setFormData({
      ...formData,
      supplier: supplier,
    });
    setIsModalOpen(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="new-certificate-form">
        <div className="form-left">
          <div className="form-group">
            <label>{translations['supplier']}</label>
            <div className="input-container">
              <input
                type="text" readOnly
                name="supplier"
                value={formData.supplier}
                required
                className="input-field"
              />
              <Search className="icon" onClick={() => setIsModalOpen(true)} />
              <X className="icon" onClick={() => setFormData({ ...formData, supplier: '' })} />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="certificateType">{translations['certificateType']}</label>
            <select name="certificateType" value={formData.certificateType} onChange={handleChanges} required>
              <option value="">{translations['selectyouroption']}</option>
              <option value="Permission of printing">Permission of printing</option>
              <option value="OHSAS 18001">OHSAS 18001</option>
              <option value="Attendance">Attendance</option>
              <option value="Completion">Completion</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>{translations['validFrom']}</label>
            <input
              type="text"
              placeholder={translations['clickToSelectDate']}
              ref={validFromRef}
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              onFocus={() => { validFromRef.current!.type = "date"; }}
              required
            />
          </div>

          <div className="form-group">
            <label>{translations['validTo']}</label>
            <input
              type="text"
              placeholder={translations['clickToSelectDate']}
              ref={validToRef}
              name="validTo"
              value={formData.validTo}
              onChange={handleChange}
              onFocus={() => { validToRef.current!.type = "date"; }}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="participant-group">
      <div className="partipant-container">
    <label>Assigned users</label>
    <button
      type="button"
      className="input-button">
      <Search className="icon" />
      Add participant
    </button>
  </div>
      </div>
  </div>

        <div className="form-right">
          <div className="form-group">
            <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
            <button type="button" className="upload-button" onClick={() => {
              const fileInput = document.querySelector('input[name="pdfFile"]') as HTMLInputElement;
              fileInput?.click();
            }}>{translations['upload']}</button>
          </div>
          <div className="pdf-preview-container">
            {formData.pdfPreview ? (
              <iframe src={formData.pdfPreview} title={translations['pdfPreview']} className="pdf-preview" />
            ) : (
              <div className="pdf-placeholder">{translations['noPreview']}</div>
            )}
          </div>
          <div className="form-actions">
            <button type="submit">{translations['save']}</button>
            <button type="button" onClick={handleReset}>{translations['reset']}</button>
          </div>
        </div>
      </form>
      {isModalOpen && <SupplierLookupModal onClose={() => setIsModalOpen(false)} onSelect={handleSelectSupplier} />}
    </>
  );
};

export default CertificateForm;
