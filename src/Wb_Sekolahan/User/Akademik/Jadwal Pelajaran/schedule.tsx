import { useNavigate } from '@solidjs/router';
import Navbar from '../../Navbar/navbar';
import Sidebar from '../../Sidebar/sidebar';
import styles from './schedule.module.css';
import Jadwal from './jadwal';
import { Component, createSignal } from "solid-js";

const Schedule: Component = () => {
    const [kelas, setKelas] = createSignal<string>('XI Merdeka 7'); // Explicitly set the type of the signal
    const [hari, setHari] = createSignal<string>('Selasa');

    const handleKelasChange = (e: Event) => {
        const target = e.target as HTMLSelectElement; // Explicitly cast the event target
        setKelas(target.value);
    };

    const handleHariChange = (e: Event) => {
        const target = e.target as HTMLSelectElement; // Cast the target
        setHari(target.value);
    };

    return (
        <>
            <div class="materi">
                <Sidebar />
                <Navbar />
                <div class={styles.scheduleContainer}>
                    <div class={styles.scheduleHeader}>
                        <div class={styles.headerContent}>
                            <h2 class={styles.scheduleTitle}>Jadwal Pelajaran</h2>
                            <div class={styles.scheduleControls}>
                                <select 
                                    class={styles.scheduleSelect} 
                                    onChange={handleKelasChange} // Use the new handler
                                    value={kelas()}
                                >
                                    {Array.from({ length: 11 }, (_, i) => `XI Merdeka ${i + 1}`).map((kelasOption) => (
                                        <option value={kelasOption}>{kelasOption}</option>
                                    ))}
                                </select>
                                <select 
                                    class={`${styles.scheduleSelect} ${styles.daySelect}`} 
                                    onChange={handleHariChange} // Use the new handler
                                    value={hari()}
                                >
                                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
                                        <option value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="jadwal">
                        <Jadwal kelas={kelas()} hari={hari()} /> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
