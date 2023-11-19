//RoomEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import RoomFormFields from './RoomFormFields';
import { Room } from '../interfaces/Room';
import { validateRoomData } from '../validations/validateRoomData';


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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, location } = room;

    if (!validateRoomData(room)) {
      return; 
    }

    try {
      if (documentId) {
        await setDoc(doc(db, 'rooms', documentId), { name, location });
        navigate('/rooms/list');
      };
    } catch (error: unknown) {
      let errorMessage = '更新中にエラーが発生しました';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      alert(errorMessage);
    }
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
