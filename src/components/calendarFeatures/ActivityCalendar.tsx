import React from 'react';
import { Container, Box, Typography, Grid, Divider } from '@mui/material';

// ScheduleCellコンポーネントの定義
type ScheduleCellProps = {
    scheduleStatus: number;
    label: string;
};

// ScheduleRowコンポーネントの定義
type ScheduleRowProps = {
    cellStatuses: number[];
    rowLabel?: string;
    dayLabels: string[];
};

export type ScheduleData = {
    rowLabel: string;
    cellStatuses: number[];
    dayLabels: string[];
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
                            width: 15,
                            height: 15,
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
                        width: 15,
                        height: 15,
                        backgroundColor: colors[5], // 予約不可の色（赤色）
                        borderRadius: '4px',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
};

const ScheduleCell: React.FC<ScheduleCellProps> = ({ scheduleStatus , label}) => {
    return (
        <Box
            sx={{
                flexGrow: 1, // セルが利用可能なスペースを均等に埋めるように設定
                width: 40,
                height: 30,
                backgroundColor: colors[scheduleStatus] || 'transparent',
                borderRadius: '4px',
                display: 'flex', // 追加
                alignItems: 'center', // 追加
                justifyContent: 'center', // 追加
            }}
        >
            <Typography variant="caption">{label}</Typography>
        </Box>
    );
};


const ScheduleRow: React.FC<ScheduleRowProps> = ({ cellStatuses, dayLabels }) => {
    return (
        <Grid container alignItems="center" spacing={1}>
            {cellStatuses.map((status, index) => (
                <Grid item key={index}>
                    <ScheduleCell scheduleStatus={status} label={dayLabels[index]} />
                </Grid>
            ))}
        </Grid>
    );
};



const DayLabelsRow: React.FC<{ dayLabels: string[] }> = ({ dayLabels }) => {
    return (
        <Grid container alignItems="center" spacing={1}>
            {dayLabels.map((label, index) => (
                <Grid item key={index} style={{ width: 40, textAlign: 'center' }}>
                    <Typography>{label}</Typography>
                </Grid>
            ))}
        </Grid>
    );
};


const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ scheduleData }) => {
    return (
        <Container>
            <Grid container direction="column" spacing={0}>
                {scheduleData.map((data, index) => (
                    <Grid item key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={2}>
                            {data.rowLabel && (
                                <Typography>{data.rowLabel}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={10}>
                            <ScheduleRow cellStatuses={data.cellStatuses} dayLabels={data.dayLabels}/>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid item>
                <ActivityLegend />
            </Grid>
        </Container >
    );
};

export { ActivityCalendar };
