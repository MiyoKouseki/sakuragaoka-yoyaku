// src/components/RoomFormFields.tsx
import React from 'react';
import { Button, TextField } from '@mui/material';
import { Room } from '../../interfaces/Entity';

interface FormFieldsProps<T> {
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
}

const EntityFormFields: React.FC<FormFieldsProps<Room>> = ({ entity, setEntity }) => {
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="部屋名"
                name="name"
                value={entity.name}
                onChange={(e) => setEntity({ ...entity, name: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="建物名"
                name="location"
                value={entity.location}
                onChange={(e) => setEntity({ ...entity, location: e.target.value })}
            />
             <TextField
                margin="normal"
                required
                fullWidth
                id="category"
                label="カテゴリー"
                name="category"
                value={entity.category}
                onChange={(e) => setEntity({ ...entity, category: e.target.value })}
            />
             <TextField
                margin="normal"
                required
                fullWidth
                id="owner"
                label="所有者"
                name="owner"
                value={entity.owner}
                onChange={(e) => setEntity({ ...entity, owner: e.target.value })}
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

export default EntityFormFields;
