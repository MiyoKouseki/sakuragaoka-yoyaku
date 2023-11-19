//OrganizationRegisterForm.tsx
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrganizationFormFields from './OrganizationFormFields';
import { handleSubmitLogic } from '../hooks/handleSubmitLogic';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { validateOrganizationData } from '../validations/validateOrganizationData';
import { Organization } from '../interfaces/Organization';
import { generateHash } from '../utils/generateHash';

const OrganizationRegisterForm: React.FC = () => {
  const [organization, setOrganization] = useState<Organization>({ name: '', representative: '', phone: '' });
  const navigate = useNavigate();

  const submitOrganization = async (organization: Organization) => {
    const { name, representative, phone } = organization;
    
    if (!validateOrganizationData(organization)) {
      return; 
    }

    try {
      const orgQuery = query(collection(db, 'organizations'), where('name', '==', name));
      const querySnapshot = await getDocs(orgQuery);
      if (!querySnapshot.empty) {
        alert('この団体名は既に使用されています。');
      } else {
        const orgData = { name, representative, phone };
        const dataString = JSON.stringify(orgData);
        const documentId = generateHash(dataString);
        await setDoc(doc(db, 'organizations', documentId), orgData);
        setOrganization({ name: '', representative: '', phone: '' });
      }
    } catch (error: unknown) {
      let errorMessage = '登録中にエラーが発生しました';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      alert(errorMessage);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitLogic(
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

export default OrganizationRegisterForm;
