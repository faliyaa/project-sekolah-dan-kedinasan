import { For, createSignal } from 'solid-js';
import './JadwalCard.css';

interface ScheduleItem {
  time: string;
  period: string;
  subject: string;
}

interface DaySchedule {
  day: string;
  schedule: ScheduleItem[];
}

const Schedule = () => {
  const [scheduleData] = createSignal<DaySchedule[]>([
    {
      day: 'Senin',
      schedule: [
        { time: '07:00-09:00', period: 'Jam ke-1', subject: 'Matematika' },
        { time: '09:15-10:45', period: 'Jam ke-2', subject: 'Kimia' },
        { time: '10:45-12:00', period: 'Jam ke-3', subject: 'Bahasa Indonesia' },
      ],
    },
    {
      day: 'Selasa',
      schedule: [
        { time: '07:00-09:00', period: 'Jam ke-1', subject: 'Matematika' },
        { time: '09:15-10:45', period: 'Jam ke-2', subject: 'Kimia' },
        { time: '10:45-12:00', period: 'Jam ke-3', subject: 'Bahasa Indonesia' },
      ],
    },
    {
      day: 'Rabu',
      schedule: [
        { time: '07:00-09:00', period: 'Jam ke-1', subject: 'Matematika' },
        { time: '09:15-10:45', period: 'Jam ke-2', subject: 'Kimia' },
        { time: '10:45-12:00', period: 'Jam ke-3', subject: 'Bahasa Indonesia' },
      ],
    },
    {
      day: 'Kamis',
      schedule: [
        { time: '07:00-09:00', period: 'Jam ke-1', subject: 'Matematika' },
        { time: '09:15-10:45', period: 'Jam ke-2', subject: 'Kimia' },
        { time: '10:45-12:00', period: 'Jam ke-3', subject: 'Bahasa Indonesia' },
      ],
    },
  ]);

  return (
    <div class="schedule-container">
      <div class="schedule-header">
        <h2>Jadwal</h2>
        <a href="#" class="view-all">Lihat Semua</a>
      </div>
      <div class="schedule-content">
        <For each={scheduleData()}>
          {(day) => (
            <div class="day-schedule">
              <h3>{day.day}</h3>
              <For each={day.schedule}>
                {(item) => (
                  <div class="schedule-item">
                    <div class="time">{item.time}</div>
                    <div class="subject-info">
                      <div class="period">{item.period}</div>
                      <div class="subject">{item.subject}</div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Schedule;