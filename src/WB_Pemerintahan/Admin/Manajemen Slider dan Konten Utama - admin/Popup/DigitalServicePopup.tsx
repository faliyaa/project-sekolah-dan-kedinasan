// DigitalServicesPopup.tsx

import { Component, For } from 'solid-js';
import bsc from '../bscpopup.png';
import './DigitalService.css';

interface Service {
  id: number;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Bandung Smart City',
    description: 'Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.',
  },
  {
    id: 2,
    title: 'Bandung Smart City',
    description: 'Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.',
  },
  {
    id: 3,
    title: 'Bandung Smart City',
    description: 'Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.',
  },
  {
    id: 4,
    title: 'Bandung Smart City',
    description: 'Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.',
  },
];

const DigitalServicesPopup: Component = () => {
  return (
    <div class="digital-services-popup">
      <div class="popup-header">
        <h2>Pilih layanan digital yang akan di tampilkan</h2>
        <button class="close-button">×</button>
      </div>
      <div class="services-grid">
        <For each={services}>
          {(service) => (
            <div class="service-cards">
              <div class="service-icons">
                <img src={bsc} alt="Bandung Smart City" class='bsc-popup' />
              </div>
              <div class="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <a href="#" class="more-link">Selengkapnya</a>
              <input type="checkbox" checked />
            </div>
          )}
        </For>
      </div>
      <div class="popup-footer">
        <button class="cancel-button">Batalkan</button>
        <button class="save-button">Simpan</button>
      </div>
    </div>
  );
};

export default DigitalServicesPopup;