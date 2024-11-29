import { createSignal } from 'solid-js';
import './ManagementSlider.css';
import Sidebar from '../Sidebar/sidebaradmin';
import Instagram from '../../Admin/Manajemen Slider dan Konten Utama - admin/instagram.svg';
import Facebook from '../../Admin/Manajemen Slider dan Konten Utama - admin/facebook.svg';
import Linkedin from '../../Admin/Manajemen Slider dan Konten Utama - admin/linkedin.svg';
import Twitter from '../../Admin/Manajemen Slider dan Konten Utama - admin/twitter.svg';
import AddContent from '../../Admin/Manajemen Slider dan Konten Utama - admin/iconAddContent.svg';
import AddLogoDaerah from '../../Admin/Manajemen Slider dan Konten Utama - admin/iconAddlogoDaerah.svg';
import EditNamaKota from '../../Admin/Manajemen Slider dan Konten Utama - admin/iconEditNamaKota.svg';
import Lokasi from '../../Admin/Manajemen Slider dan Konten Utama - admin/location.svg';

const AdminSliderManagement = () => {
  const [activeTab, setActiveTab] = createSignal('latest');

  return (
    <div class="admin-content">
      <Sidebar/>
      <div class="bagian-atas">
        <div class="section-latest-info">
          <h2>Informasi Terbaru <span class="edit-icon">✎</span></h2>
          <div class="slider-container">
            <button class="slider-btn prev">&lt;</button>
            <div class="slider-content">
              <button class="add-btn">+</button>
            </div>
            <button class="slider-btn next">&gt;</button>
          </div>
          <div class="slider-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
        <div class="section popular">
          <h2>Populer <span class="edit-icon">✎</span></h2>
          <div class="popular-content">
            <button class="add-btn">+</button>
          </div>
          <a href="#" class="view-all-populer">Lihat semua</a>
        </div>
      </div>

      <div class="section digital-services">
        <h2 class="layanan">Layanan Digital <span class="edit-icon">✎</span></h2>
        <div class="services-slider">
          <button class="slider-btn prev">&lt;</button>
          <div class="service-item">
            <button class="add-btn">+</button>
          </div>
          <button class="slider-btn next">&gt;</button>
        </div>
      </div>

      <div class="section news-info">
        <h2 class="berita">Berita & Informasi Lainnya <span class="edit-icon">✎</span></h2>
        <div class="news-grid">
          {[1, 2, 3].map((item) => (
            <div class="news-item">
              <div class="news-image">
                <span class="like-count">♥ {item * 200 + 100}</span>
              </div>
              <h3>News Title {item}</h3>
              <p>Short description of the news item...</p>
            </div>
          ))}
        </div>
        <a href="#" class="view-all-berita">Lihat semua</a>
      </div>

      {/* Section Kelola Footer */}
      <div class="kelola-footer-label">
        <h2>Kelola Footer</h2>
      </div>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-left">
            {/* Add Logo Kota */}
            <img src={AddLogoDaerah} alt="Logo Daerah" class="footer-logo" />
            <div class="footer-title">
              {/* Text Kota Bandung */}
              <h3>Bandung <img src={EditNamaKota} alt="Edit" class="edit-icon" /></h3>
              <p>Portal Resmi Kota Bandung <img src={EditNamaKota} alt="Edit" class="edit-icon" /></p>
            </div>
          </div>
          <div class="footer-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Kontak Kami</a>
            <a href="#">Kontak</a>
            <a href="#">Bantuan & Masukan</a>
          </div>
          <div class="footer-right">
            <button class="footer-button">
              <img src={AddContent} alt="Add" />
              Laman Website
            </button>
            <div class="footer-address">
              <img src={Lokasi} alt="Location" />
              <button class="footer-button">
                <img src={AddContent} alt="Add" />
                Alamat
              </button>
            </div>
          </div>
        </div>
        <div class="footer-social">
          <a href="#"><img src={Linkedin} alt="LinkedIn" /></a>
          <a href="#"><img src={Facebook} alt="Facebook" /></a>
          <a href="#"><img src={Instagram} alt="Instagram" /></a>
          <a href="#"><img src={Twitter} alt="Twitter" /></a>
        </div>
        <div class="footer-copyright">
          2024 Lorem Ipsum. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminSliderManagement;
