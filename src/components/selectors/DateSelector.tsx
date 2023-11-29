//DateSelector.tsx
import { Grid,Chip } from "@mui/material";
import { chipStyle } from "../../styles/commonStyles";

const DateSelector = ({
    dates,
    selectedDate,
    onSelectDate
}: {
    dates: { display: string; value: string }[];
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
}) => {
    return (
        <Grid item xs={10}>
            {dates.map(({ display, value }) => (
                <Chip
                    key={display}
                    label={display}
                    onClick={() => onSelectDate(value)}
                    style={chipStyle}
                    color={selectedDate === value ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};
export default DateSelector;