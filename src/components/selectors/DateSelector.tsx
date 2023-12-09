//DateSelector.tsx
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


interface DateSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

interface DateTimeSelectorProps {
  selectedDateTime: Date | null;
  onSelectDateTime: (dateTime: Date | null) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ selectedDateTime, onSelectDateTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="日時を選択"
        timezone="Asia/Tokyo"
        value={selectedDateTime}
        onChange={onSelectDateTime}
        minutesStep={30}
        ampm={false}
      />
    </LocalizationProvider>
  );
}

export const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onSelectDate }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="日にちを選択"
        value={selectedDate}
        onChange={onSelectDate}
      />
    </LocalizationProvider>
  );
}

