import { createSignal, For } from 'solid-js';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import styles from './Kalender.module.css'; // Import the CSS module
import Navbar from '../Navbar/navbar'; // Import Navbar
import Sidebar from '../Sidebar/sidebar'; // Import Sidebar

interface Event {
  date: string;
  title: string;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [events, setEvents] = createSignal<Event[]>([
    { date: '2025-01-08', title: 'Outing Class', description: 'Kunjungan industri ke bandung' },
    { date: '2025-01-13', title: 'Ulangan Harian', description: 'Ada ulangan harian fisika' },
    { date: '2025-01-16', title: '!!!', description: "It's my birthday guisy xixizizi" },
    { date: '2025-01-27', title: 'Apel Pagi', description: 'Jangan lupa pake seragam + atribut lengkap' },
    { date: '2025-01-28', title: 'Senam bersama miss k', description: '(Tidak ada deskripsi)' },
  ]);

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate());
    const end = endOfMonth(currentDate());
    return eachDayOfInterval({ start, end });
  };

  const getEventForDate = (date: Date) => {
    return events().find(event => {
      const eventDate = parseISO(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  return (
    <div class={styles['penilaian-container']}> {/* Atur container menggunakan flexbox */}
      <Sidebar /> {/* Tambahkan Sidebar di sini */}
      <div class={styles['calendar-content']}> {/* Tambahkan div untuk konten kalender */}
        <Navbar /> {/* Tambahkan Navbar di atas konten kalender */}
        <div class={styles['calendar-container']}>
          <div class={styles['boxCalender']}>
            <div class={styles['calendar-main']}>
              <div class={styles['calendar-header']}>
                <h2 class={styles['calendar-title']}>{format(currentDate(), 'MMMM yyyy')}</h2>
                <div class={styles['calendar-navigation']}>
                  <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                          class={styles['nav-button']}>
                    &lt;
                  </button>
                  <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                          class={styles['nav-button']}>
                    &gt;
                  </button>
                </div>
              </div>
              <div class={styles['calendar-grid']}>
                {/* Render days of the week */}
                <For each={['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']}>
                  {(day) => <div class={styles['calendar-day']}>{day}</div>}
                </For>

                {/* Render calendar days */}
                <For each={getDaysInMonth()}>
                  {(day) => {
                    const event = getEventForDate(day);
                    return (
                      <div
                        class={`${styles['day-cell']} 
                          ${!isSameMonth(day, currentDate()) ? styles['inactive'] : ''} 
                          ${isToday(day) ? styles['active'] : ''} 
                          ${event ? styles['has-event'] : ''}`}
                      >
                        <div>{format(day, 'd')}</div>

                        {/* If the day has an event, show event details */}
                        {event && (
                          <div class={styles['event-label']}>
                            {event.title}
                          </div>
                        )}
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          </div>

          {/* Event list sidebar */}
          <div class={styles['event-sidebar']}>
            <h3 class={styles['event-sidebar-title']}>Daftar Kegiatan</h3>
            <div>
              <For each={events()}>
                {(event) => (
                  <div class={styles['event-card']}>
                    <div class={styles['event-date']}>
                      {format(parseISO(event.date), 'EEEE, dd MMMM yyyy')}
                    </div>
                    <div class={styles['event-title']}>{event.title}</div>
                    <div class={styles['event-description']}>{event.description}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
