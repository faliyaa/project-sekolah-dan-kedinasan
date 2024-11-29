import { createSignal, createMemo } from 'solid-js';
import AgGrid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './JadwalPelajaran.css';

const JadwalPelajaran = () => {
  const [selectedClass, setSelectedClass] = createSignal('');
  const [selectedSubClass, setSelectedSubClass] = createSignal('');
  const [selectedMajor, setSelectedMajor] = createSignal('');
  const [showEditPopup, setShowEditPopup] = createSignal(false);
  const [editingRow, setEditingRow] = createSignal(null);

  const handleClassSelect = (e) => {
    setSelectedClass(e.currentTarget.value);
    setSelectedSubClass('');
  };

  const handleSubClassSelect = (subClass) => {
    setSelectedSubClass(subClass);
  };

  const [rowData, setRowData] = createSignal([
    { time: '07.00-08.00', monday: 'Upacara', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { time: '08.00-09.00', monday: 'IPS', tuesday: 'PJOK', wednesday: 'MATH', thursday: 'IPA', friday: 'PKN' },
    { time: '09.00-10.00', monday: 'Bahasa Indonesia', tuesday: 'Bahasa Inggris', wednesday: 'Sejarah', thursday: 'Matematika', friday: 'Seni Budaya' },
    { time: '10.00-11.00', monday: 'Kimia', tuesday: 'Fisika', wednesday: 'Ekonomi', thursday: 'Biologi', friday: 'PJOK' },
    { time: '11.00-12.00', monday: 'Biologi', tuesday: 'Geografi', wednesday: 'Matematika', thursday: 'IPS', friday: 'Bahasa Inggris' },
    { time: '12.00-13.00', monday: 'Istirahat', tuesday: 'Istirahat', wednesday: 'Istirahat', thursday: 'Istirahat', friday: 'Istirahat' },
    { time: '13.00-14.00', monday: 'PKN', tuesday: 'Sejarah', wednesday: 'Bahasa Indonesia', thursday: 'Bahasa Inggris', friday: 'Kimia' },
    { time: '14.00-15.00', monday: 'Fisika', tuesday: 'Seni Budaya', wednesday: 'PJOK', thursday: 'Biologi', friday: 'Ekonomi' },
    { time: '15.00-16.00', monday: 'Matematika', tuesday: 'Kimia', wednesday: 'IPS', thursday: 'Bahasa Indonesia', friday: 'Geografi' },
  ]);

  const handleEdit = (params) => {
    setEditingRow(params.data);
    setShowEditPopup(true);
  };

  const handleSave = (updatedData) => {
    setRowData((prevData) =>
      prevData.map((row) => (row.time === updatedData.time ? updatedData : row))
    );
    setShowEditPopup(false);
    setEditingRow(null);
  };

  const columnDefs = createMemo(() => [
    { headerName: "Jam", field: "time", editable: false },
    { headerName: "Senin", field: "monday" },
    { headerName: "Selasa", field: "tuesday" },
    { headerName: "Rabu", field: "wednesday" },
    { headerName: "Kamis", field: "thursday" },
    { headerName: "Jumat", field: "friday" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <button onClick={() => handleEdit(params)} class="jp-edit-button">
          Edit
        </button>
      ),
    },
  ]);

  const EditPopup = ({ row, onSave, onClose }) => {
    const [editData, setEditData] = createSignal({ ...row });

    const handleInputChange = (field, value) => {
      setEditData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div class="jp-edit-popup">
        <h3>Edit Jadwal</h3>
        <p>Jam: {editData().time}</p>
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
          <div>
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <input
              type="text"
              value={editData()[day]}
              onInput={(e) => handleInputChange(day, e.currentTarget.value)}
            />
          </div>
        ))}
        <div class="jp-edit-popup-actions">
          <button onClick={() => onSave(editData())} class="jp-save-button">Simpan</button>
          <button onClick={onClose} class="jp-cancel-button">Batal</button>
        </div>
      </div>
    );
  };

  return (
    <div class="jp-container">
      <div class="jp-main-container">
        <main class="jp-main-content">
          <h2 class="jp-page-title">Jadwal Pelajaran</h2>

          {/* Class and Major selection */}
          <div class="jp-class-select-container">
            <select
              class="jp-class-select"
              value={selectedClass()}
              onChange={handleClassSelect}
            >
              <option value="">Pilih Kelas</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>

            <select
              class="jp-major-select"
              value={selectedMajor()}
              onChange={(e) => setSelectedMajor(e.currentTarget.value)}
            >
              <option value="">Pilih Jurusan</option>
              <option value="MIPA">MIPA</option>
              <option value="IPS">IPS</option>
              <option value="Bahasa">Bahasa</option>
            </select>
          </div>

          {/* Only show subclasses and schedule if both class and major are selected */}
          {selectedClass() && selectedMajor() && (
            <>
              <div class="jp-subclass-container">
                {['A', 'B', 'C', 'D', 'E', 'F'].map(subClass => (
                  <button
                    class={`jp-subclass-button ${selectedSubClass() === subClass ? 'jp-subclass-active' : ''}`}
                    onClick={() => handleSubClassSelect(subClass)}
                  >
                    {selectedClass()} {subClass}
                  </button>
                ))}
              </div>

              {selectedSubClass() && (
                <div class="jp-schedule-container" style={{ overflow: 'auto' }}>
                  <h3 class="jp-schedule-title">JADWAL PELAJARAN {selectedClass()} {selectedSubClass()}</h3>
                  <p class="jp-schedule-subtitle">Tahun Ajaran 2023/2024</p>
                  <div style={{ height: '400px', width: '100%' }}>
                    <AgGrid
                      class="ag-theme-alpine"
                      columnDefs={columnDefs()}
                      rowData={rowData()}
                    />
                  </div>
                </div>
              )}

              {!selectedSubClass() && (
                <div class="jp-no-data">
                  <img src="src/Admin/Image/download__47_-removebg-preview 1.png" alt="No Data" class="jp-no-data-icon" />
                  <p class="jp-no-data-text">Silakan pilih subkelas</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {showEditPopup() && (
        <div class="jp-popup-overlay">
          <EditPopup
            row={editingRow()}
            onSave={handleSave}
            onClose={() => setShowEditPopup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default JadwalPelajaran;
