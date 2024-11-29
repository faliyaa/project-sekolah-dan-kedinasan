import { Component } from 'solid-js';
import search from '../Assets/search.svg';
import notif from '../Assets/notif.svg';
import './navbaradmin.css';

const Navbar: Component = () => {
  return (
    <nav class="navbar-admin">
      <div class="search-container">
        <img src={search} alt="" />
        <input type="text" placeholder="Cari sesuatu.." class="search-input" />
      </div>
      <div class="user-info">
        <div class="notif">
            <img src={notif} alt="" />
        </div>
        <div class="user">
          <span class="user-name">Sienna Claire</span>
          <div class="user-avatar">S</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;