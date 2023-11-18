//RoomForm.tsx
import React, { useState } from 'react';
import * as CryptoJS from 'crypto-js';
import { TextField, Button, Box, Container } from '@mui/material';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import db from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

const generateHash = (data: string): string => {
  const hash = CryptoJS.SHA256(data).toString();
  return hash;
};

const RoomForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>(''); // 所在地の状態
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !location) {
      alert('すべてのフィールドを入力してください。');
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

        setName('');
        setLocation('');
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="所在地"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          登録
        </Button>
      </Box>
    </Container>
  );
};

export default RoomForm;
