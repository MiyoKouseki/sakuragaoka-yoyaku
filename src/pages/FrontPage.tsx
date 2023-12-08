import React from 'react';
import { ActivityLegend, ScheduleRow } from '../components/calendarFeatures/ActivityCalendar';

const WelcomeComponent: React.FC = () => {
  return (
    <div>
      <ScheduleRow cellStatuses={[0, 1, 2, 2, 0, 2]} dayLabels={['1','2','3','4','5','6']} rowLabel='場所A' />
      <ScheduleRow cellStatuses={[0, 1, 2, 2, 0, 2]} rowLabel='場所B' />
      <ActivityLegend/>
    </div>
  );
};

export default WelcomeComponent;
