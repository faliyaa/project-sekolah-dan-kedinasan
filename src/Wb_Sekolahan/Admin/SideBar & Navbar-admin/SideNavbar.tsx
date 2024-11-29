import { Component, createSignal, JSX } from 'solid-js';
import styles from './SideNavbar.module.css';
import IconDashboard from '../../Admin/AssetAdmin/IconDashboard.svg';
import IconDataSiswa from '../../Admin/AssetAdmin/IconDataSiswa.svg';
import IconEkstrakulikuler from '../../Admin/AssetAdmin/IconEkstrakulikuler.svg';
import IconDataGuru from '../../Admin/AssetAdmin/IconDataGuru.svg';
import IconTranskripNilai from '../../Admin/AssetAdmin/IconTranskripNilai.svg';
import IconKalender from '../../Admin/AssetAdmin/iconKalender.svg'
import IconPengaturan from '../../Admin/AssetAdmin/IconPengaturan.svg';
import IconKeluar from '../../Admin/AssetAdmin/IconKeluar.svg';
import IconJadwalPelajaran from '../../Admin/AssetAdmin/IconJadwalPelajaran.svg';
import IconDashboardWhite from '../../Admin/AssetAdmin/IconDashboard-White.svg';
import IconDataSiswaWhite from '../../Admin/AssetAdmin/IconDataSiswa-White.svg';
import IconEkstrakulikulerWhite from '../../Admin/AssetAdmin/IconEkstrakulikuler-White.svg';
import IconDataGuruWhite from '../../Admin/AssetAdmin/IconDataGuru-White.svg';
import IconTranskripNilaiWhite from '../../Admin/AssetAdmin/iconTranskripNilai-White.svg';
import IconJadwalPelajaranWhite from '../../Admin/AssetAdmin/iconJadwalPelajaran-White.svg';
import IconKalenderWhite from '../../Admin/AssetAdmin/iconKalender-White.svg'
import TranskripNilai from '../TranskripNilai-admin/TranskripNilai';
import Dashboard from '../Dashboard/Dashboard-admin';
import DataEkstrakulikuler from '../Data Ekstrakulikuler/DataEkstrakulikuler';
import DataGuru from '../Data Guru/DataGuru';
import Kalender from '../Kalender/CalendarAdmin';
import { DataSiswa } from '../Data Siswa/DataSiswa';
import JadwalPelajaran from '../Jadwal Pelajaran/JadwalPelajaran';
import CalendarAdmin from '../Kalender/CalendarAdmin';

const SideNavbar: Component = () => {
  const [activeItem, setActiveItem] = createSignal('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: IconDashboard, activeIcon: IconDashboardWhite },
    { name: 'Data Siswa', icon: IconDataSiswa, activeIcon: IconDataSiswaWhite },
    { name: 'Ekstrakulikuler', icon: IconEkstrakulikuler, activeIcon: IconEkstrakulikulerWhite },
    { name: 'Data Guru', icon: IconDataGuru, activeIcon: IconDataGuruWhite },
    { name: 'Transkrip Nilai', icon: IconTranskripNilai, activeIcon: IconTranskripNilaiWhite },
    { name: 'Jadwal Pelajaran', icon: IconJadwalPelajaran, activeIcon: IconJadwalPelajaranWhite },
    { name: 'kalender', icon: IconKalender, activeIcon: IconKalenderWhite },
  ];

  const renderContent = (): JSX.Element => {
    switch (activeItem()) {
      case 'Transkrip Nilai':
        return <TranskripNilai />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Ekstrakulikuler':
        return <DataEkstrakulikuler />;
      case 'Data Guru':
        return <DataGuru />;
      case 'Jadwal Pelajaran':
        return <JadwalPelajaran />;
      case 'Data Siswa':
        return < DataSiswa />;
      case 'kalender':
        return <CalendarAdmin />;
      default:
        return <div class="content-Admin">Content for {activeItem()} goes here</div>;
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.sidebar}>
        <h1 class={styles.title}>Untitle</h1>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li>
                <a
                  href="#"
                  class={`${styles.menuItem} ${activeItem() === item.name ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.name);
                  }}
                >
                  <img
                    src={activeItem() === item.name ? item.activeIcon : item.icon}
                    alt={item.name}
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div class={styles.bottomNav}>
          <a href="#" class={styles.menuItem}>
            <img src={IconPengaturan} alt="Pengaturan" />
            Pengaturan
          </a>
          <a href="#" class={`${styles.menuItem} ${styles.logout}`}>
            <img src={IconKeluar} alt="Keluar" />
            Keluar
          </a>
        </div>
      </div>
      <div class={styles.mainContent}>
        <header class={styles.navbar}>
          <div class={styles.searchBar}>
            <input type="text" placeholder="Search" />
          </div>
          <div class={styles.userInfo}>
            <span class={styles.notificationBadge}>2</span>
            <select class={styles.languageSelect}>
              <option value="en">English</option>
            </select>
            <div class={styles.userProfile}>
              <img src="" alt="User" />
              <span>PRIYONO</span>
              <span>Admin</span>
            </div>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default SideNavbar;