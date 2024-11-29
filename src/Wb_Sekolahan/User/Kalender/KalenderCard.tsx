import { createSignal, For } from 'solid-js';
import styles from './KalenderCard.module.css'; // Ensure the CSS file is named correctly

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = createSignal(new Date(2025, 0, 1));

  const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const renderCalendar = () => {
    const { days, firstDay } = getDaysInMonth(currentMonth());
    const totalSlots = Math.ceil((days + firstDay) / 7) * 7;
    const calendarDays = [];

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDay + 1;
      calendarDays.push({
        day: i < firstDay || dayNumber > days ? '' : dayNumber,
        isCurrentMonth: i >= firstDay && dayNumber <= days,
      });
    }

    return calendarDays;
  };

  return (
    <div class={styles.calendar}>
      <h1 class={styles.title}>Kalender</h1>
      <h2 class={styles.monthYear}>
        {monthNames[currentMonth().getMonth()]} {currentMonth().getFullYear()}
      </h2>
      <div class={styles.weekDays}>
        <For each={daysOfWeek}>
          {(day) => <div class={styles.weekDay}>{day}</div>}
        </For>
      </div>
      <div class={styles.days}>
        <For each={renderCalendar()}>
          {(day) => (
            <div class={`${styles.day} ${day.isCurrentMonth ? '' : styles.otherMonth}`}>
              {day.day ? (
                day.day === 2 ? (
                  <div class={styles.highlightedDay}>{day.day}</div>
                ) : (
                  day.day
                )
              ) : (
                ''
              )}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Calendar;
