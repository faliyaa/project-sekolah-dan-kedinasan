import { Component, createSignal } from 'solid-js';
import { useLocation } from '@solidjs/router';
import './Navbar.css';

import logo from "../../Aset_Pemerintahan/logo_bandung.svg";
import asset1 from "../../Aset_Pemerintahan/Informasi&layanan.svg";
import asset2 from "../../Aset_Pemerintahan/Profile.svg";
import asset3 from "../../Aset_Pemerintahan/Pemerintahan.svg";
import asset4 from "../../Aset_Pemerintahan/Pengaduan.svg";
import asset5 from "../../Aset_Pemerintahan/notification.svg";


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
        <img src={logo} alt="Logo Bandung" />
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
          <img src={asset1} alt="Informasi & Layanan" />
          Informasi & Layanan
        </a>
        <a 
          href="/ProfileDaerah-user" 
          class={isActive('/ProfileDaerah-user') ? 'active' : ''}
          onClick={() => handleClick('/ProfileDaerah-user')}
        >
          <img src={asset2} alt="Profil" />
          Profil
        </a>
        <a 
          href="/PemerintahDaerah-user" 
          class={isActive('/pemerintah') ? 'active' : ''}
          onClick={() => handleClick('/pemerintah')}
        >
          <img src={asset3} alt="Pemerintah" />
          Pemerintah
        </a>
        <a 
          href="/Pengaduan-user" 
          class={isActive('/pengaduan') ? 'active' : ''}
          onClick={() => handleClick('/pengaduan')}
        >
          <img src={asset4} alt="Pengaduan" />
          Pengaduan
        </a>
      </nav>
      <div class="navbar-actions">
        <input type="text" placeholder="Cari sesuatu..." />
        <img src={asset5} alt="Notifikasi" />
        <div class="navbar-profile">
          <span>S</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;