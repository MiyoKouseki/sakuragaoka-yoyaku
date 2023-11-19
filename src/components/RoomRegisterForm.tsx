//RoomRegisterForm.tsx
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { generateHash } from '../utils/generateHash';
import RoomFormFields from './RoomFormFields';
import { Room } from '../interfaces/Entity';
import { validateRoomData } from '../validations/validateRoomData';
import { handleSubmitLogicRoom } from '../hooks/handleSubmitLogic';

const RoomRegisterForm: React.FC = () => {
  const [room, setRoom] = useState<Room>({ name: '', location: '' });
  const { name, location } = room;
  const navigate = useNavigate();

  const submitRoom = async (room: Room) => {
    if (!validateRoomData(room)) {
      return;
    }

    try {
      const roomQuery = query(collection(db, 'rooms'), where('name', '==', name));
      const querySnapshot = await getDocs(roomQuery);

      if (!querySnapshot.empty) {
        alert('この部屋名は既に使用されています。');
      } else {
        const roomData = { name, location };
        const dataString = JSON.stringify(roomData);
        const documentId = generateHash(dataString);
        await setDoc(doc(db, 'rooms', documentId), roomData);
        setRoom({ name: '', location: '' });
        navigate('/rooms/list'); // 適切なリダイレクト先に変更
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
    handleSubmitLogicRoom(
      room,
      submitRoom,
      () => navigate('/rooms/list'), // 成功時の処理
      (errorMessage: string) => alert(errorMessage) // エラー時の処理
    );
  };
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <RoomFormFields room={room} setRoom={setRoom} />
      </Box>
    </Container>
  );
};

export default RoomRegisterForm;
