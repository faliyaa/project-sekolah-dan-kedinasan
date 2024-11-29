import { createSignal, For, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import AddResidentModal from './modalbansos';
import '../Kelola Data Penduduk/datapenduduk.css';
import EditResidentModal from './modalbansosedit';
import Sidebar from '../Sidebar/sidebaradmin';
import Navbar from '../Navbar/navbaradmin';
import * as XLSX from 'xlsx';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

interface Resident {
  id: number;
  namaLengkap: string;
  NIK: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  alamat: string;
  pekerjaan: string;
  programBantuan: string;
  jenisBantuan: string;
  tanggalPenerimaanBantuan: string;
  nomorTelepon: string;
}

const STORAGE_KEY = 'residents_info_bansos';

const BantuanSosial = () => {
  const initialData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  const [residents, setResidents] = createStore<Resident[]>(initialData);
  const [isAddModalOpen, setAddModalOpen] = createSignal(false);
  const [isEditModalOpen, setEditModalOpen] = createSignal(false);
  const [editingResident, setEditingResident] = createSignal<Resident | null>(null);
  const [currentPage, setCurrentPage] = createSignal(1);
  const itemsPerPage = 10;

  createEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(residents));
  });

  const paginatedResidents = () => {
    const startIndex = (currentPage() - 1) * itemsPerPage;
    return residents.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = () => Math.ceil(residents.length / itemsPerPage);

  const addResident = (newResident: Omit<Resident, 'id'>) => {
    const newId = residents.length > 0 ? Math.max(...residents.map(r => r.id)) + 1 : 1;
    setResidents([...residents, { ...newResident, id: newId }]);
    notyf.success('Data penduduk berhasil ditambahkan!');
  };

  const updateResident = (id: number, updatedResident: Partial<Resident>) => {
    setResidents(
      residents.map(resident =>
        resident.id === id ? { ...resident, ...updatedResident } : resident
      )
    );
    notyf.success('Data penduduk berhasil diperbarui!');
  };

  const deleteResident = (id: number) => {
    setResidents(residents.filter(resident => resident.id !== id));
    notyf.success('Data penduduk berhasil dihapus!');
  };

  const handleAddModalSubmit = (data: Omit<Resident, 'id'>) => {
    addResident(data);
    setAddModalOpen(false);
  };

  const openEditModal = (resident: Resident) => {
    setEditingResident(resident);
    setEditModalOpen(true);
  };

  const handleEditModalSubmit = (data: Partial<Resident>) => {
    if (editingResident()) {
      updateResident(editingResident().id, data);
      setEditingResident(null);
    }
    setEditModalOpen(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(residents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Penerima Bantuan Sosial");
    XLSX.writeFile(workbook, "data_penerima_bantuan_sosial.xlsx");
    notyf.success('Data penerima bantuan sosial berhasil diekspor ke file Excel!');
  };

  const importFromExcel = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Omit<Resident, 'id'>[];

        const importedResidents = jsonData.map((resident, index) => ({
          ...resident,
          id: index + 1
        }));

        setResidents(importedResidents);
        notyf.success(`${importedResidents.length} data penerima bantuan sosial berhasil diimpor!`);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Navbar/>
      <Sidebar/>

      <div class="data-management">
        <header>
          <h1>Data Penerima Bantuan Sosial</h1>
          <div class="header-buttons">
            <button class="add-data" onClick={() => setAddModalOpen(true)}>
              + Tambah Data
            </button>
            <button class="export-file" onClick={exportToExcel}>
              Export data penerima bantuan
            </button>
            <input
              type="file"
              id="fileUpload"
              accept=".xlsx, .xls"
              style="display: none;"
              onChange={importFromExcel}
            />
            <button class="import-file" onClick={() => document.getElementById('fileUpload')?.click()}>
              Import data penerima bantuan
            </button>
          </div>
        </header>

        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Lengkap</th>
                <th>NIK</th>
                <th>Jenis Kelamin</th>
                <th>Program Bantuan</th>
                <th>Alamat</th>
                <th>Pekerjaan</th>
                <th>Jenis Bantuan</th>
                <th>Tanggal Penerimaan</th>
                <th>Nomor Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <For each={paginatedResidents()}>
                {(resident, index) => (
                  <tr class={index() % 2 === 0 ? 'even' : 'odd'}>
                    <td>{(currentPage() - 1) * itemsPerPage + index() + 1}</td>
                    <td>{resident.namaLengkap}</td>
                    <td>{resident.NIK}</td>
                    <td>{resident.jenisKelamin}</td>
                    <td>{resident.programBantuan}</td>
                    <td>{resident.alamat}</td>
                    <td>{resident.pekerjaan}</td>
                    <td>{resident.jenisBantuan}</td>
                    <td>{resident.tanggalPenerimaanBantuan}</td>
                    <td>{resident.nomorTelepon}</td>
                    <td>
                      <button
                        class="edit"
                        onClick={() => openEditModal(resident)}
                      >
                        Edit
                      </button>
                      <button class="delete" onClick={() => deleteResident(resident.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        <div class="pagination">
          <button
            class="prev"
            onClick={() => setCurrentPage(currentPage() - 1)}
            disabled={currentPage() === 1}
          >
            Previous
          </button>
          <span>Page {currentPage()} of {totalPages()}</span>
          <button
            class="next"
            onClick={() => setCurrentPage(currentPage() + 1)}
            disabled={currentPage() === totalPages()}
          >
            Next
          </button>
        </div>

        <AddResidentModal
          isOpen={isAddModalOpen()}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddModalSubmit}
        />

        {isEditModalOpen() && (
          <EditResidentModal
            isOpen={isEditModalOpen()}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleEditModalSubmit}
            resident={editingResident()}
          />
        )}
      </div>
    </div>
  );
};

export default BantuanSosial;