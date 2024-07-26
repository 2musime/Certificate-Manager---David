import React, { useState, useRef, useEffect } from 'react';
import {  addCertificate, updateCertificate } from "../../DB/indexedDB";
import { useNavigate } from 'react-router';
import "../../styles/NewCertificate.css";
import Search from '../../icons/search';
import X from '../../icons/x';
import { getCertificates } from "../../DB/indexedDB";

interface ICertificateForm {
  isEdit?: boolean
  certificateId?: number
}

const CertificateForm: React.FC<ICertificateForm> = ({isEdit, certificateId}:ICertificateForm) => {
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

  useEffect(()=> {
    if(isEdit && certificateId){
      async function fetchData() {
        const certificates = await getCertificates();

const filteredCertificate = certificates.filter((certificate) => certificate.id ===certificateId)

filteredCertificate.map((certificate)=> (


  setFormData({
    validFrom: certificate.validFrom ? certificate.validFrom : null,
    validTo: certificate.validTo ? certificate.validTo : null,
    certificateType: certificate.certificateType,
    supplier: certificate.supplier,
    pdfFile: certificate.pdfFile || null,
    pdfPreview: certificate.pdfPreview || null
  })
))}
  
      fetchData();
    }

  }, [certificateId])

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
        pdfPreview: reader.result as string,
      });
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid file.');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdfPreview) {
      setError('Please upload a PDF document before submitting.'); 
      return;
    }

    setError(null);

    try {
      if(certificateId && isEdit){
        console.log("edit clicked");
        await updateCertificate({
          supplier: formData.supplier,
          certificateType: formData.certificateType,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          pdfFile: formData.pdfFile,
        }, certificateId as number)
      }
      else{
        await addCertificate({
          supplier: formData.supplier,
          certificateType: formData.certificateType,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          pdfFile: formData.pdfFile,
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

  return (
    <form onSubmit={handleSubmit} className="new-certificate-form">
      <div className="form-left">
        <div className="form-group">
          <label>Supplier</label>
          <div className="input-container">
            <input 
              type="text" 
              name="supplier" 
              value={formData.supplier} 
              onChange={handleChange} 
              required 
              className="input-field" 
            />
            <Search className="icon" />
            <X className="icon" onClick={() => setFormData({ ...formData, supplier: '' })} />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="certificateType">Certificate Type</label>
          <select name="certificateType" value={formData.certificateType} onChange={handleChanges} required>
            <option value="">Select your option</option>
            <option value="Permission of printing">Permission of printing</option>
            <option value="OHSAS 18001">OHSAS 18001</option>
            <option value="Attendance">Attendance</option>
            <option value="Completion">Completion</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Valid from</label>
          <input
            type="text" required
            placeholder="Click to select date"
            ref={validFromRef}
            name="validFrom"
            value={formData.validFrom}
            onChange={handleChange}
            onFocus={() => { validFromRef.current!.type = "date"; }}
          />
        </div>
        
        <div className="form-group">
          <label>Valid to</label>
          <input
            type="text"
            placeholder="Click to select date"
            ref={validToRef}
            name="validTo"
            value={formData.validTo}
            onChange={handleChange}
            onFocus={() => { validToRef.current!.type = "date"; }}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </div>
      
      <div className="form-right">
        <div className="form-group">
          <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange} required style={{ display: 'none' }} />
          <button type="button" className="upload-button" onClick={() => {
            const fileInput = document.querySelector('input[name="pdfFile"]') as HTMLInputElement;
            fileInput?.click();
          }}>Upload</button>
        </div>
        <div className="pdf-preview-container">
          {formData.pdfPreview ? (
            <iframe src={formData.pdfPreview} title="PDF Preview" className="pdf-preview" />
          ) : (
            <div className="pdf-placeholder"></div>
          )}
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </form>
  );
};

export default CertificateForm;
