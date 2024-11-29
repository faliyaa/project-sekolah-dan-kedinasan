import { Component, createSignal, createMemo, For, Show, onMount } from 'solid-js';
import  AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './DataEkstrakulikuler.module.css';

const DataEkstrakurikuler: Component = () => {
  const [rowData, setRowData] = createSignal([
    { nama: 'Silat', pembimbing: 'Henoch Mahmud', jadwal: 'Rabu & Kamis', jumlah: '56 Siswa', icon: '🥋' },
    { nama: 'Basket', pembimbing: 'Murni Mastuti S.Pd', jadwal: 'Sabtu', jumlah: '34 Siswa', icon: '🏀' },
    { nama: 'Voli', pembimbing: 'Prof. Priyono', jadwal: 'Kamis', jumlah: '62 Siswa', icon: '🏐' },
    { nama: 'Badminton', pembimbing: 'Ahmad', jadwal: 'Senin', jumlah: '34 Siswa', icon: '🏸' },
    { nama: 'Tenis Meja', pembimbing: 'Supriyono', jadwal: 'Jumat', jumlah: '23 Siswa', icon: '🏓' },
    { nama: 'Taekwondo', pembimbing: 'Agus Salim', jadwal: 'Sabtu', jumlah: '45 Siswa', icon: '🥋' },
  ]);

  const [showPopup, setShowPopup] = createSignal(false);
  const [newEkstrakurikuler, setNewEkstrakurikuler] = createSignal({
    nama: '',
    pembimbing: '',
    jadwal: '',
    logo: null as File | null,
    icon: '',
  });

  const [selectedEkstrakurikuler, setSelectedEkstrakurikuler] = createSignal(null);
  const [selectedGrade, setSelectedGrade] = createSignal('XII');

  const [studentData, setStudentData] = createSignal({
    XII: [
      { nama: 'Hilmi Aditya', jenisKelamin: 'Laki-laki', alamat: 'Purwokerto', kelas: 'XII A' },
      { nama: 'Selena Gomez', jenisKelamin: 'Perempuan', alamat: 'Cilacap', kelas: 'XII C' },
    ],
    XI: [
      { nama: 'Sugi', jenisKelamin: 'Perempuan', alamat: 'Purwokerto', kelas: 'XI B' },
    ],
    X: [
      { nama: 'Benzema', jenisKelamin: 'Laki-laki', alamat: 'Mersi', kelas: 'X C' },
    ],
  });

  const [showAddStudentPopup, setShowAddStudentPopup] = createSignal(false);
  const [newStudent, setNewStudent] = createSignal({
    nama: '',
    kelas: 'XII',
    subKelas: 'A',
    jenisKelamin: 'Laki-Laki',
    alamat: '',
  });

  const [showEditStudentPopup, setShowEditStudentPopup] = createSignal(false);
  const [editingStudent, setEditingStudent] = createSignal({
    nama: '',
    kelas: 'XII',
    subKelas: 'A',
    jenisKelamin: 'Laki-Laki',
    alamat: '',
  });

  const columnDefs = [
    {
      field: 'nama',
      headerName: 'Nama',
      cellRenderer: (params) => (
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
            {params.data.icon}
          </div>
          <span class="text-sm font-medium text-gray-900">{params.value}</span>
        </div>
      ),
    },
    { field: 'pembimbing', headerName: 'Pembimbing' },
    { field: 'jadwal', headerName: 'Jadwal' },
    { field: 'jumlah', headerName: 'Jumlah' },
    {
      headerName: 'Data Siswa',
      cellRenderer: (params) => (
        <div class={styles.actionButtons}>
          <button class={styles.lihatBtn} onClick={() => handleViewStudents(params.data.nama)}>Lihat</button>
          <button class={styles.deleteBtn} onClick={() => handleDeleteRow(params.data.nama)}>🗑️</button>
        </div>
      ),
    },
  ];

  const studentColumnDefs = [
    { field: 'nama', headerName: 'Nama' },
    { field: 'jenisKelamin', headerName: 'Jenis Kelamin' },
    { field: 'alamat', headerName: 'Alamat' },
    { field: 'kelas', headerName: 'Kelas' },
    {
      headerName: 'Aksi',
      cellRenderer: (params) => (
        <div class={styles.actionButtons}>
          <button class={styles.editBtn} onClick={() => handleEditStudent(params.data)}>Edit</button>
          <button class={styles.deleteBtn} onClick={() => handleDeleteStudent(params.data.nama)}>🗑️</button>
        </div>
      ),
    },
  ];

  const filteredStudentData = createMemo(() => {
    return studentData()[selectedGrade()] || [];
  });

  const handleDeleteRow = (nama: string) => {
    const updatedData = rowData().filter((item) => item.nama !== nama);
    setRowData(updatedData);
  };

  const handleAddEkstrakurikuler = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewEkstrakurikuler({ nama: '', pembimbing: '', jadwal: '', logo: null, icon: '' });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newData = {
      ...newEkstrakurikuler(),
      jumlah: '0 Siswa',
    };
    setRowData([...rowData(), newData]);
    handleClosePopup();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setNewEkstrakurikuler({ ...newEkstrakurikuler(), logo: target.files[0] });
    }
  };

  const handleViewStudents = (nama: string) => {
    setSelectedEkstrakurikuler(nama);
  };

  const handleDeleteStudent = (nama: string) => {
    const updatedData = {...studentData()};
    updatedData[selectedGrade()] = updatedData[selectedGrade()].filter((item) => item.nama !== nama);
    setStudentData(updatedData);
  };

  const handleAddStudent = () => {
    setShowAddStudentPopup(true);
  };

  const handleCloseAddStudentPopup = () => {
    setShowAddStudentPopup(false);
    setNewStudent({
      nama: '',
      kelas: 'XII',
      subKelas: 'A',
      jenisKelamin: 'Laki-Laki',
      alamat: '',
    });
  };

  const handleSubmitNewStudent = (e: Event) => {
    e.preventDefault();
    const fullKelas = `${newStudent().kelas} ${newStudent().subKelas}`;
    const newStudentData = {
      nama: newStudent().nama,
      jenisKelamin: newStudent().jenisKelamin,
      alamat: newStudent().alamat,
      kelas: fullKelas,
    };
    const updatedData = {...studentData()};
    updatedData[newStudent().kelas] = [...(updatedData[newStudent().kelas] || []), newStudentData];
    setStudentData(updatedData);
    handleCloseAddStudentPopup();
  };

  const handleGradeSelection = (grade: string) => {
    setSelectedGrade(grade);
  };

  const handleEditStudent = (student: any) => {
    const [kelas, subKelas] = student.kelas.split(' ');
    setEditingStudent({
      nama: student.nama,
      kelas: kelas,
      subKelas: subKelas,
      jenisKelamin: student.jenisKelamin,
      alamat: student.alamat,
    });
    setShowEditStudentPopup(true);
  };

  const handleCloseEditStudentPopup = () => {
    setShowEditStudentPopup(false);
  };

  const handleSubmitEditedStudent = (e: Event) => {
    e.preventDefault();
    const fullKelas = `${editingStudent().kelas} ${editingStudent().subKelas}`;
    const editedStudentData = {
      nama: editingStudent().nama,
      jenisKelamin: editingStudent().jenisKelamin,
      alamat: editingStudent().alamat,
      kelas: fullKelas,
    };
  
    setStudentData((prevData) => {
      const updatedData = { ...prevData };
      const gradeKey = editingStudent().kelas;
      updatedData[gradeKey] = updatedData[gradeKey].map((student) =>
        student.nama === editingStudent().nama ? editedStudentData : student
      );
      return updatedData;
    });
  
    handleCloseEditStudentPopup();
  };

  onMount(() => {
    // This ensures the grid is properly sized after the component mounts
    window.dispatchEvent(new Event('resize'));
  });

  return (
    <div class={styles.dataEkstraContainer}>
      <Show
        when={!selectedEkstrakurikuler()}
        fallback={
          <div class={styles.studentDataContainer}>
            <div class={styles.header}>
              <h1>Data Siswa - {selectedEkstrakurikuler()}</h1>
              <button class={styles.addBtn} onClick={handleAddStudent}>+ Tambah Siswa</button>
            </div>
            <div class={styles.gradeSelector}>
              <For each={['XII', 'XI', 'X']}>
                {(grade) => (
                  <span
                    class={`${styles.grade} ${selectedGrade() === grade ? styles.selectedGrade : ''}`}
                    onClick={() => handleGradeSelection(grade)}
                  >
                    {grade}
                  </span>
                )}
              </For>
            </div>
            <div class={`ag-theme-alpine ${styles.gridContainer}`} style={{ height: '500px', width: '100%' }}>
              <AgGridSolid
                columnDefs={studentColumnDefs}
                rowData={filteredStudentData()}
              />
            </div>
            <button class={styles.backBtn} onClick={() => setSelectedEkstrakurikuler(null)}>Kembali</button>
          </div>
        }
      >
        <div class={styles.header}>
          <h1>Data Ekstrakurikuler</h1>
          <button class={styles.addBtn} onClick={handleAddEkstrakurikuler}>+ Ekstrakurikuler</button>
        </div>
        <div class={`ag-theme-alpine ${styles.gridContainer}`} style={{ height: '500px', width: '100%' }}>
          <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData()}
          />
        </div>
      </Show>

      {showPopup() && (
        <div class={styles.popup}>
          <div class={styles.popupContent}>
            <h2>Tambah Ekstrakurikuler</h2>
            <form onSubmit={handleSubmit}>
              <div class={styles.formGroup}>
                <label for="nama">Ekstrakurikuler Baru</label>
                <input
                  type="text"
                  id="nama"
                  placeholder="Masukkan Ekstrakurikuler..."
                  value={newEkstrakurikuler().nama}
                  onInput={(e) => setNewEkstrakurikuler({ ...newEkstrakurikuler(), nama: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label for="pembimbing">Pembimbing</label>
                <input
                  type="text"
                  id="pembimbing"
                  placeholder="Masukkan Nama..."
                  value={newEkstrakurikuler().pembimbing}
                  onInput={(e) => setNewEkstrakurikuler({ ...newEkstrakurikuler(), pembimbing: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label for="jadwal">Jadwal Latihan</label>
                <input
                  type="text"
                  id="jadwal"
                  placeholder="Masukkan Hari..."
                  value={newEkstrakurikuler().jadwal}
                  onInput={(e) => setNewEkstrakurikuler({ ...newEkstrakurikuler(), jadwal: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label for="icon">Icon (e.g. 🥋)</label>
                <input
                  type="text"
                  id="icon"
                  placeholder="Masukkan Icon..."
                  value={newEkstrakurikuler().icon}
                  onInput={(e) => setNewEkstrakurikuler({ ...newEkstrakurikuler(), icon: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label>Logo</label>
                <div class={styles.logoUpload}>
                  <input
                    type="file"
                    id="logo"accept="image/*"
                    onChange={handleFileChange}
                    style="display: none;"
                  />
                  <p>Drag and drop or click here to select file</p>
                </div>
              </div>
              <div class={styles.formActions}>
                <button type="button" class={styles.cancelBtn} onClick={handleClosePopup}>Batalkan</button>
                <button type="submit" class={styles.submitBtn}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddStudentPopup() && (
        <div class={styles.popup}>
          <div class={styles.popupContent}>
            <h2>Tambah Siswa</h2>
            <form onSubmit={handleSubmitNewStudent}>
              <div class={styles.formGroup}>
                <label for="nama">Nama *</label>
                <input
                  type="text"
                  id="nama"
                  placeholder="Masukkan Nama..."
                  value={newStudent().nama}
                  onInput={(e) => setNewStudent({ ...newStudent(), nama: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label for="kelas">Kelas</label>
                <div class={styles.kelasInputs}>
                  <select
                    id="kelas"
                    value={newStudent().kelas}
                    onChange={(e) => setNewStudent({ ...newStudent(), kelas: e.currentTarget.value })}
                  >
                    <option value="XII">Kelas XII</option>
                    <option value="XI">Kelas XI</option>
                    <option value="X">Kelas X</option>
                  </select>
                  <select
                    id="subKelas"
                    value={newStudent().subKelas}
                    onChange={(e) => setNewStudent({ ...newStudent(), subKelas: e.currentTarget.value })}
                  >
                    <option value="A">Kelas {newStudent().kelas} A</option>
                    <option value="B">Kelas {newStudent().kelas} B</option>
                    <option value="C">Kelas {newStudent().kelas} C</option>
                  </select>
                </div>
              </div>
              <div class={styles.formGroup}>
                <label>Jenis Kelamin *</label>
                <div class={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Laki-Laki"
                      checked={newStudent().jenisKelamin === 'Laki-Laki'}
                      onChange={(e) => setNewStudent({ ...newStudent(), jenisKelamin: e.currentTarget.value })}
                    />
                    Laki-Laki
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Perempuan"
                      checked={newStudent().jenisKelamin === 'Perempuan'}
                      onChange={(e) => setNewStudent({ ...newStudent(), jenisKelamin: e.currentTarget.value })}
                    />
                    Perempuan
                  </label>
                </div>
              </div>
              <div class={styles.formGroup}>
                <label for="alamat">Alamat *</label>
                <input
                  type="text"
                  id="alamat"
                  placeholder="Masukkan Alamat..."
                  value={newStudent().alamat}
                  onInput={(e) => setNewStudent({ ...newStudent(), alamat: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formActions}>
                <button type="button" class={styles.cancelBtn} onClick={handleCloseAddStudentPopup}>Batalkan</button>
                <button type="submit" class={styles.submitBtn}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditStudentPopup() && (
        <div class={styles.popup}>
          <div class={styles.popupContent}>
            <h2>Edit Siswa</h2>
            <form onSubmit={handleSubmitEditedStudent}>
              <div class={styles.formGroup}>
                <label for="editNama">Nama *</label>
                <input
                  type="text"
                  id="editNama"
                  placeholder="Masukkan Nama.."
                  value={editingStudent().nama}
                  onInput={(e) => setEditingStudent({ ...editingStudent(), nama: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formGroup}>
                <label for="editKelas">Kelas</label>
                <div class={styles.kelasInputs}>
                  <select
                    id="editKelas"
                    value={editingStudent().kelas}
                    onChange={(e) => setEditingStudent({ ...editingStudent(), kelas: e.currentTarget.value })}
                  >
                    <option value="XII">Kelas XII</option>
                    <option value="XI">Kelas XI</option>
                    <option value="X">Kelas X</option>
                  </select>
                  <select
                    id="editSubKelas"
                    value={editingStudent().subKelas}
                    onChange={(e) => setEditingStudent({ ...editingStudent(), subKelas: e.currentTarget.value })}
                  >
                    <option value="A">Kelas {editingStudent().kelas} A</option>
                    <option value="B">Kelas {editingStudent().kelas} B</option>
                    <option value="C">Kelas {editingStudent().kelas} C</option>
                  </select>
                </div>
              </div>
              <div class={styles.formGroup}>
                <label>Jenis Kelamin *</label>
                <div class={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="editJenisKelamin"
                      value="Laki-Laki"
                      checked={editingStudent().jenisKelamin === 'Laki-Laki'}
                      onChange={(e) => setEditingStudent({ ...editingStudent(), jenisKelamin: e.currentTarget.value })}
                    />
                    Laki-Laki
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="editJenisKelamin"
                      value="Perempuan"
                      checked={editingStudent().jenisKelamin === 'Perempuan'}
                      onChange={(e) => setEditingStudent({ ...editingStudent(), jenisKelamin: e.currentTarget.value })}
                    />
                    Perempuan
                  </label>
                </div>
              </div>
              <div class={styles.formGroup}>
                <label for="editAlamat">Alamat *</label>
                <input
                  type="text"
                  id="editAlamat"
                  placeholder="Masukkan Alamat.."
                  value={editingStudent().alamat}
                  onInput={(e) => setEditingStudent({ ...editingStudent(), alamat: e.currentTarget.value })}
                  required
                />
              </div>
              <div class={styles.formActions}>
                <button type="button" class={styles.cancelBtn} onClick={handleCloseEditStudentPopup}>Batalkan</button>
                <button type="submit" class={styles.submitBtn}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEkstrakurikuler;