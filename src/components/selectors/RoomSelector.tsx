//RoomSelector.tsx
import BuildingType from "../../types/buildingTypes";
import { Grid,Chip } from "@mui/material";
import { chipStyle } from "../../styles/commonStyles";

interface RoomSelectorProps {
    selectedBuilding: BuildingType;
    selectedRoom: string;
    onSelectRoom: (room: string) => void;
    rooms: { [key in BuildingType]: string[] }; // この行を追加
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
    selectedBuilding,
    selectedRoom,
    onSelectRoom,
    rooms
}) => {
    return (
        <Grid item xs={10}>
            {rooms[selectedBuilding].map(room => (
                <Chip
                    key={room}
                    label={room}
                    onClick={() => onSelectRoom(room)}
                    style={chipStyle}
                    color={selectedRoom === room ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};
export default RoomSelector;