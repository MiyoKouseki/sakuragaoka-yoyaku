import React, { useEffect, useState } from 'react';
import { ActivityCalendar, ScheduleData } from '../components/calendarFeatures/ActivityCalendar';

import { fetchReservations } from '../services/fetchReservations';

const evaluateBookingTime = async (room: string, date: string): Promise<number> => {
  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);

  const events = await fetchReservations(room, new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString());

  const bookedMinutes = events.reduce((total, event) =>
    total + (new Date(event.endTime).getTime() - new Date(event.startTime).getTime()) / 60000, 0);

  const score = Math.ceil(bookedMinutes / 360); // 360 = 24 * 60 / 4
  return Math.min(score, 4); // 戻り値を0から4の範囲に保証
};

const WelcomeComponent: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const startDate = new Date('2023-12-09');
      const rooms = ['第2会議室', '体育室A面', '体育室B面', '部屋A']; // ここに必要な場所のリストを追加
      const newScheduleData: ScheduleData[] = [];

      for (const room of rooms) {
        const cellStatuses = [];
        const dayLabels = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateString = date.toISOString().split('T')[0];

          const score = await evaluateBookingTime(room, dateString);
          cellStatuses.push(score);
          dayLabels.push((i + 1).toString());
        }

        newScheduleData.push({
          rowLabel: room,
          cellStatuses,
        });
      }

      setScheduleData(newScheduleData);
    };

    loadData();
  }, []);

  return (
    <ActivityCalendar scheduleData={scheduleData} />
  );
};

export default WelcomeComponent;
