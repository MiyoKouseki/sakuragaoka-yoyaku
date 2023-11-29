//BuildingSelector.tsx
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import BuildingType from '../../types/buildingTypes';
import { chipStyle } from '../../styles/commonStyles';

const BuildingSelector = ({
    selectedBuilding,
    onSelectBuilding
}: {
    selectedBuilding: BuildingType;
    onSelectBuilding: (building: BuildingType) => void;
}) => {
    return (
        <Grid item xs={10}>
            {(['桜ヶ丘体育館', 'サンビレッジ', '建物C'] as BuildingType[]).map(building => (
                <Chip
                    key={building}
                    label={building}
                    style={chipStyle}
                    onClick={() => onSelectBuilding(building)}
                    color={selectedBuilding === building ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};

export default BuildingSelector;