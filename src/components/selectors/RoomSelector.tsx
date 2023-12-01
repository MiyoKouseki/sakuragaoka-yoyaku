import React from 'react';
import BuildingType from '../../types/buildingTypes';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface RoomSelectorProps {
    selectedBuilding: BuildingType;
    selectedRoom: string;
    onSelectRoom: (room: string) => void;
    rooms: { [key in BuildingType]: string[] };
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
    selectedBuilding,
    selectedRoom,
    onSelectRoom,
    rooms
}) => {
    return (
        <Grid item xs={10}>
            <FormControl fullWidth>
                <InputLabel id="room-selector-label">部屋を選択</InputLabel>
                <Select
                    labelId="room-selector-label"
                    id="room-selector"
                    value={selectedRoom}
                    label="部屋を選択"
                    onChange={(e) => onSelectRoom(e.target.value as string)}
                >
                    {rooms[selectedBuilding].map((room) => (
                        <MenuItem key={room} value={room}>
                            {room}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default RoomSelector;
