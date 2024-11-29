import { createSignal, For } from 'solid-js';
import styles from './riwayatabsensi.module.css';
import dropdown from '../img/Arrow_Dropdown_icon.svg';
import time from '../img/time.svg';

const AttendanceHistory = () => {
  const [isExpanded22, setIsExpanded22] = createSignal(false);
  const [isExpanded23, setIsExpanded23] = createSignal(false);

  const scheduleItems22 = [
    { name: 'XII - MATWA MATEMATIKA WAJIB', time: '08:00- 10:00 WIB' },
    { name: 'XII - BAHASA INGGRIS', time: '11:00 - 14:00 WIB' },
    { name: 'XII - FISIKA', time: '14:30 - 16:00 WIB' },
  ];

  const scheduleItems23 = [
    { name: 'XII - KIMIA', time: '08:00- 10:00 WIB' },
    { name: 'XII - FISIKA', time: '11:00- 14:00 WIB' },
    { name: 'XII - BIOLOGI', time: '14:30 - 16:00 WIB' },
  ];

  const toggleExpand22 = () => setIsExpanded22(!isExpanded22());
  const toggleExpand23 = () => setIsExpanded23(!isExpanded23());

  const renderScheduleItems = (items, isExpanded) => (
    isExpanded() && (
      <div class={styles.scheduleList}>
        <For each={items}>
          {(item) => (
            <div class={styles.scheduleItem}>
              <div class={styles.checkboxContainer}>
                <input type="checkbox" id={item.name} />
                <label for={item.name}></label>
              </div>
              <div class={styles.itemDetails}>
                <span class={styles.itemName}>{item.name}</span>
                <div class={styles.timeContainer}>
                  <img src={time} alt="Time" class={styles.timeIcon} />
                  <span class={styles.itemTime}>{item.time}</span>
                </div>
              </div>
              <span class={styles.attendanceStatus}>Hadir</span>
            </div>
          )}
        </For>
      </div>
    )
  );

  return (
    <div class={styles.container}>
      <div class={styles.header}>
      </div>
      <div class={styles.dateSection}>
        <div class={styles.dateContainer}>
          <span class={styles.date}>22 September 2024</span>
          <img
            src={dropdown}
            alt="Dropdown"
            class={`${styles.dropdownIcon} ${isExpanded22() ? styles.expanded : ''}`}
            onClick={toggleExpand22}
          />
        </div>
        {renderScheduleItems(scheduleItems22, isExpanded22)}
      </div>
      <div class={styles.dateSection}>
        <div class={styles.dateContainer}>
          <span class={styles.date}>23 September 2024</span>
          <img
            src={dropdown}
            alt="Dropdown"
            class={`${styles.dropdownIcon} ${isExpanded23() ? styles.expanded : ''}`}
            onClick={toggleExpand23}
          />
        </div>
        {renderScheduleItems(scheduleItems23, isExpanded23)}
      </div>
    </div>
  );
};

export default AttendanceHistory;