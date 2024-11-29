import { Component, createSignal } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './TranskripNilai.module.css';

const TranskripNilai: Component = () => {
  const [jurusan, setJurusan] = createSignal('');
  const [kelas, setKelas] = createSignal('');
  const [showTable, setShowTable] = createSignal(false);

  const jurusanOptions = ['PPLG', 'TJKT', 'TJA'];
  const kelasOptions = ['X A', 'X B', 'XI A', 'XI B', 'XII A', 'XII B'];

  const columnDefs = [
    { headerName: 'No', field: 'no', width: 70 },
    { headerName: 'NIS', field: 'nis', width: 100 },
    { headerName: 'Nama', field: 'nama', width: 200 },
    { headerName: 'Mata Pelajaran', field: 'mataPelajaran', width: 150 },
    { headerName: 'Tugas', field: 'tugas', width: 100 },
    { headerName: 'UTS', field: 'uts', width: 100 },
    { headerName: 'UAS', field: 'uas', width: 100 },
    { headerName: 'Nilai Akhir', field: 'nilaiAkhir', width: 120 },
  ];

  const rowData = [
    { no: 1, nis: '2021001', nama: 'John Doe', mataPelajaran: 'Matematika', tugas: 85, uts: 78, uas: 88, nilaiAkhir: 84 },
    { no: 2, nis: '2021002', nama: 'Jane Smith', mataPelajaran: 'Bahasa Inggris', tugas: 92, uts: 85, uas: 90, nilaiAkhir: 89 },
    // Add more data as needed
  ];

  const handleSearch = () => {
    if (jurusan() && kelas()) {
      setShowTable(true);
    }
  };

  return (
    <div class={styles.container}>
      <h2 class={styles.title}>Transkrip Nilai</h2>
      <div class={styles.formContainer}>
        <div class={styles.formGroup}>
          <label for="jurusan">Jurusan:</label>
          <select id="jurusan" value={jurusan()} onChange={(e) => setJurusan(e.currentTarget.value)}>
            <option value="">Pilih Jurusan</option>
            {jurusanOptions.map((j) => (
              <option value={j}>{j}</option>
            ))}
          </select>
        </div>
        <div class={styles.formGroup}>
          <label for="kelas">Kelas:</label>
          <select id="kelas" value={kelas()} onChange={(e) => setKelas(e.currentTarget.value)}>
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((k) => (
              <option value={k}>{k}</option>
            ))}
          </select>
        </div>
        <button class={styles.searchButton} onClick={handleSearch}>Cari</button>
      </div>
      {showTable() && (
        <div class={`ag-theme-alpine ${styles.tableContainer}`}>
          <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData}
            domLayout='autoHeight'
          />
        </div>
      )}
    </div>
  );
};

export default TranskripNilai;
