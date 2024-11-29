import { For } from 'solid-js';
import styles from './PenilaiandanTugas.module.css';
import tugasIcon from '../../img/task.svg';
import doneIcon from '../../img/done.svg';
import Navbar from '../../Navbar/navbar';
import Sidebar from '../../Sidebar/sidebar';

interface Task {
    icon: string;
    title: string;
    date?: string;
    status?: 'Selesai' | 'Belum dinilai';
    score?: string;
}

const TaskItem = (props: { task: Task }) => (
    <div class={styles.penilaianTaskItem}>
        <div class={styles.penilaianTaskInfo}>
            <img src={props.task.icon} alt="task icon" class={styles.penilaianTaskIcon} />
            <span class={styles.penilaianTaskTitle}>{props.task.title}</span>
        </div>
        {props.task.date && <span class={styles.penilaianTaskDate}>{props.task.date}</span>}
        {props.task.status && (
            <div class={styles.penilaianTaskStatus}>
                <span>{props.task.status}</span>
                {props.task.status === 'Selesai' && (
                    <img src={doneIcon} alt="done status" class={styles.penilaianStatusIcon} />
                )}
            </div>
        )}
        {props.task.score && <span class={styles.penilaianTaskScore}>{props.task.score}</span>}
    </div>
);

const TaskSection = (props: { title: string; tasks: Task[] }) => (
    <div class={styles.penilaianTaskSection}>
        <h2 class={styles.penilaianSectionTitle}>{props.title}</h2>
        <For each={props.tasks}>
            {(task) => <TaskItem task={task} />}
        </For>
    </div>
);

export const Tugas = () => {
    const unfinishedTasks: Task[] = [
        { icon: tugasIcon, title: 'Latihan Soal PAS XII IPA', date: 'Tenggat: Jumat, 03 Januari 2025 (20:00 WIB)' },
        { icon: tugasIcon, title: 'Latihan Soal PAS XII Bahasa Indonesia', date: 'Tenggat: Senin, 06 Januari 2025 (21:00 WIB)' },
    ];

    const thisWeekTasks: Task[] = [
        { icon: tugasIcon, title: 'LKPD 1 Sejarah (Homo Sapiens)', status: 'Selesai', score: '100/100' },
        { icon: tugasIcon, title: 'LKPD 2 Matematika (Kalkulus)', status: 'Belum dinilai' },
        { icon: tugasIcon, title: 'LKPD 3 Bahasa Indonesia (Kata Kiasan)', status: 'Belum dinilai' },
    ];

    const lastMonthTasks: Task[] = [
        { icon: tugasIcon, title: 'LKPD 1 Sejarah (Homo Sapiens)', status: 'Selesai', score: '100/100' },
    ];

    return (
        <div class="penilaian-container">
            <Sidebar />
            <Navbar />
            <div class={styles.penilaianTugasContainer}>
                <TaskSection title="Belum Dikerjakan (2)" tasks={unfinishedTasks} />
                <TaskSection title="Minggu Ini" tasks={thisWeekTasks} />
                <TaskSection title="Bulan Lalu" tasks={lastMonthTasks} />
            </div>
        </div>
    );
};

export default Tugas;
