//RoomEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Container } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';


interface Room {
  name: string;
  location: string;
}

interface RouteParams {
  [key: string]: string | undefined;
}

const RoomEditForm: React.FC = () => {
  //const { documentId } = useParams() as RouteParams;
  const { documentId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [Room, setRoom] = useState<Room>({ name: '', location: '' });

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
    const { name, location } = Room;
  
    if (!name || !location) {
      alert('すべてのフィールドを入力してください。');
      return;
    }

    try {
      if (documentId) {
        await setDoc(doc(db, 'rooms', documentId), { name, location });
        //alert('団体情報が更新されました！');
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="部屋名"
          name="name"
          value={Room.name}
          onChange={(e) => setRoom({ ...Room, name: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="建物名"
          name="location"
          value={Room.location}
          onChange={(e) => setRoom({ ...Room, location: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          更新
        </Button>
      </Box>
    </Container>
  );
};

export default RoomEditForm;
