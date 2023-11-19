// roomEditForm.tsx
import React from 'react';
import { Room } from '../interfaces/Room';
import { validateRoomData } from '../validations/validateRoomData';
import RoomFormFields from './RoomFormFields';
import EditForm from './EditForm';

const RoomEditForm: React.FC = () => {
  return (
    <EditForm<Room>
      defaultEntity={{ name: '', location: '' }}
      collectionName="rooms"
      validateData={validateRoomData}
      FormFieldsComponent={RoomFormFields}
      navigatePathAfterSuccess="/rooms/list"
    />
  );
};

export default RoomEditForm;
