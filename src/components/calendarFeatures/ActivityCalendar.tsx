import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';

// ScheduleCellコンポーネントの定義
type ScheduleCellProps = {
    scheduleStatus: number;
    dayLabel?: string;
};

// ScheduleRowコンポーネントの定義
type ScheduleRowProps = {
    cellStatuses: number[];
    dayLabels?: string[];
    rowLabel?: string;
};

export type ScheduleData = {
    rowLabel: string;
    cellStatuses: number[];
    dayLabels?: string[];
};

type ActivityCalendarProps = {
    scheduleData: ScheduleData[]; // 複数のスケジュールデータを受け取る
}; 

// 凡例の色定義
const colors: { [key: number]: string } = {
    0: '#EBEDF0', // 予定なし（淡い緑色）
    1: '#9BE9A8', // 予定があるが空きあり（少し濃い緑色）
    2: '#40C463',
    3: '#30A14E',
    4: '#216E39',
    5: '#FFB6C1', // 予定が埋まっている（淡い赤色）
};

const ScheduleCell: React.FC<ScheduleCellProps> = ({ scheduleStatus, dayLabel }) => {
    return (
        <Box sx={{ marginBottom: 1 }}>
            <Box sx={{
                width: 30,
                height: 30,
                backgroundColor: colors[scheduleStatus] || 'transparent',
                borderRadius: '4px'
            }} />
        </Box>
    );
};

const ScheduleRow: React.FC<ScheduleRowProps> = ({ cellStatuses, rowLabel }) => {
    return (
        <Grid container alignItems="center" spacing={1}>
            {rowLabel && (
                <Grid item sx={{ display: 'flex', alignItems: 'center', height: 30 }}>
                    <Typography>{rowLabel}</Typography>
                </Grid>
            )}
            {cellStatuses.map((status, index) => (
                <Grid item key={index}>
                    <ScheduleCell scheduleStatus={status} />
                </Grid>
            ))}
        </Grid>
    );
};

const ActivityLegend: React.FC = () => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Grid container alignItems="center" spacing={1}>
                <Grid item>
                    <Typography variant="caption">予約状況</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">少</Typography>
                </Grid>
                {Object.entries(colors).slice(0, -1).map(([status, color], index) => (
                    <Grid item key={index}>
                        <Box sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: color,
                            borderRadius: '4px',
                        }} />
                    </Grid>
                ))}
                <Grid item>
                    <Typography variant="caption">多</Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} sx={{ marginTop: 1 }}>
                <Grid item>
                    <Typography variant="caption">予約不可</Typography>
                </Grid>
                <Grid item>
                    <Box sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: colors[5], // 予約不可の色（赤色）
                        borderRadius: '4px',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
};


const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ scheduleData }) => {
    return (
        <Container>
            <Grid container direction="column" spacing={2}>
                {scheduleData.map((data, index) => (
                    <Grid item key={index}>
                        <ScheduleRow cellStatuses={data.cellStatuses} dayLabels={data.dayLabels} rowLabel={data.rowLabel} />
                    </Grid>
                ))}
                <Grid item>
                    <ActivityLegend />
                </Grid>
            </Grid>
        </Container>
    );
};

export { ActivityCalendar };
