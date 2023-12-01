import React from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import BuildingType from '../../types/buildingTypes';

const BuildingSelector = ({
    selectedBuilding,
    onSelectBuilding
}: {
    selectedBuilding: BuildingType;
    onSelectBuilding: (building: BuildingType) => void;
}) => {
    return (
        <Grid item xs={10}>
            <FormControl fullWidth>
                <InputLabel id="building-selector-label">建物を選択</InputLabel>
                <Select
                    labelId="building-selector-label"
                    id="building-selector"
                    value={selectedBuilding}
                    label="建物を選択"
                    onChange={(e) => onSelectBuilding(e.target.value as BuildingType)}
                >
                    {(['桜ヶ丘体育館', 'サンビレッジ', '建物C'] as BuildingType[]).map((building) => (
                        <MenuItem key={building} value={building}>
                            {building}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default BuildingSelector;
