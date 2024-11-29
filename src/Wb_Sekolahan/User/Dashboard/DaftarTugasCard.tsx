import { createSignal } from "solid-js";
import "./DaftarTugasCard.css";

const CardComponent = () => {
    const [tasks, setTasks] = createSignal([
        { title: "Matematika: Fungsi dan Grafik", time: "12.00 WIB", dueDate: "10 Januari 2025" },
        { title: "Kimia: Merangkum Materi Kesetimbangan Kimia", time: "00.00 WIB", dueDate: "16 Januari 2025" },
        { title: "Bahasa Indonesia: Membuat Teks Eksplanasi", time: "20.00 WIB", dueDate: "01 Januari 2025", missed: true },
        { title: "Fisika: Ulangan Harian Materi Gelombang Elektromagnetik", time: "11.00 WIB", dueDate: "30 Desember 2024", completed: true },
        { title: "Pendidikan Pancasila: Membuat Makalah", time: "00.00 WIB", dueDate: "25 Desember 2024", completed: true },
        { title: "Bahasa Inggris: Write an analytical exposition text", time: "20.00 WIB", dueDate: "24 Desember 2024", completed: true },
    ]);

    const [showMissed, setShowMissed] = createSignal(true);
    const [showCompleted, setShowCompleted] = createSignal(true);

    const toggleTaskStatus = (taskIndex: number) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
            return updatedTasks;
        });
    };

    return (
        <div class="task-card">
            <div class="task-card__header">
                <h2 class="task-card__title">Daftar Tugas</h2>
                <button class="lihat-semua-btn">Lihat Semua</button>
            </div>

            {/* Tugas Biasa */}
            <div class="task-card__group">
                <h3>Tugas</h3>
                <div class="task-card__list">
                    {tasks()
                        .filter((task) => !task.completed && !task.missed)
                        .map((task, index) => (
                            <div class="task-card__item">
                                <input
                                    type="radio"
                                    checked={task.completed}
                                    onChange={() => toggleTaskStatus(index)}
                                />
                                <div class="task-card__content">
                                    <h3>{task.title}</h3>
                                    <div class="task-card__time-date">
                                        <p>Tenggat: {task.time}</p>
                                        <p>{task.dueDate}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Tugas Terlewat */}
            <div class="task-card__group">
                <h3 onClick={() => setShowMissed(!showMissed())}>
                    Melewati Tenggat Waktu {showMissed() ? "↓" : "→"}
                </h3>
                {showMissed() && (
                    <div class="task-card__list">
                        {tasks()
                            .filter((task) => task.missed)
                            .map((task, index) => (
                                <div class="task-card__item task-card__item--missed">
                                    <input
                                        type="radio"
                                        checked={task.completed}
                                        onChange={() => toggleTaskStatus(index)}
                                    />
                                    <div class="task-card__content">
                                        <h3>{task.title}</h3>
                                        <div class="task-card__time-date">
                                            <p>Tenggat: {task.time}</p>
                                            <p>{task.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Tugas Selesai */}
            <div class="task-card__group">
                <h3 onClick={() => setShowCompleted(!showCompleted())}>
                    Tugas Selesai {showCompleted() ? "↓" : "→"}
                </h3>
                {showCompleted() && (
                    <div class="task-card__list">
                        {tasks()
                            .filter((task) => task.completed)
                            .map((task, index) => (
                                <div class="task-card__item task-card__item--completed">
                                    <input
                                        type="radio"
                                        checked={task.completed}
                                        onChange={() => toggleTaskStatus(index)}
                                    />
                                    <div class="task-card__content">
                                        <h3>{task.title}</h3>
                                        <div class="task-card__time-date">
                                            <p>Tenggat: {task.time}</p>
                                            <p>{task.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardComponent;
