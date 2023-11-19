// src/components/RoomFormFields.tsx
import React from 'react';
import { Button, TextField } from '@mui/material';
import { Room } from '../interfaces/Entity';

interface RoomFormFieldsProps {
    room: Room;
    setRoom: (room: Room) => void;
}

const RoomFormFields: React.FC<RoomFormFieldsProps> = ({ room, setRoom }) => {
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="部屋名"
                name="name"
                value={room.name}
                onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="所在地"
                name="location"
                value={room.location}
                onChange={(e) => setRoom({ ...room, location: e.target.value })}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                登録
            </Button>
            {/* 他のフィールド */}
        </>
    );
};

export default RoomFormFields;
