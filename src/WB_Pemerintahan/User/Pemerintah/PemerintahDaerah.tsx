import { Component, createSignal, createEffect } from 'solid-js';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './PemerintahDaerah.css';

interface VisiMisi {
  id: number;
  visidanmisi: string;
  visi: string;
  misi: string;
  struktur_pemerintahan: number[];
  created_at: string;
  updated_at: string;
}

const PemerintahDaerah: Component = () => {
  const [visiMisiData, setVisiMisiData] = createSignal<VisiMisi | null>(null);
  const [error, setError] = createSignal<string>('');
  const [loading, setLoading] = createSignal(true);

  const arrayBufferToBase64 = (buffer: number[]) => {
    const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return window.btoa(binary);
  };

  const fetchVisiMisiData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/visi_misi');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Set the first (latest) entry from the response
      setVisiMisiData(Array.isArray(data) && data.length > 0 ? data[0] : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    fetchVisiMisiData();
  });

  return (
    <div class="pemerintah-daerah-page">
      <Navbar />

      <div class="hero-image">
        <img src="src\WB_Pemerintahan\User\Assets\Bandung Kota bener.png" alt="Gedung Sate Bandung" />
        <div class="hero-content">
          <h1>Visi & Misi</h1>
          <p>Visi Misi Pemerintahan Bandung</p>
        </div>
      </div>

      <main>
        <section class="visi-misi-section">
          <h2>Visi dan Misi Kota Bandung</h2>
          <p>
            {loading() ? 'Loading...' : 
             error() ? 'Error loading content' : 
             visiMisiData()?.visidanmisi || 'No description available'}
          </p>

          <div class="visi-misi-content">
            <div class="visi">
              <h3>
                <img src="src\WB_Pemerintahan\User\Assets\icons8-eye-24.png" alt="Visi Icon" class="icon-image" />
                Visi
              </h3>
              <div class="content-container">
                <p>{visiMisiData()?.visi || 'Loading visi...'}</p>
              </div>
            </div>
            <div class="misi">
              <h3>
                <img src="src\WB_Pemerintahan\User\Assets\rocket.png" alt="Misi Icon" class="icon-image" />
                Misi
              </h3>
              <div class="content-container" innerHTML={visiMisiData()?.misi || 'Loading misi...'} />
            </div>
          </div>
        </section>

        <section class="struktur-pemerintahan">
          <h2>Struktur Pemerintahan</h2>
          {visiMisiData()?.struktur_pemerintahan ? (
            <img 
              src={`data:image/png;base64,${arrayBufferToBase64(visiMisiData()!.struktur_pemerintahan)}`}
              alt="Bagan Struktur Organisasi Pemerintah Kota Bandung"
            />
          ) : (
            <img 
              src="src\WB_Pemerintahan\User\Assets\Struktur bandung pemerintah.png" 
              alt="Bagan Struktur Organisasi Pemerintah Kota Bandung 2021" 
            />
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default PemerintahDaerah;