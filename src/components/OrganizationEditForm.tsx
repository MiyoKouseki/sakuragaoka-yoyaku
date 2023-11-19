//OrganizationEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrganizationFormFields from './OrganizationFormFields';
import { handleSubmitLogicOrganization } from '../hooks/handleSubmitLogic';
import { validateOrganizationData } from '../validations/validateOrganizationData';
import { Organization } from '../interfaces/Organization';
import submitData from '../services/SubmitData';
import FetchData from '../services/FetchData';


interface RouteParams {
  [key: string]: string | undefined;
}

const OrganizationEditForm: React.FC = () => {
  const { documentId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState<Organization>({ name: '', representative: '', phone: '' });

  useEffect(() => {
    FetchData<Organization>('organizations', documentId, setOrganization);
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
