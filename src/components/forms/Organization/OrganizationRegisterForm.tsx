// OrganizationRegisterForm.tsx
import React from 'react';
import { Organization } from '../../../interfaces/Entity';
import { validateOrganizationData } from '../../../validations/validateOrganizationData';
import OrganizationFormFields from '../../formFields/OrganizationFormFields';
import RegisterForm from '../RegisterForm';

const OrganizationRegisterForm: React.FC = () => {
  return (
    <RegisterForm<Organization>
      defaultEntity={{ name: '', representative: '', phone: '' }}
      collectionName="organizations"
      validateData={validateOrganizationData}
      FormFieldsComponent={OrganizationFormFields}
      navigatePathAfterSuccess="/organizations/list"
    />
  );
};

export default OrganizationRegisterForm;
