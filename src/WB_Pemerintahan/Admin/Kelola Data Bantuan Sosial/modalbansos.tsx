import { createSignal, Show } from 'solid-js';
import './modalbansos.css';

interface BansosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function BansosModal(props: BansosModalProps) {
  const [formData, setFormData] = createSignal({
    namaLengkap: '',
    NIK: '',
    jenisKelamin: '',
    alamat: '',
    tanggalLahir: '',
    pekerjaan: '',
    programBantuan: '',
    jenisBantuan: '',
    tanggalPenerimaanBantuan: '',
    nomorTelepon: ''
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({...formData(), [target.name]: target.value});
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit(formData());
    props.onClose();
  };

  const programOptions = [
    "Program Keluarga Harapan (PKH)",
    "Program Pangan Non-Tunai (BPNT)",
    "Program Sosial Tunai (BST)",
    "Program Langsung Tunai (BLT)",
    "Program Subsidi Upah (BSU)",
    "Program Sembako",
    "Program Pendidikan Miskin (BPM)",
    "Program Rumah Tidak Layak Huni (RTLH)",
    "Program Sosial Covid-19",
    "Program Usaha Mikro Kecil dan Menengah (UMKM)"
  ];

  const bantuanOptions = [
    "Bantuan Tunai – Uang yang diberikan langsung kepada penerima.",
    "Bantuan Sembako – Paket kebutuhan pokok seperti beras, minyak, dan gula.",
    "Bantuan Kesehatan – Bantuan obat-obatan atau perawatan kesehatan gratis.",
    "Bantuan Pendidikan – Beasiswa atau bantuan biaya sekolah.",
    "Bantuan Perumahan – Renovasi atau pembangunan rumah layak huni.",
    "Bantuan Subsidi Listrik – Diskon atau pembebasan biaya listrik.",
    "Bantuan Modal Usaha – Dana untuk pengembangan usaha kecil.",
    "Bantuan Pangan Non-Tunai (BPNT) – Kartu elektronik untuk membeli bahan pangan.",
    "Bantuan Subsidi Upah – Tambahan gaji atau insentif bagi pekerja.",
    "Bantuan Alat Produksi – Alat atau mesin untuk mendukung usaha penerima bantuan."
  ];

  return (
    <Show when={props.isOpen}>
      <div class="bansos-modal-overlay">
        <div class="bansos-modal-content">
          <h2 class="bansos-modal-title">
            <span class="bansos-modal-icon">+</span>
            Tambah Data Penerimaan Bantuan Sosial
          </h2>
          <form onSubmit={handleSubmit} class="bansos-form-container">
            <div class="bansos-form-row">
              <div class="bansos-form-group">
                <label for="namaLengkap" class="bansos-form-label">Nama Lengkap *</label>
                <input type="text" id="namaLengkap" name="namaLengkap" value={formData().namaLengkap} onInput={handleChange} required placeholder="Masukkan nama lengkap" class="bansos-form-input" />
              </div>
              <div class="bansos-form-group">
                <label for="NIK" class="bansos-form-label">NIK *</label>
                <input type="text" id="NIK" name="NIK" value={formData().NIK} onInput={handleChange} required placeholder="Masukkan NIK" class="bansos-form-input" />
              </div>
              <div class="bansos-form-group">
                <label for="jenisKelamin" class="bansos-form-label">Jenis Kelamin *</label>
                <select id="jenisKelamin" name="jenisKelamin" value={formData().jenisKelamin} onChange={handleChange} required class="bansos-form-select">
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
            <div class="bansos-form-group">
              <label for="alamat" class="bansos-form-label">Alamat *</label>
              <input type="text" id="alamat" name="alamat" value={formData().alamat} onInput={handleChange} required placeholder="Masukkan alamat" class="bansos-form-input" />
            </div>
            <div class="bansos-form-row">
              <div class="bansos-form-group">
                <label for="tanggalLahir" class="bansos-form-label">Tanggal Lahir *</label>
                <input type="date" id="tanggalLahir" name="tanggalLahir" value={formData().tanggalLahir} onInput={handleChange} required class="bansos-form-input bansos-form-date" />
              </div>
              <div class="bansos-form-group">
                <label for="pekerjaan" class="bansos-form-label">Pekerjaan *</label>
                <input type="text" id="pekerjaan" name="pekerjaan" value={formData().pekerjaan} onInput={handleChange} required placeholder="Masukkan pekerjaan" class="bansos-form-input" />
              </div>
            </div>
            <div class="bansos-form-row">
              <div class="bansos-form-group">
                <label for="programBantuan" class="bansos-form-label">Program Bantuan *</label>
                <select id="programBantuan" name="programBantuan" value={formData().programBantuan} onChange={handleChange} required class="bansos-form-select">
                  <option value="">Pilih program bantuan</option>
                  {programOptions.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div class="bansos-form-group">
                <label for="jenisBantuan" class="bansos-form-label">Jenis Bantuan *</label>
                <select id="jenisBantuan" name="jenisBantuan" value={formData().jenisBantuan} onChange={handleChange} required class="bansos-form-select">
                  <option value="">Pilih jenis bantuan</option>
                  {bantuanOptions.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="bansos-form-row">
              <div class="bansos-form-group">
                <label for="tanggalPenerimaanBantuan" class="bansos-form-label">Tanggal Penerimaan Bantuan *</label>
                <input type="date" id="tanggalPenerimaanBantuan" name="tanggalPenerimaanBantuan" value={formData().tanggalPenerimaanBantuan} onInput={handleChange} required class="bansos-form-input bansos-form-date" />
              </div>
              <div class="bansos-form-group">
                <label for="nomorTelepon" class="bansos-form-label">Nomor Telepon *</label>
                <input type="tel" id="nomorTelepon" name="nomorTelepon" value={formData().nomorTelepon} onInput={handleChange} required placeholder="Masukkan nomor telepon" class="bansos-form-input" />
              </div>
            </div>
            <div class="bansos-form-actions">
              <button type="button" onClick={props.onClose} class="bansos-btn-cancel">Batal</button>
              <button type="submit" class="bansos-btn-submit">Tambah Data</button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
}