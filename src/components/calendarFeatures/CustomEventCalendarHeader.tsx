import React, { ElementType } from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import { Button, Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

interface NavigationIconButtonProps {
    onClick: () => void;
    icon: ElementType;
}

const NavigationIconButton: React.FC<NavigationIconButtonProps> = ({ onClick, icon: Icon }) => (
    <IconButton onClick={onClick}>
        <Icon />
    </IconButton>
);

const renderButton = (buttonView: View, label: string, currentView: View, onView: (view: View) => void) => (
    <Button
        variant="outlined"
        className={`view-button ${currentView === buttonView ? 'active' : ''}`}
        onClick={() => onView(buttonView)}
    >
        {label}
    </Button>
);

const CustomHeader: React.FC<ToolbarProps> = ({ label, onNavigate, onView, view }) => (
    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item>
            <NavigationIconButton onClick={() => onNavigate('PREV')} icon={ChevronLeftIcon} />
            <NavigationIconButton onClick={() => onNavigate('TODAY')} icon={TodayIcon} />
            <NavigationIconButton onClick={() => onNavigate('NEXT')} icon={ChevronRightIcon} />
        </Grid>

        <Grid item xs>
            <div style={{ textAlign: 'center', flexGrow: 1 }}>
                {label} 日
            </div>
        </Grid>

        <Grid item>
            {renderButton('day', '日', view, onView)}
            {renderButton('week', '週', view, onView)}
            {renderButton('agenda', '予定リスト', view, onView)}
        </Grid>
    </Grid>
);

export default CustomHeader;
