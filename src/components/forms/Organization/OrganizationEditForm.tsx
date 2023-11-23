// OrganizationEditForm.tsx
import React from 'react';
import { Organization } from '../../../interfaces/Entity';
import { validateOrganizationData } from '../../../validations/validateOrganizationData';
import OrganizationFormFields from '../../formFields/OrganizationFormFields';
import EditForm from '../EditForm';

const OrganizationEditForm: React.FC = () => {
  return (
    <EditForm<Organization>
      defaultEntity={{ name: '', representative: '', phone: '' }}
      collectionName="organizations"
      validateData={validateOrganizationData}
      FormFieldsComponent={OrganizationFormFields}
      navigatePathAfterSuccess="/organizations/list"
    />
  );
};

export default OrganizationEditForm;
