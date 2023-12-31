// ReservationRegisterForm.tsx
import React, { useEffect, useState } from 'react';
import { Button, Box, Container } from '@mui/material';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { generateHash } from '../../../utils/generateHash';
import { Timestamp } from 'firebase/firestore';
import { DateTimeSelector } from '../../../components/selectors/DateSelector';


const ReservationRegisterForm: React.FC = () => {
    const [rooms, setRooms] = useState<{ id: string, name: string }[]>([]);
    const [organizations, setOrganizations] = useState<{ id: string, name: string }[]>([]);

    const [roomName, setRoomName] = useState<string>('');
    const [organizationName, setOrganizationName] = useState<string>('');
    const [startTime, setStartTime] = useState<string | null>('');
    const [endTime, setEndTime] = useState<string | null>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!roomName || !organizationName || !startTime || !endTime) {
            alert('すべてのフィールドを入力してください。');
            return;
        }

        try {
            const createdTime = Timestamp.now();
            const reservationData = { roomName, organizationName, startTime, endTime, createdTime };
            const dataString = JSON.stringify(reservationData);
            const documentId = generateHash(dataString);

            await setDoc(doc(db, 'reservations', documentId), reservationData);

            setRoomName('');
            setOrganizationName('');
            setStartTime('');
            setEndTime('');
            navigate('/'); // 適切なリダイレクト先に変更
        } catch (error: unknown) {
            let errorMessage = '予約登録中にエラーが発生しました';
            if (error instanceof Error) {
                errorMessage += ': ' + error.message;
            }
            alert(errorMessage);
        }
    };

    useEffect(() => {
        const fetchRoomsAndOrganizations = async () => {
            const firestore = getFirestore();

            // 部屋の取得
            const roomsCollection = collection(firestore, 'rooms');
            const roomsSnapshot = await getDocs(roomsCollection);
            const fetchedRooms = roomsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
            setRooms(fetchedRooms);

            // 団体の取得
            const organizationsCollection = collection(firestore, 'organizations');
            const organizationsSnapshot = await getDocs(organizationsCollection);
            const fetchedOrganizations = organizationsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
            setOrganizations(fetchedOrganizations);
        };

        fetchRoomsAndOrganizations();
    }, []);

    const handleStartDateTimeChange = (date: Date | null) => {
        if (date) {
            const offset = date.getTimezoneOffset();
            const adjustedDate = new Date(date.getTime() - (offset * 60000));
            setStartTime(adjustedDate.toISOString().slice(0, 16)); // Date オブジェクトを文字列に変換
        } else {
            setStartTime(null);
        }
    };

    const handleEndDateTimeChange = (date: Date | null) => {
        if (date) {
            const offset = date.getTimezoneOffset();
            const adjustedDate = new Date(date.getTime() - (offset * 60000));
            setEndTime(adjustedDate.toISOString().slice(0, 16)); // Date オブジェクトを文字列に変換
        } else {
            setEndTime(null);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>部屋名</InputLabel>
                    <Select
                        value={roomName || ''}
                        label="部屋名"
                        onChange={(e) => setRoomName(e.target.value as string)}
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room.id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>予約団体名</InputLabel>
                    <Select
                        value={organizationName}
                        label="予約団体名"
                        onChange={(e) => setOrganizationName(e.target.value as string)}
                    >
                        {organizations.map((organization) => (
                            <MenuItem key={organization.id} value={organization.name}>
                                {organization.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DateTimeSelector
                    selectedDateTime={startTime ? new Date(startTime) : null} // 文字列を Date オブジェクトに変換
                    onSelectDateTime={handleStartDateTimeChange}
                />
                <DateTimeSelector
                    selectedDateTime={endTime ? new Date(endTime) : null} // 文字列を Date オブジェクトに変換
                    onSelectDateTime={handleEndDateTimeChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    予約登録
                </Button>
            </Box>
        </Container>
    );
};

export default ReservationRegisterForm;
