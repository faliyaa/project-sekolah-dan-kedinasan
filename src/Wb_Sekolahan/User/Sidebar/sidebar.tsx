import { createSignal } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import buku from '../img/dashboard.svg';
import bukubold from '../img/bookbold.svg';
import akademik from '../img/akademik.svg';
import akademikbold from '../img/akademik-bold.svg'; // Ensure you have this bold version
import logo from '../img/logo.svg';
import logout from '../img/logout.svg';
import setting from '../img/setting.svg';
import absensibold from '../img/absensi-bold.svg';
import absensi from '../img/absensi1.svg';
import eskul from '../img/eskul.svg';
import eskulbold from '../img/eskulbold.svg';
import line from '../img/line.svg';
import search from '../img/search-normals.svg';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showOptions, setShowOptions] = createSignal(false);
  const [isActive, setIsActive] = createSignal(false);
  const [absensiActive, setAbsensiActive] = createSignal(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions());
  };

  const handleTranskripClick = () => {
    toggleOptions();
    setIsActive(!isActive());
    setAbsensiActive(false);
  };

  const handleClickAbsensi = () => {
    setAbsensiActive(true);
    navigate('/Absensi-user');
  };

  const handleClickDashboard = () => {
    setAbsensiActive(false);
    setIsActive(false);
    navigate('/Dashboard-user');
  };

  const handleClickEkstrakurikuler = () => {
    navigate('/Ekstra-user');
  };

  // Determine if specific routes are active
  const isAbsensiRouteActive = location.pathname === '/Absensi-user';
  const isDashboardActive = location.pathname === '/Dashboard-user';
  const isEkstrakurikulerActive = location.pathname === '/eskul';

  // Check if any of the academic routes are active
  const isAcademicRouteActive = [
    '/jadwal',
    '/detailquestion',
    '/penilaiandantugas',
    '/nilai',
  ].includes(location.pathname);

  return (
    <div class="sidebar">
      <div class="logo-sidebar">
        <img src={logo} alt="Logo" />
      </div>
      <div class="sidebar-content">
        <div class="sidebar-menu">
          <div class="pembelajaran" onclick={handleClickDashboard}>
            <img src={isDashboardActive ? bukubold : buku} alt="Dashboard" />
            <h4 class={isDashboardActive ? 'active' : ''}>Dashboard</h4>
          </div>

          <div class="transkrip" onclick={handleTranskripClick}>
            <img src={isAcademicRouteActive ? akademikbold : akademik} alt="Transkrip Nilai" />
            <h4 class={isAcademicRouteActive ? 'active' : ''}>Informasi Akademik</h4>
          </div>

          {showOptions() && (
            <div class="options-container">
              <img src={line} class="sidebar-line" alt="Line" />
              <div class="sidebar-options">
                <ul>
                  <li><a href="/Jadwal-user">Jadwal Pelajaran</a></li>
                  <li><a href="/Penilaian&Tugas-user">Tugas dan Penilaian</a></li>
                  <li><a href="/TranskripNilai-user">Transkrip Nilai</a></li>
                </ul>
              </div>
            </div>
          )}

          <div class="absensi" onclick={handleClickAbsensi}>
            <img src={isAbsensiRouteActive || absensiActive() ? absensibold : absensi} alt="Absensi" />
            <h4 class={isAbsensiRouteActive || absensiActive() ? 'active' : ''}>Absensi Kehadiran</h4>
          </div>

          <div class="eskul" onclick={handleClickEkstrakurikuler}>
            <img src={isEkstrakurikulerActive ? eskulbold : eskul} alt="Ekstrakurikuler" />
            <h4 class={isEkstrakurikulerActive ? 'active' : ''}>Ekstrakurikuler</h4>
          </div>
        </div>

        <div class="other-sidebar">
          <div class="setting">
            <img src={setting} alt="Pengaturan" />
            <h4>Pengaturan</h4>
          </div>
          <div class="logout">
            <img src={logout} alt="Logout" />
            <h4>Logout</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar

