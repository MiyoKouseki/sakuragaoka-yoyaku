//RoomEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import RoomFormFields from './RoomFormFields';
import { Room } from '../interfaces/Room';
import { validateRoomData } from '../validations/validateRoomData';
import { handleSubmitLogicRoom } from '../hooks/handleSubmitLogic';
import submitData from '../services/SubmitData';

interface RouteParams {
  [key: string]: string | undefined;
}

const RoomEditForm: React.FC = () => {
  const { documentId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room>({ name: '', location: '' });

  useEffect(() => {
    const fetchRoomData = async () => {
      if (documentId) {
        const docRef = doc(db, 'rooms', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoom(docSnap.data() as Room);
        }
      };
    };

    if (documentId) {
      fetchRoomData();
    }
  }, [documentId]);

  const submitRoom = async (organization: Room): Promise<void> => {
    await submitData<Room>({
      collectionName: 'rooms',
      data: organization,
      validateData: validateRoomData,
      navigate,
      navigatePath: '/rooms/list'
    });
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

export default RoomEditForm;
