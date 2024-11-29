import { createSignal, For } from 'solid-js';
import Navbar from '../Navbar/navbar';
import Sidebar from '../Sidebar/sidebar';
import background from '../img/background.png';
import absenuser from '../img/absen-user.svg';
import AttendanceHistory from './riwayatabsensi';
import Calendar from '../Kalender/calendar';
import AttendancePopup from './absensipopup';
import './absen.css';

const Absen = () => {
  const [showPopup, setShowPopup] = createSignal(false);
  const [selectedDate, setSelectedDate] = createSignal('');

  const absensiData = [
    { date: 'Kamis, 2 Januari 2025' },
    { date: 'Jumat, 3 Januari 2025' },
    { date: 'Senin, 6 Januari 2025' },
    { date: 'Selasa, 7 Januari 2025' },
    { date: 'Rabu, 8 Januari 2025' },
    { date: 'Kamis, 9 Januari 2025' },
    { date: 'Jumat, 10 Januari 2025' },
    { date: 'Senin, 13 Januari 2025' },
    { date: 'Selasa, 14 Januari 2025' },
  ];

  const handleCardClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
    document.body.classList.add('dimmed');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.classList.remove('dimmed');
  };

  return (
    <>
      <div class="container">
        <Sidebar />
        <Navbar />

        <div class="title">
          <h2>Absensi Harian</h2>
        </div>
        <div class="calendar-container">
          <Calendar />
        </div>
        <div class="right-side">
          <h4>Riwayat Absensi</h4>
          <button>Lihat Semua</button>
          <AttendanceHistory />
        </div>
        <div class="card-container">
          <For each={absensiData}>
            {(item, index) => (
              <div class={`card card${index() + 1}`} onClick={() => handleCardClick(item.date)}>
                <img src={background} alt="Background" />
                <div class="card-in">
                  <img src={absenuser} alt="User" />
                  <p>Absensi Kehadiran</p>
                  <h4>{item.date}</h4>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {showPopup() && (
        <AttendancePopup
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Absen;