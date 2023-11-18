import React, { useState } from 'react';
import { createHash } from 'crypto';
import { TextField, Button, Box, Container } from '@mui/material';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import db from './firebaseConfig';



const generateHash = (data: string): string => {
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
};

const OrganizationForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [representative, setRepresentative] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
        
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();
	if (!name || !representative || !phone) {
	    alert('すべてのフィールドを入力してください。');
	    return;
	}	
	try {
	    const orgQuery = query(collection(db, 'organizations'), where('name', '==', name));
	    const querySnapshot = await getDocs(orgQuery);
	    
	    if (!querySnapshot.empty) {
		alert('この団体名は既に使用されています。');
	    } else {
		const orgData = { name, representative, phone };
		const dataString = JSON.stringify(orgData);
		const documentId = generateHash(dataString);

		await addDoc(collection(db, 'organizations'), { ...orgData, id: documentId });

		alert('団体が登録されました！');
		setName('');
		setRepresentative('');
		setPhone('');
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
          label="団体名"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="representative"
          label="代表者名"
          name="representative"
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="代表者電話番号"
          name="phone"
	value={phone}
          onChange={(e) => setPhone(e.target.value)}	
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

export default OrganizationForm;
