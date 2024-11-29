import { For } from 'solid-js';
import styles from './jadwal.module.css';
import Sidebar from '../../Sidebar/sidebar';
import Navbar from '../../Navbar/navbar';

const scheduleData = [
  { time: '07.00-08.00', senin: 'Matematika', selasa: 'PPKN', rabu: 'Kimia', kamis: 'B.Inggris', jumat: 'PPKN' },
  { time: '08.00-09.00', senin: 'Matematika', selasa: 'PPKN', rabu: 'Kimia', kamis: 'B.Inggris', jumat: 'PPKN' },
  { time: '09.05-09.30', senin: 'Istirahat', selasa: 'Istirahat', rabu: 'Istirahat', kamis: 'Istirahat', jumat: 'Istirahat' },
  { time: '09.30-10.20', senin: 'B. Indonesia', selasa: 'Biologi', rabu: 'Matematika', kamis: 'Kimia', jumat: 'Biologi' },
  { time: '10.25-11.55', senin: 'Sejarah', selasa: 'Biologi', rabu: 'Matematika', kamis: 'Matematika', jumat: 'Biologi' },
  { time: '12.00-13.00', senin: 'Istirahat', selasa: 'Istirahat', rabu: 'Istirahat', kamis: 'Istirahat', jumat: 'Istirahat' },
  { time: '12.00-13.00', senin: 'PPKN', selasa: 'B. Indonesia', rabu: 'Sejarah', kamis: 'PPKN', jumat: 'B. Indonesia' },
  { time: '13.05-14.25', senin: 'PPKN', selasa: 'B. Indonesia', rabu: 'Sejarah', kamis: 'PPKN', jumat: 'B. Indonesia' },
];

const subjectClasses = {
  'Matematika': styles.matematika,
  'PPKN': styles.ppkn,
  'Kimia': styles.kimia,
  'B.Inggris': styles.bInggris,
  'B. Indonesia': styles.bIndonesia,
  'Biologi': styles.biologi,
  'Sejarah': styles.sejarah,
  'Istirahat': styles.istirahat,
};

export const Jadwal = () => {
  return (
    <div class="jadwal-user">
      <Sidebar />
      <Navbar />
      <div class={styles.jadwalContainer}>
      <table class={styles.jadwalTable}>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Senin</th>
            <th>Selasa</th>
            <th>Rabu</th>
            <th>Kamis</th>
            <th>Jumat</th>
          </tr>
        </thead>
        <tbody>
          <For each={scheduleData}>
            {(row) => (
              <tr>
                <td class={styles.timeCell}>{row.time}</td>
                {(['senin', 'selasa', 'rabu', 'kamis', 'jumat'] as const).map((day) => (
                  <td>
                    <div class={`${styles.subjectCell} ${subjectClasses[row[day] as keyof typeof subjectClasses] || ''}`}>
                      {row[day]}
                    </div>
                  </td>
                ))}
              </tr>
            )}
          </For>
        </tbody>
      </table>
      </div>
    </div>
  );
};
export default Jadwal;