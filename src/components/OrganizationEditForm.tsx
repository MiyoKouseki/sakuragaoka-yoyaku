// OrganizationEditForm.tsx
import React from 'react';
import { Organization } from '../interfaces/Organization';
import { validateOrganizationData } from '../validations/validateOrganizationData';
import OrganizationFormFields from './OrganizationFormFields';
import EditForm from './EditForm';

const OrganizationEditForm: React.FC = () => {
  return (
    <EditForm<Organization>
      defaultEntity={{ name: '', representative: '', phone: '' }}
      collectionName="organizations"
      validateData={validateOrganizationData}
      FormFieldsComponent={OrganizationFormFields}
      navigatePathAfterSuccess="/organization/list"
    />
  );
};

export default OrganizationEditForm;
