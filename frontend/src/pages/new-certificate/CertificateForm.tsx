import React, { useState, useRef, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import '../new-certificate/NewCertificate.css';
import Search from '../../common/components/icons/search';
import X from '../../common/components/icons/x';
import SupplierLookupModal, { Supplier } from '../../common/components/modals/supplier/SupplierLookupModal';
import ParticipantLookupModal from '../../common/components/modals/participant/ParticipantLookupModal';
import { useLanguage } from '../../common/context/LanguageContext';
import CommentModal from '../../common/components/modals/comment/CommentModal';

interface ICertificateForm {
  isEdit?: boolean;
  certificateId?: number;
}
 export interface Comment {
  text: string;
  user: string;
}
interface CertificateCreateDto {
  supplier: Supplier;
  type: string;
  validFrom: string;
  validTo: string;
  pdfFile: File | undefined;
  userAssigned?: number;
  comments: Array<{
    userId: number;
    userComment: string;
  }>;
  assignedUserIds: number[];
  userAssignedNavigation?: any[];
  pdfPreview?: string | undefined;
}
const CertificateForm: React.FC<ICertificateForm> = ({ isEdit, certificateId }: ICertificateForm) => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const validFromRef = useRef<HTMLInputElement>(null);
  const validToRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<{
    supplier: Supplier;
    certificateType: string;
    validFrom: string;
    validTo: string;
    pdfFile: File | undefined; 
    pdfPreview: undefined | string;
}>({
    supplier: {
      supplierId:0,supplierIndex:'',supplierName:'',city:''
    },
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdfFile: undefined,
    pdfPreview: undefined,
});

const { id } = useParams<{ id: string }>(); 
const getCertificate = async (): Promise<CertificateCreateDto> => {
  try {
    const response = await fetch(`https://localhost:7164/api/Certificates/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch certificate: ${response.statusText}`);
    }
    const fetchedCertificate: CertificateCreateDto = await response.json();
    return fetchedCertificate;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    throw error;
  }
};
  const [error, setError] = useState<string | null>(null);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [participants, setParticipants] = useState<{ userId:number,name: string; department: string; email: string }[]>([]);
  const [openComment,setOpenComment]=useState(false)
  useEffect(() => {
    if (isEdit && certificateId) {
      async function fetchData() {
        try {
          const certificate = await getCertificate();          
          setFormData({
            validFrom: certificate.validFrom ? certificate.validFrom : '',
            validTo: certificate.validTo ? certificate.validTo : '',
            certificateType: certificate.type,
            supplier: certificate.supplier,
            pdfFile: certificate.pdfFile,
            pdfPreview: certificate.pdfPreview || undefined

          });
          const assignedUsers=certificate?.userAssignedNavigation?.map((user)=>user?.user)
          setParticipants(assignedUsers||[])
          setComments(certificate?.comments)
        } catch (error) {
          console.error('Error fetching certificate:', error);
          setError('Could not fetch certificate details.');
        }
      }
      fetchData();
    }
  }, [certificateId]);

  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log('Selected file:', file);
    
    if (file) {
        console.log('File type:', file.type);
    }

    if (file && file.type === 'application/pdf') {
        setFormData({
            ...formData,
            pdfFile: file,
            pdfPreview: URL.createObjectURL(file),
        });
    } else {
        alert(translations['invalidFileError']);
    }
};
const updateCertificate = async (certificateData: CertificateCreateDto, certificateId: number) => {
  const formData = new FormData();
  formData.append('SupplierId', certificateData.supplier.toString());
  formData.append('Type', certificateData.type);
  formData.append('ValidFrom', certificateData.validFrom);
  formData.append('ValidTo', certificateData.validTo);
  if (certificateData.pdfFile) {
    formData.append('PdfFile', certificateData.pdfFile);
  }
  if (certificateData.comments && certificateData.comments.length > 0) {
    certificateData.comments.forEach((comment, index) => {
      formData.append(`Comments[${index}].UserId`, comment.userId.toString());
      formData.append(`Comments[${index}].UserComment`, comment.userComment);
    });
  }
  try {
    const response = await fetch(`https://localhost:7164/api/Certificates/${certificateId}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Certificate updated successfully:', data);
    } else {
      console.error('Failed to update certificate:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating certificate:', error);
  }
};
  const addCertificate = async (certificateData: CertificateCreateDto) => {
    const formData = new FormData();
  
    formData.append('SupplierId', certificateData.supplier.supplierId.toString());
    formData.append('Type', certificateData.type);
    formData.append('ValidFrom', certificateData.validFrom);
    formData.append('ValidTo', certificateData.validTo);
    certificateData.assignedUserIds.forEach(id => {
      formData.append('AssignedUserIds[]', id.toString());
  });
  
    if (certificateData.pdfFile) {
      formData.append('PdfFile', certificateData.pdfFile);
    }
  
    if (certificateData.comments && certificateData.comments.length > 0) {
      certificateData.comments.forEach((comment, index) => {
        formData.append(`Comments[${index}].UserId`, comment.userId.toString());
        formData.append(`Comments[${index}].UserComment`, comment.userComment);
      });
    }
    try {
      const response = await fetch('https://localhost:7164/api/Certificates', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Certificate created successfully:', data);
      } else {
        console.error('Failed to create certificate:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating certificate:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdfFile) {
      setError(translations['pdfRequiredError']);
      return;
    }
  
    try {
      const certificateData: CertificateCreateDto = {
        supplier: formData.supplier,
        type: formData.certificateType,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
        pdfFile: formData.pdfFile,
        comments: comments.map(comment => ({
          userId: Number(comment.user),
          userComment: comment.text,
        })),
        assignedUserIds: participants.map((user)=>user.userId),
      };
  
      if (certificateId && isEdit) {
          await updateCertificate({
            supplier: formData.supplier,
            type: formData.certificateType,
            validFrom: formData.validFrom,
            validTo: formData.validTo,
            pdfFile: formData.pdfFile,
            comments: comments.map(comment => ({
              userId: Number(comment.user),
              userComment: comment.text,
            })),
            assignedUserIds: participants.map(participant => Number(participant.userId)),
          }, certificateId);        
      } else {
        await addCertificate(certificateData);
      }
  
      navigate('/example1');
      handleReset();
    } catch (error) {
      setError('An error occurred while saving the certificate.');
    }
  };
  
  const handleReset = () => {
    setFormData({
      supplier: {
        supplierId:0,supplierIndex:'',supplierName:'',city:''
      },
      certificateType: '',
      validFrom: '',
      validTo: '',
      pdfFile: undefined,
      pdfPreview: undefined,
    });
    setError(null); 
  };

  const handleSelectSupplier = (supplier: Supplier) => {
    setFormData({
      ...formData,
      supplier: supplier,
    });
    setIsSupplierModalOpen(false);
  };
  const handleDeleteParticipant = (email: string) => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(participant => participant.email !== email)
    );
  };
  const handleAddParticipant = (selectedParticipants: {userId:number, name: string; department: string; email: string }[]) => {
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
                value={formData?.supplier?.supplierName}
                required
                className="input-field"
              />
              <Search className="icon" onClick={() => setIsSupplierModalOpen(true)} />
                <X className="icon" onClick={() => setFormData({ ...formData, supplier: {
                  supplierId:0,supplierIndex:'',supplierName:'',city:''
                }})} />
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
              onChange={handleChanges}
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
              value={formData?.validTo}
              onChange={handleChanges}
              onFocus={() => { validToRef.current!.type = "date"; }}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="comment-container">
              <button type="button" onClick={()=>setOpenComment(true)}>{translations['newComment']}</button>
          </div>
          {openComment&&<CommentModal certificateId={certificateId} onAddComment={(e)=>{
            setComments((prev)=>[...prev,e])
                    }} onClose={()=>setOpenComment(false)} />}
          <div className="participant-group">
            {comments?.map((c)=>(
              <><p><b>User:</b>{c?.userId}</p><p><b>Comment:</b>{c?.userComment}</p></>
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
                  <th></th>
                  <th>{translations['name']}</th>
                  <th>{translations['department']}</th>
                  <th>{translations['email']}</th>
                </tr>
              </thead>
              <tbody>
                {participants?.map((participant, index) => (
                  <tr key={index}>
                    <td>
                    <button type='button' onClick={() => handleDeleteParticipant(participant.email)}>
                      <X className="icon" />
                    </button>
                  </td>
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
            {formData?.pdfFile|| formData?.pdfPreview? (
              <iframe src={formData?.pdfPreview ||''} title={translations['pdfPreview']} className="pdf-preview" />
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
