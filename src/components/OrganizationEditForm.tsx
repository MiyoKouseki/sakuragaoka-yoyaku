//OrganizationEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Container } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';


interface Organization {
  name: string;
  representative: string;
  phone: string;
}

interface RouteParams {
  [key: string]: string | undefined;
}

const OrganizationEditForm: React.FC = () => {
  //const { documentId } = useParams() as RouteParams;
  const { documentId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState<Organization>({ name: '', representative: '', phone: '' });

  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (documentId) {
        const docRef = doc(db, 'organizations', documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrganization(docSnap.data() as Organization);
        }
      };
    };

    if (documentId) {
      fetchOrganizationData();
    }
  }, [documentId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, representative, phone } = organization;
  
    if (!name || !representative || !phone) {
      alert('すべてのフィールドを入力してください。');
      return;
    }

    try {
      if (documentId) {
        await setDoc(doc(db, 'organizations', documentId), { name, representative, phone });
        //alert('団体情報が更新されました！');
        navigate('/organization/list');
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
          label="団体名"
          name="name"
          value={organization.name}
          onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="representative"
          label="代表者名"
          name="representative"
          value={organization.representative}
          onChange={(e) => setOrganization({ ...organization, representative: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="代表者電話番号"
          name="phone"
          value={organization.phone}
          onChange={(e) => setOrganization({ ...organization, phone: e.target.value })}
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

export default OrganizationEditForm;
