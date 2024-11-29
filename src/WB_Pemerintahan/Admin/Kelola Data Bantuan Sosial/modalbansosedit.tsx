import { createSignal, Show } from 'solid-js';
import './modalbansos.css';

interface EditBansosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  resident: any;
}

export default function EditBansosModal(props: EditBansosModalProps) {
  const [formData, setFormData] = createSignal({
    namaLengkap: props.resident.namaLengkap,
    NIK: props.resident.NIK,
    jenisKelamin: props.resident.jenisKelamin,
    alamat: props.resident.alamat,
    tanggalLahir: props.resident.tanggalLahir,
    pekerjaan: props.resident.pekerjaan,
    programBantuan: props.resident.programBantuan,
    jenisBantuan: props.resident.jenisBantuan,
    tanggalPenerimaanBantuan: props.resident.tanggalPenerimaanBantuan,
    nomorTelepon: props.resident.nomorTelepon
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
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>
            <img src="src/img/receipt-edit.svg" alt="Icon" class="icon" />
            Edit Data Penerimaan Bantuan Sosial
          </h2>

          <div class="form-container">
            <form onSubmit={handleSubmit}>
              <div class="form-row">
                <div class="form-group">
                  <label for="namaLengkap">Nama Lengkap</label>
                  <input type="text" id="namaLengkap" name="namaLengkap" value={formData().namaLengkap} onInput={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="NIK">NIK</label>
                  <input type="text" id="NIK" name="NIK" value={formData().NIK} onInput={handleChange} required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="jenisKelamin">Jenis Kelamin</label>
                  <select id="jenisKelamin" name="jenisKelamin" value={formData().jenisKelamin} onChange={handleChange} required>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="alamat">Alamat</label>
                  <input type="text" id="alamat" name="alamat" value={formData().alamat} onInput={handleChange} required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="tanggalLahir">Tanggal Lahir</label>
                  <input type="date" id="tanggalLahir" name="tanggalLahir" value={formData().tanggalLahir} onInput={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="pekerjaan">Pekerjaan</label>
                  <input type="text" id="pekerjaan" name="pekerjaan" value={formData().pekerjaan} onInput={handleChange} required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="programBantuan">Program Bantuan</label>
                  <select id="programBantuan" name="programBantuan" value={formData().programBantuan} onChange={handleChange} required>
                    <option value="">Pilih program bantuan</option>
                    {programOptions.map(option => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group">
                  <label for="jenisBantuan">Jenis Bantuan</label>
                  <select id="jenisBantuan" name="jenisBantuan" value={formData().jenisBantuan} onChange={handleChange} required>
                    <option value="">Pilih jenis bantuan</option>
                    {bantuanOptions.map(option => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="tanggalPenerimaanBantuan">Tanggal Penerimaan Bantuan</label>
                  <input type="date" id="tanggalPenerimaanBantuan" name="tanggalPenerimaanBantuan" value={formData().tanggalPenerimaanBantuan} onInput={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="nomorTelepon">Nomor Telepon</label>
                  <input type="tel" id="nomorTelepon" name="nomorTelepon" value={formData().nomorTelepon} onInput={handleChange} required />
                </div>
              </div>
            </form>
          </div>
          <div class="form-actions">
            <button type="button" onClick={props.onClose} class="btn-cancel">Batal</button>
            <button type="button" onClick={handleSubmit} class="btn-submit">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </Show>
  );
}