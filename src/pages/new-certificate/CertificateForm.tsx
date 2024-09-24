import React, { useState, useRef, useEffect } from 'react';
import { addCertificate, updateCertificate } from "../../common/components/DB/indexedDB";
import { useNavigate } from 'react-router';
import '../new-certificate/NewCertificate.css';
import Search from '../../common/components/icons/search';
import X from '../../common/components/icons/x';
import { getCertificates } from "../../common/components/DB/indexedDB";
import SupplierLookupModal from '../../common/components/modals/supplier/SupplierLookupModal';
import ParticipantLookupModal from '../../common/components/modals/participant/ParticipantLookupModal';
import { useLanguage } from '../../common/context/LanguageContext';
import CommentModal from '../../common/components/modals/comment/CommentModal';

interface ICertificateForm {
  isEdit?: boolean;
  certificateId?: number;
}
interface Comment {
  text: string;
  user: string;
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
    pdfFile: '',
    pdfPreview: '' as string | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const [participants, setParticipants] = useState<{ name: string; department: string; email: string }[]>([]);
  const [openComment,setOpenComment]=useState(false)
  useEffect(() => {
    if (isEdit && certificateId) {
      async function fetchData() {
        const certificates = await getCertificates();
        const filteredCertificate = certificates.filter((certificate) => certificate.id === certificateId);
        filteredCertificate.map((certificate) => (
          setFormData({
            validFrom: certificate.validFrom ? certificate.validFrom : '',
            validTo: certificate.validTo ? certificate.validTo : '',
            certificateType: certificate.certificateType,
            supplier: certificate.supplier,
            pdfFile: certificate.pdfFile || '',
            pdfPreview: certificate.pdfPreview || null
          })
        ));
      }
      fetchData();
    }
  }, [certificateId]);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdfPreview) {
      setError(translations['pdfRequiredError']);
      return;
    }
    try {
      if (certificateId && isEdit) {
        await updateCertificate({
          id:certificateId,
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
      pdfFile: '',
      pdfPreview: null,
    });
    setError(null); 
  };

  const handleSelectSupplier = (supplier: string) => {
    setFormData({
      ...formData,
      supplier: supplier,
    });
    setIsSupplierModalOpen(false);
  };

  const handleAddParticipant = (selectedParticipants: { name: string; department: string; email: string }[]) => {
    const _participants = participants

    selectedParticipants.forEach(participant => {
      _participants.push(participant)
    })

    setParticipants(_participants);
    
    setIsParticipantModalOpen(false);
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
              <Search className="icon" onClick={() => setIsSupplierModalOpen(true)} />
              <X className="icon" onClick={() => setFormData({ ...formData, supplier: '' })} />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="certificateType">{translations['certificateType']}</label>
            <select name="certificateType" value={formData.certificateType} onChange={handleChanges} required>
              <option value="">Select your option</option>
              <option value="Permission of printing">Permission of printing</option>
              <option value="OHSAS 18001">OHSAS 18001</option>
              <option value="Attendance">Attendance</option>
              <option value="Completion">Completion</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>{translations['validFrom']}</label>
            <input
              type="text" required
              placeholder='Click to select date'
              ref={validFromRef}
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              onFocus={() => { validFromRef.current!.type = "date"; }}
            />
          </div>

          <div className="form-group">
            <label>{translations['validTo']}</label>
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

          <div className="comment-container">
              <button type="button" onClick={()=>setOpenComment(true)}>{translations['newComment']}</button>
          </div>
          {openComment&&<CommentModal onAddComment={(e)=>{
            setComments((prev)=>[...prev,e])
                    }} onClose={()=>setOpenComment(false)} />}
          <div className="participant-group">
            {comments?.map((c)=>(
              <><p><b>User:</b>{c?.user}</p><p><b>Comment:</b>{c?.text}</p></>
            ))}
            <div className="participant-container">
              <label>Assigned users</label>
              <button
                type="button"
                className="input-button"
                onClick={() => setIsParticipantModalOpen(true)}>
                <Search className="icon" />
                Add participant
              </button>
            </div>
            <table className="participant-table">
              <thead>
                <tr>
                  <th>{translations['name']}</th>
                  <th>{translations['department']}</th>
                  <th>{translations['email']}</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr key={index}>
                    <td>{participant.name}</td>
                    <td>{participant.department}</td>
                    <td>{participant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-right">
          <div className="form-group">
            <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange} required style={{ display: 'none' }} />
            <button type="button" className="upload-button" onClick={() => {
              const fileInput = document.querySelector('input[name="pdfFile"]') as HTMLInputElement;
              fileInput?.click();
            }}>{translations['upload']}</button>
          </div>
          <div className="pdf-preview-container">
            {formData.pdfPreview||formData.pdfFile ? (
              <iframe src={formData.pdfPreview||formData.pdfFile||''} title={translations['pdfPreview']} className="pdf-preview" />
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
      {isSupplierModalOpen && <SupplierLookupModal onSelectSupplier={handleSelectSupplier} onClose={() => setIsSupplierModalOpen(false)} />}
      {isParticipantModalOpen && <ParticipantLookupModal onAddParticipant={handleAddParticipant} onClose={() => setIsParticipantModalOpen(false)} />}
    </>
  );
};

export default CertificateForm;
