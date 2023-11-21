// CustomHeader.tsx
import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { useMediaQuery, Button, Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

const CustomHeader: React.FC<ToolbarProps> = ({ label, onNavigate, onView, view }) => {
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    const getButtonStyle = (buttonView: string) => ({
        borderColor: 'black', // これで常にボーダー色を黒に設定します
        color: 'black', // これで常に文字色を黒に設定します
        backgroundColor: view === buttonView ? '#f0f0f0' : '',
        '&:hover': {
            borderColor: 'black', // ホバー時もボーダー色を黒に保持します
            backgroundColor: view === buttonView ? '#e0e0e0' : '',
        },
    });

    return (
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
                <IconButton onClick={() => onNavigate('PREV')}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => onNavigate('TODAY')}>
                    <TodayIcon />
                </IconButton>
                <IconButton onClick={() => onNavigate('NEXT')}>
                    <ChevronRightIcon />
                </IconButton>
            </Grid>

            <Grid item xs>
                <div style={{ textAlign: 'center', flexGrow: 1 }}>
                    {label} 日
                </div>
            </Grid>

            <Grid item>
                {!isSmallScreen && (
                    <>
                        <Button
                            variant="outlined"
                            sx={getButtonStyle('week')}
                            onClick={() => onView('week')}
                        >
                            週
                        </Button>
                        <Button
                            variant="outlined"
                            sx={getButtonStyle('agenda')}
                            onClick={() => onView('agenda')}
                        >
                            予定リスト
                        </Button>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default CustomHeader;