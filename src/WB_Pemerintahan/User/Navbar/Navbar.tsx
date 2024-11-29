import { Component, createSignal } from 'solid-js';
import { useLocation } from '@solidjs/router';
import './Navbar.css';

const Navbar: Component = () => {
  const location = useLocation();
  const [activePage, setActivePage] = createSignal(location.pathname);

  const isActive = (path: string) => activePage() === path;

  const handleClick = (path: string) => {
    setActivePage(path);
  };

  return (
    <header class="navbar">
      <div class="navbar-logo">
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\logo_bandung.svg" alt="Logo Bandung" />
        <div class="navbar-title">
          <h1>Bandung</h1>
          <p>Portal Resmi Kota Bandung</p>
        </div>
      </div>
      <nav class="navbar-links">
        <a 
          href="/DetailBerita-user" 
          class={isActive('/DetailBerita-user') ? 'active' : ''}
          onClick={() => handleClick('/DetailBerita-user')}
        >
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Informasi&layanan.svg" alt="Informasi & Layanan" />
          Informasi & Layanan
        </a>
        <a 
          href="/ProfileDaerah-user" 
          class={isActive('/ProfileDaerah-user') ? 'active' : ''}
          onClick={() => handleClick('/ProfileDaerah-user')}
        >
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Profile.svg" alt="Profil" />
          Profil
        </a>
        <a 
          href="/PemerintahDaerah-user" 
          class={isActive('/pemerintah') ? 'active' : ''}
          onClick={() => handleClick('/pemerintah')}
        >
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Pemerintahan.svg" alt="Pemerintah" />
          Pemerintah
        </a>
        <a 
          href="/Pengaduan-user" 
          class={isActive('/pengaduan') ? 'active' : ''}
          onClick={() => handleClick('/pengaduan')}
        >
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Pengaduan.svg" alt="Pengaduan" />
          Pengaduan
        </a>
      </nav>
      <div class="navbar-actions">
        <input type="text" placeholder="Cari sesuatu..." />
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\notification.svg" alt="Notifikasi" />
        <div class="navbar-profile">
          <span>S</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;