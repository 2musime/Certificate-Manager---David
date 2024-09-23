import React, { useEffect, useState } from "react";
import CertificateForm from "./CertificateForm";
import { useParams } from "react-router-dom";

const EditCertificate: React.FC =()=>{
    const {id} = useParams<{id:string}>()
    const [certificateId, setCertificateId] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (id) {
            const parsedCertificateId = parseInt(id)
            setCertificateId(parsedCertificateId)
        }
      }, [id]);

    return (
        <div>
            <CertificateForm isEdit={true} certificateId={certificateId}/>
        </div>
    );
} 

export default EditCertificate