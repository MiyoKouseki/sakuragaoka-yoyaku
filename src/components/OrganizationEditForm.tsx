//OrganizationEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import OrganizationFormFields from './OrganizationFormFields';
import { handleSubmitLogicOrganization } from '../hooks/handleSubmitLogic';
import { validateOrganizationData } from '../validations/validateOrganizationData';
import { Organization } from '../interfaces/Organization';
import submitData from '../services/SubmitData';


interface RouteParams {
  [key: string]: string | undefined;
}

const OrganizationEditForm: React.FC = () => {
  const { documentId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState<Organization>({ name: '', representative: '', phone: '' });

  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (documentId) {
        const docRef = doc(db, 'organizations', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrganization(docSnap.data() as Organization);
        }
      };
    };

    if (documentId) {
      fetchOrganizationData();
    }
  }, [documentId]);

  const submitOrganization = async (organization: Organization): Promise<void> => {
    await submitData<Organization>({
      collectionName: 'organizations',
      data: organization,
      validateData: validateOrganizationData,
      navigate,
      navigatePath: '/organizations/list'
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitLogicOrganization(
      organization,
      submitOrganization,
      () => navigate('/organization/list'), // 成功時の処理
      (errorMessage: string) => alert(errorMessage) // エラー時の処理
    );
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <OrganizationFormFields
          organization={organization}
          setOrganization={setOrganization}
        />
      </Box>
    </Container>
  );
};

export default OrganizationEditForm;