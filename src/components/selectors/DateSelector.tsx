//DateSelector.tsx
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onSelectDate }) => {

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

export default DateSelector