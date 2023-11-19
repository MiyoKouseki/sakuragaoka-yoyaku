// RoomRegisterForm.tsx
import React from 'react';
import { Room } from '../interfaces/Room';
import { validateRoomData } from '../validations/validateRoomData';
import RoomFormFields from './RoomFormFields';
import RegisterForm from './RegisterForm';

const RoomRegisterForm: React.FC = () => {
  return (
    <RegisterForm<Room>
      defaultEntity={{ name: '', location: '' }}
      collectionName="rooms"
      validateData={validateRoomData}
      FormFieldsComponent={RoomFormFields}
      navigatePathAfterSuccess="/rooms/list"
    />
  );
};

export default RoomRegisterForm;
