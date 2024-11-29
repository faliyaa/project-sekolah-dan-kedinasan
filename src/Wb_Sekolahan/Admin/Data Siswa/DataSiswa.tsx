import { createSignal, For, JSX, Show, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './DataSiswa.css';

interface Class {
  id: number;
  name: string;
  students: number;
  level: string;
}

interface Student {
  id: number;
  nis: string;
  nisn: string;
  nama: string;
  jenisKelamin: string;
  alamat: string;
  tempatTanggalLahir: string;
  noHp: string;
}

// CMSButton component
interface CMSButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
}

const CMSButton = (props: CMSButtonProps) => {
  return (
    <button {...props} class="cms-button">
      {props.children}
    </button>
  );
};

// Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitClass: (name: string, students: number, level: string) => void;
  onSubmitStudent: (student: Omit<Student, 'id'>) => void;
  type: 'class' | 'student';
}

const Modal = (props: ModalProps) => {
  const [name, setName] = createSignal('');
  const [students, setStudents] = createSignal(0);
  const [level, setLevel] = createSignal('X');
  const [student, setStudent] = createSignal<Omit<Student, 'id'>>({
    nis: '',
    nisn: '',
    nama: '',
    jenisKelamin: '',
    alamat: '',
    tempatTanggalLahir: '',
    noHp: ''
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (props.type === 'class') {
      props.onSubmitClass(name(), students(), level());
      setName('');
      setStudents(0);
      setLevel('X');
    } else {
      props.onSubmitStudent(student());
      setStudent({
        nis: '',
        nisn: '',
        nama: '',
        jenisKelamin: '',
        alamat: '',
        tempatTanggalLahir: '',
        noHp: ''
      });
    }
    props.onClose();
  };

  return (
    <Show when={props.isOpen}>
      <div class="modal-overlay" onClick={props.onClose}>
        <div class="modal" onClick={(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h2>{props.type === 'class' ? 'Tambah Kelas Baru' : 'Tambah Siswa Baru'}</h2>
            <button class="close-button" onClick={props.onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            {props.type === 'class' ? (
              <>
                <div class="input-group">
                  <label for="class-level">Tingkat Kelas</label>
                  <select
                    id="class-level"
                    value={level()}
                    onChange={(e) => setLevel(e.currentTarget.value)}
                    required
                  >
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="class-name">Nama Kelas</label>
                  <input
                    id="class-name"
                    type="text"
                    value={name()}
                    onInput={(e) => setName(e.currentTarget.value)}
                    required
                    placeholder="Contoh: MIPA 1"
                  />
                </div>
                <div class="input-group">
                  <label for="student-count">Jumlah Siswa</label>
                  <input
                    id="student-count"
                    type="number"
                    value={students()}
                    onInput={(e) => setStudents(parseInt(e.currentTarget.value))}
                    required
                    min="1"
                    placeholder="Masukkan jumlah siswa"
                  />
                </div>
              </>
            ) : (
              <>
                <div class="input-group">
                  <label for="nis">NIS</label>
                  <input
                    id="nis"
                    type="text"
                    value={student().nis}
                    onInput={(e) => setStudent({ ...student(), nis: e.currentTarget.value })}
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="nisn">NISN</label>
                  <input
                    id="nisn"
                    type="text"
                    value={student().nisn}
                    onInput={(e) => setStudent({ ...student(), nisn: e.currentTarget.value })}
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="nama">Nama</label>
                  <input
                    id="nama"
                    type="text"
                    value={student().nama}
                    onInput={(e) => setStudent({ ...student(), nama: e.currentTarget.value })}
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="jenisKelamin">Jenis Kelamin</label>
                  <select
                    id="jenisKelamin"
                    value={student().jenisKelamin}
                    onChange={(e) => setStudent({ ...student(), jenisKelamin: e.currentTarget.value })}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="alamat">Alamat</label>
                  <textarea
                    id="alamat"
                    value={student().alamat}
                    onInput={(e) => setStudent({ ...student(), alamat: e.currentTarget.value })}
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="tempatTanggalLahir">Tempat Tanggal Lahir</label>
                  <input
                    id="tempatTanggalLahir"
                    type="text"
                    value={student().tempatTanggalLahir}
                    onInput={(e) => setStudent({ ...student(), tempatTanggalLahir: e.currentTarget.value })}
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="noHp">No HP</label>
                  <input
                    id="noHp"
                    type="text"
                    value={student().noHp}
                    onInput={(e) => setStudent({ ...student(), noHp: e.currentTarget.value })}
                    required
                  />
                </div>
              </>
            )}
            <div class="modal-footer">
              <button type="button" class="cancel-button" onClick={props.onClose}>Batal</button>
              <button type="submit" class="submit-button">
                {props.type === 'class' ? 'Tambah Kelas' : 'Tambah Siswa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};

// DetailView component
const DetailView = (props: { className: string; onBack: () => void; students: Student[] }) => {
  const columnDefs = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 70 },
    { field: 'nis', headerName: 'NIS', sortable: true, filter: true },
    { field: 'nisn', headerName: 'NISN', sortable: true, filter: true },
    { field: 'nama', headerName: 'NAMA', sortable: true, filter: true },
    { field: 'jenisKelamin', headerName: 'JENIS KELAMIN', sortable: true, filter: true },
    { field: 'alamat', headerName: 'ALAMAT', sortable: true, filter: true },
    { field: 'tempatTanggalLahir', headerName: 'TEMPAT TANGGAL LAHIR', sortable: true, filter: true },
    { field: 'noHp', headerName: 'NO HP', sortable: true, filter: true }
  ];



  return (
    <div class="detail-view">
      <h2>{props.className}</h2>
      <div class="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={props.students}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <button onClick={props.onBack} class="back-button">Kembali</button>
    </div>
  );
};

// DataSiswa component
export const DataSiswa = () => {
  const [selectedClass, setSelectedClass] = createSignal('X');
  const [classes, setClasses] = createSignal<Class[]>([
    { id: 1, name: 'X MIPA 1', students: 34, level: 'X' },
    { id: 2, name: 'X MIPA 2', students: 34, level: 'X' },
    { id: 3, name: 'X MIPA 3', students: 34, level: 'X' },
    { id: 4, name: 'XI IPA 1', students: 32, level: 'XI' },
    { id: 5, name: 'XII IPS 1', students: 30, level: 'XII' },
  ]);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [modalType, setModalType] = createSignal<'class' | 'student'>('class');
  const [selectedDetailClass, setSelectedDetailClass] = createSignal<string | null>(null);
  const [students, setStudents] = createSignal<Student[]>([
    {
      id: 1,
      nis: '541221001',
      nisn: '0077768622',
      nama: 'Adhara Faliya',
      jenisKelamin: 'Perempuan',
      alamat: 'JL. MR. MOCH YAMIN, KEC. PURWOKERTO SELATAN, KARANG PUCUNG, RT 03, RW 04',
      tempatTanggalLahir: 'Purwokerto, 16 Januari 2007',
      noHp: '089966523223'
    },
  ]);


  onMount(async () => {
    try {
      // Fetch kelas dari backend
      const response = await fetch('http://localhost:8080/lihat-kelas');

      if (response.ok) {
        const data = await response.json();
        const formattedClasses = data.map((item: any) => ({
          id: item.id,
          name: item.nama_kelas,
          students: item.jumlah_siswa,
          level: item.tingkat_kelas,
        }));

        setClasses(formattedClasses);
        localStorage.setItem('classes', JSON.stringify(formattedClasses));
      } else {
        console.error('Failed to fetch classes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }

    // Jika ada students yang disimpan di localStorage, set kembali
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) setStudents(JSON.parse(savedStudents));
  });


  const addClass = async (name: string, students: number, level: string) => {
    const fullName = `${level} ${name}`;

    try {
      const response = await fetch('http://localhost:8080/tambah-kelas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tingkat_kelas: level,
          nama_kelas: fullName,
          jumlah_siswa: students,
        }),
      });

      if (response.ok) {
        const newClass = await response.json();

        setClasses([...classes(), { id: newClass.id, name: fullName, students, level }]);
      } else {
        console.error('Gagal menambahkan kelas:', response.statusText);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan kelas:', error);
    }
  };


  const addStudent = (newStudent: Omit<Student, 'id'>) => {
    const newId = students().length > 0 ? Math.max(...students().map(s => s.id)) + 1 : 1;
    setStudents([...students(), { ...newStudent, id: newId }]);
    // Update the student count for the selected class
    if (selectedDetailClass()) {
      setClasses(classes().map(c =>
        c.name === selectedDetailClass() ? { ...c, students: c.students + 1 } : c
      ));
    }
  };

  const removeClass = (id: number) => {
    setClasses(classes().filter(c => c.id !== id));
  };

  const filteredClasses = () => classes().filter(c => c.level === selectedClass());

  return (
    <div class="data-siswa-container">
      <Show
        when={!selectedDetailClass()}
        fallback={
          <>
            <DetailView
              className={selectedDetailClass() || ''}
              onBack={() => setSelectedDetailClass(null)}
              students={students()}

            />
            <div class="PlusSiswa">
              <CMSButton onClick={() => { setModalType('student'); setIsModalOpen(true); }}>
                + Siswa
              </CMSButton>
            </div>
          </>
        }
      >
        <div class="top-bar">
          <div class="class-selector">
            <span>Kelas : </span>
            <select value={selectedClass()} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>
          <CMSButton onClick={() => { setModalType('class'); setIsModalOpen(true); }}>
            + Kelas
          </CMSButton>
        </div>

        <div class="class-grid">
          <For each={filteredClasses()}>
            {(classItem) => (
              <div class="class-card">
                <button class="delete-button" onClick={() => removeClass(classItem.id)}>×</button>
                <h3>{classItem.name}</h3>
                <p>{classItem.students} Siswa</p>
                <button class="check-detail" onClick={() => setSelectedDetailClass(classItem.name)}>
                  Cek detail
                </button>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Modal
        isOpen={isModalOpen()}
        onClose={() => setIsModalOpen(false)}
        onSubmitClass={addClass}
        onSubmitStudent={addStudent}
        type={modalType()}
      />
    </div>
  );
};
