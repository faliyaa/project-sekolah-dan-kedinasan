import { createSignal, Show } from 'solid-js';
import './modal.css';

interface AddResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddResidentModal(props: AddResidentModalProps) {
  const [formData, setFormData] = createSignal({
    namaLengkap: '',
    NIK: '',
    tempatLahir: '',
    tanggalLahir: '',
    keadaanWarga: '',
    tanggalWafat: '',
    jenisKelamin: '',
    RT_RW: '',
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    pekerjaan: '',
    agama: '',
    golonganDarah: '',
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

  return (
    <Show when={props.isOpen}>
      <div class="modal-overlay">
        <div class="modal-content">
        <h2>
  <img src="src/User/asset/add-square.svg" alt="Icon" class="icon" />
  Tambah Data Penduduk
</h2>

          <div class="form-container">
            <form onSubmit={handleSubmit}>
              <div class="form-row">
                <div class="form-group">
                  <label for="namaLengkap">Nama Lengkap</label>
                  <input type="text" id="namaLengkap" name="namaLengkap" value={formData().namaLengkap} onInput={handleChange} required placeholder="Masukkan nama lengkap" />
                </div>
                <div class="form-group">
                  <label for="NIK">NIK</label>
                  <input type="text" id="NIK" name="NIK" value={formData().NIK} onInput={handleChange} required placeholder="Masukkan NIK" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="tempatLahir">Tempat Lahir</label>
                  <input type="text" id="tempatLahir" name="tempatLahir" value={formData().tempatLahir} onInput={handleChange} required placeholder="Masukkan tempat lahir" />
                </div>
                <div class="form-group">
                  <label for="tanggalLahir">Tanggal Lahir</label>
                  <input type="date" id="tanggalLahir" name="tanggalLahir" value={formData().tanggalLahir} onInput={handleChange} required placeholder="Masukkan tanggal lahir" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="keadaanWarga">Keadaan Warga</label>
                  <select id="keadaanWarga" name="keadaanWarga" value={formData().keadaanWarga} onChange={handleChange} required>
                    <option value="">Pilih keadaan</option>
                    <option value="Hidup">Hidup</option>
                    <option value="Wafat">Wafat</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="tanggalWafat">Tanggal Wafat</label>
                  <input type="date" id="tanggalWafat" name="tanggalWafat" value={formData().tanggalWafat} onInput={handleChange} placeholder="Masukkan tanggal wafat" />
                </div>
                <div class="form-group">
                  <label for="jenisKelamin">Jenis Kelamin</label>
                  <select id="jenisKelamin" name="jenisKelamin" value={formData().jenisKelamin} onChange={handleChange} required>
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="RT_RW">RT/RW</label>
                  <input type="text" id="RT_RW" name="RT_RW" value={formData().RT_RW} onInput={handleChange} required placeholder="Masukkan RT dan RW" />
                </div>
                <div class="form-group">
                  <label for="desa">Desa</label>
                  <input type="text" id="desa" name="desa" value={formData().desa} onInput={handleChange} required placeholder="Masukkan Desa" />
                </div>
                <div class="form-group">
                  <label for="kecamatan">Kecamatan</label>
                  <input type="text" id="kecamatan" name="kecamatan" value={formData().kecamatan} onInput={handleChange} required placeholder="Masukkan kecamatan" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="kabupaten">Kabupaten</label>
                  <input type="text" id="kabupaten" name="kabupaten" value={formData().kabupaten} onInput={handleChange} required placeholder="Masukkan kabupaten" />
                </div>
                <div class="form-group">
                  <label for="provinsi">Provinsi</label>
                  <input type="text" id="provinsi" name="provinsi" value={formData().provinsi} onInput={handleChange} required placeholder="Masukkan provinsi" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="pekerjaan">Pekerjaan</label>
                  <input type="text" id="pekerjaan" name="pekerjaan" value={formData().pekerjaan} onInput={handleChange} required placeholder="Masukkan pekerjaan" />
                </div>
                <div class="form-group">
                  <label for="agama">Agama</label>
                  <select id="agama" name="agama" value={formData().agama} onChange={handleChange} required>
                    <option value="">Masukkan agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="golonganDarah">Golongan Darah</label>
                  <select id="golonganDarah" name="golonganDarah" value={formData().golonganDarah} onChange={handleChange} required>
                    <option value="">Masukkan golongan darah</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="nomorTelepon">Nomor Telepon</label>
                  <input type="tel" id="nomorTelepon" name="nomorTelepon" value={formData().nomorTelepon} onInput={handleChange} required placeholder="Masukkan nomor telepon" />
                </div>
              </div>
            </form>
          </div>
          <div class="form-actions">
            <button type="button" onClick={props.onClose} class="btn-cancel">Batal</button>
            <button type="button" onClick={handleSubmit} class="btn-submit">Tambah Data</button>
          </div>
        </div>
      </div>
    </Show>
  );
}