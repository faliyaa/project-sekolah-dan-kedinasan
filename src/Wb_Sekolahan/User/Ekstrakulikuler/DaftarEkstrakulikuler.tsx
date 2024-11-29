import { createSignal } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Navbar from '../Navbar/navbar';
import Sidebar from '../Sidebar/sidebar';
import './DaftarEkstrakulikuler.css'; // Make sure to import the CSS file

const DaftarEkstrakulikuler = () => {
  const [rowData] = createSignal([
    { ekskul: 'Silat', pembimbing: 'Henoch Mahmud', jadwal: 'Senin', jumlah: '25 Siswa', icon: '🥋' },
    { ekskul: 'Basket', pembimbing: 'Murni Mastuti S.Pd', jadwal: 'Selasa', jumlah: '40 Siswa', icon: '🏀' },
    { ekskul: 'Voli', pembimbing: 'Prof. Priyono', jadwal: 'Rabu', jumlah: '20 Siswa', icon: '🏐' },
    { ekskul: 'Badminton', pembimbing: 'Ahmad', jadwal: 'Kamis', jumlah: '34 Siswa', icon: '🏸' },
    { ekskul: 'Tenis Meja', pembimbing: 'Supriyono', jadwal: 'Jumat', jumlah: '23 Siswa', icon: '🏓' },
    { ekskul: 'Taekwondo', pembimbing: 'Agus Salim', jadwal: 'Sabtu', jumlah: '45 Siswa', icon: '🥋' },
  ]);

  const columnDefs = [
    {
      headerName: 'Ekskul',
      field: 'ekskul',
      cellRenderer: (params) => (
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
            {params.data.icon}
          </div>
          <span class="text-sm font-medium text-gray-900">{params.value}</span>
        </div>
      ),
    },
    { headerName: 'Pembimbing', field: 'pembimbing' },
    { headerName: 'Jadwal', field: 'jadwal' },
    { headerName: 'Jumlah', field: 'jumlah' },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div class="flex h-screen bg-gray-100">
      <Sidebar /> {/* Add your Sidebar component here */}
      <div class="flex-1 flex flex-col">
        <Navbar /> {/* Add your Navbar component here */}
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 class="heading">Daftar Ekstrakurikuler</h1>
          <div 
            class="ag-theme-alpine bg-white shadow-md rounded-lg overflow-hidden" 
            style={{ height: '500px', width: '1050px' }}
          >
            <AgGridSolid
              rowData={rowData()}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              headerHeight={48}
              rowHeight={64}
              rowClass="hover:bg-gray-50"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DaftarEkstrakulikuler;
