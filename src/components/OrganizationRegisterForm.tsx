// OrganizationRegisterForm.tsx
import React from 'react';
import { Organization } from '../interfaces/Organization';
import { validateOrganizationData } from '../validations/validateOrganizationData';
import OrganizationFormFields from './OrganizationFormFields';
import RegisterForm from './RegisterForm';

const OrganizationRegisterForm: React.FC = () => {
  return (
    <RegisterForm<Organization>
      defaultEntity={{ name: '', representative: '', phone: '' }}
      collectionName="organizations"
      validateData={validateOrganizationData}
      FormFieldsComponent={OrganizationFormFields}
      navigatePathAfterSuccess="/organization/list"
    />
  );
};

export default OrganizationRegisterForm;
