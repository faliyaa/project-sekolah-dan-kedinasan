import Sidebar from '../Sidebar/sidebar';
import Navbar from '../Navbar/navbar';
import Kalender from '../Kalender/KalenderCard';
import './DashboardUser.css';
import Mapel from './MapelCard';
import Jadwal from '../Akademik/Jadwal Pelajaran/JadwalCard';
import Pengumuman from './AnnouncementCard';
import Tugas from './DaftarTugasCard';


const Dashboard = () => {
  return (
    <div class="dashboard-user-container">
      <Sidebar />
      <Navbar />
      <div class="dashboard-user-main-content">
        <h1 class="H1">Proses Pengerjaan Tugas</h1>

        <div class="dashboard-group-1">
          <div class="pengumuman">
            <Pengumuman />
          </div>
          <div class="tugas">
            <Tugas />
          </div>
          <div class="mapel">
            <Mapel />
          </div>
        </div>

        <div class="dashboard-group-2">
          <div class="kalender">
            <Kalender />
          </div>
          <div class="jadwal">
            <Jadwal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;