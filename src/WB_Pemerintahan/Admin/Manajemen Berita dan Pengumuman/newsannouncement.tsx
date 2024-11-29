import { Component, createSignal } from 'solid-js';
import Sidebar from '../Sidebar/sidebaradmin';
import Navbar from '../Navbar/navbaradmin';
import kpu from '../Assets/kpu.png';
import bsc from '../Assets/bsc.png';
import edit from '../Assets/edit-2.svg';
import hapus from '../Assets/delete.svg';
import tambah from '../Assets/add.svg';
import './newsannouncement.css';
// import '../Layout/layout.css'; // Tambahkan layout CSS
import { useNavigate } from '@solidjs/router';
import DeleteConfirmationModal from './Hapus/delete-confirmation-modal';
const NewsAnnouncementsPage: Component = () => {

  const navigate = useNavigate();
  const [showNewsModal, setShowNewsModal] = createSignal(false);
  const [showServiceModal, setShowServiceModal] = createSignal(false);

  const addNews =() => {
    navigate('/TambahBerita-admin');
  }
  const addDigitalService =() => {
    navigate('/TambahLayanan-admin');
  }

  const editNews =() => {
    navigate('/EditBerita-admin')
  }
  const editService =() => {
    navigate('/EditLayanan-admin')
  }
  const deleteNews = () => {
    setShowNewsModal(true);
  }

  const deleteService = () => {
    setShowServiceModal(true);
  }

  const confirmDeleteNews = () => {
    // Implement news deletion logic here
    setShowNewsModal(false);
  }

  const confirmDeleteService = () => {
    // Implement service deletion logic here
    setShowServiceModal(false);
  }
  return (
    <div class="page-container">
      <Sidebar />
      <Navbar />
      <div class="konten-utama">
        <div class="title-top">
          <h1>Berita</h1>
        </div>
        <div class="news-section">
          <div class="news-card">
            <img src={kpu} alt="News thumbnail" />
            <div class="news-content">
              <h2>KPU Tunggu Juknis Pelaksanaan <br />Debat Paslon Pilwalkot Bandung</h2>
              <p>KPU Kota Bandung akan melaksanakan <br />
              tahapan debat pasangan calon wali kota dan wakil wali kota. <br />
              Namun masih...</p>
              <div class="news-actions">
                <button class="edit-btn" onclick={editNews}>
                    <img src={edit} alt="Edit" class="icon" />
                    Edit
                </button>
                <button class="delete-btn" onclick={deleteNews}>
                    <img src={hapus} alt="Hapus" class="icon" />
                    Hapus
                </button>
              </div>
            </div>
          </div>
          <div class="add-news" onclick={addNews}>
            <h1>Tambah Berita</h1>
            <img src={tambah} alt="" />
          </div>
        </div>
        <div class="digital-services">
          <h2>Layanan Digital</h2>
          <div class="service-card">
            <img src={bsc} alt="Bandung Smart City logo" />
            <div class="service-content">
              <h3>Bandung Smart City</h3>
              <p>Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.</p>
                <div class="service-actions">
                    <button class="edit-btn2" onClick={editService}>
                        <img src={edit} alt="Edit" class="icon" />
                        Edit
                    </button>
                    <button class="delete-btn2" onclick={deleteService}>
                        <img src={hapus} alt="Hapus" class="icon" />
                        Hapus
                    </button>
                </div>
            </div>
          </div>
          <div class="add-service" onclick={addDigitalService}>
            <h1>Tambah Layanan Digital</h1>
            <img src={tambah} alt="" />
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={showNewsModal()}
        onClose={() => setShowNewsModal(false)}
        onConfirm={confirmDeleteNews}
        itemType="Berita"
      />
      <DeleteConfirmationModal
        isOpen={showServiceModal()}
        onClose={() => setShowServiceModal(false)}
        onConfirm={confirmDeleteService}
        itemType="Layanan"
      />
    </div>
  );
};

export default NewsAnnouncementsPage;
