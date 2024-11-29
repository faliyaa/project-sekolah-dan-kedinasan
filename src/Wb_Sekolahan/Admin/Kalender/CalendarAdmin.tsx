import { createSignal, For } from 'solid-js';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import styles from './CalendarAdmin.module.css';

interface Event {
  date: string;
  title: string;
  description: string;
}

const CalendarAdmin = () => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [events, setEvents] = createSignal<Event[]>([
    { date: '2025-01-08', title: 'Outing Class', description: 'Kunjungan industri ke bandung' },
    { date: '2025-01-13', title: 'Ulangan Harian', description: 'Ada ulangan harian fisika' },
    { date: '2025-01-16', title: '!!!', description: "It's my birthday guisy xixizizi" },
    { date: '2025-01-27', title: 'Apel Pagi', description: 'Jangan lupa pake seragam' },
    { date: '2025-01-28', title: 'Senam bersama miss k', description: '(Tidak ada deskripsi)' },
  ]);

  const [selectedEvent, setSelectedEvent] = createSignal<Event | null>(null);
  const [showModal, setShowModal] = createSignal(false);
  const [showEditModal, setShowEditModal] = createSignal(false); // For edit modal
  const [newEvent, setNewEvent] = createSignal<Event>({ date: '', title: '', description: '' });

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

  const handleAddEvent = () => {
    setEvents([...events(), { ...newEvent() }]);
    setShowModal(false);
    setNewEvent({ date: '', title: '', description: '' }); // Reset form
  };

  const handleEditEvent = (date: string, updatedEvent: Partial<Event>) => {
    setEvents(events().map(event => (event.date === date ? { ...event, ...updatedEvent } : event)));
  };

  const changeYear = (increment: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear() + increment, prev.getMonth(), 1));
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEditModal(true); // Open modal for editing
  };

  const handleSaveEdit = () => {
    if (selectedEvent()) {
      handleEditEvent(selectedEvent()!.date, {
        title: selectedEvent()?.title,
        description: selectedEvent()?.description,
      });
      setShowEditModal(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div class={styles['penilaian-container']}>
      <button class={styles['add-event-button']} onClick={() => setShowModal(true)}>Tambah Kegiatan</button>

      {/* Modal for adding new event */}
      {showModal() && (
        <div class={styles['modal-backdrop']}>
          <div class={styles['modal']}>
            <h2>Tambah Kegiatan Baru</h2>
            <label>
              Tanggal:
              <input 
                type="date" 
                value={newEvent().date} 
                onInput={(e) => setNewEvent({ ...newEvent(), date: e.currentTarget.value })} 
              />
            </label>
            <label>
              Judul:
              <input 
                type="text" 
                value={newEvent().title} 
                onInput={(e) => setNewEvent({ ...newEvent(), title: e.currentTarget.value })} 
              />
            </label>
            <label>
              Deskripsi:
              <textarea 
                value={newEvent().description} 
                onInput={(e) => setNewEvent({ ...newEvent(), description: e.currentTarget.value })} 
              />
            </label>
            <button onClick={handleAddEvent}>Simpan</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      )}

      <div class={styles['calendar-content']}>
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
                  <button onClick={() => changeYear(-1)} class={styles['nav-button']}>
                    &lt;&lt; Tahun Sebelumnya
                  </button>
                  <button onClick={() => changeYear(1)} class={styles['nav-button']}>
                    Tahun Selanjutnya &gt;&gt;
                  </button>
                </div>
              </div>
              <div class={styles['calendar-grid']}>
                <For each={['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']}>
                  {(day) => <div class={styles['calendar-day']}>{day}</div>}
                </For>

                <For each={getDaysInMonth()}>
                  {(day) => {
                    const event = getEventForDate(day);
                    return (
                      <div
                        class={`${styles['day-cell']} 
                          ${!isSameMonth(day, currentDate()) ? styles['inactive'] : ''} 
                          ${isToday(day) ? styles['active'] : ''} 
                          ${event ? styles['has-event'] : ''}`}
                        onClick={() => event && handleEventClick(event)} // Show event details on click
                      >
                        <div>{format(day, 'd')}</div>

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

          {/* Edit Event Modal */}
          {showEditModal() && selectedEvent() && (
            <div class={styles['modal-backdrop']}>
              <div class={styles['modal']}>
                <h3>Edit Event</h3>
                <label>
                  Judul:
                  <input
                    type="text"
                    value={selectedEvent()?.title}
                    onInput={(e) => setSelectedEvent({ ...selectedEvent()!, title: e.currentTarget.value })}
                  />
                </label>
                <label>
                  Deskripsi:
                  <textarea
                    value={selectedEvent()?.description}
                    onInput={(e) => setSelectedEvent({ ...selectedEvent()!, description: e.currentTarget.value })}
                  />
                </label>
                <button onClick={handleSaveEdit}>Simpan</button>
                <button onClick={() => setShowEditModal(false)}>Batal</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarAdmin;
