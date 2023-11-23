// roomEditForm.tsx
import React from 'react';
import { Room } from '../../../interfaces/Entity';
import { validateRoomData } from '../../../validations/validateRoomData';
import RoomFormFields from '../../formFields/RoomFormFields';
import EditForm from '../EditForm';

const RoomEditForm: React.FC = () => {
  return (
    <EditForm<Room>
      defaultEntity={{
        id: '',
        name: '',
        location: '',
        category: '',
        owner: ''
      }}
      collectionName="rooms"
      validateData={validateRoomData}
      FormFieldsComponent={RoomFormFields}
      navigatePathAfterSuccess="/rooms/list"
    />
  );
};

export default RoomEditForm;
