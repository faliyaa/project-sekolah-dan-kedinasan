import { createSignal, Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './TranskripNilai.css';
import Sidebar from '../../Sidebar/sidebar';
import Navbar from '../../Navbar/navbar';

const TranscriptGrades: Component = () => {
    const [columnDefs] = createSignal([
        { headerName: 'No', field: 'no', width: 70 },
        { headerName: 'Mata Pelajaran', field: 'subject', width: 200 },
        { headerName: 'KKM', field: 'kkm', width: 100 },
        { headerName: 'Nilai Pengetahuan', field: 'knowledge', width: 200 },
        { headerName: 'Nilai Keterampilan', field: 'skill', width: 200 },
    ]);

    const [rowData] = createSignal([
        { no: '01', subject: 'Bahasa Indonesia', kkm: 70, knowledge: 90, skill: 70 },
        { no: '02', subject: 'Matematika', kkm: 75, knowledge: 85, skill: 85 },
        { no: '03', subject: 'Bahasa Inggris', kkm: 75, knowledge: 75, skill: 85 },
        { no: '04', subject: 'PPKN', kkm: 70, knowledge: 90, skill: 80 },
        { no: '05', subject: 'Fisika', kkm: 75, knowledge: 95, skill: 95 },
        { no: '06', subject: 'Sejarah', kkm: 75, knowledge: 95, skill: 75 },
        { no: '07', subject: 'Kimia', kkm: 70, knowledge: 80, skill: 90 },
        { no: '08', subject: 'Biologi', kkm: 75, knowledge: 85, skill: 85 },
    ]);

    return (
        <div class="transcript-container">
            <Sidebar />
            <Navbar />
            <main class="transcript-main">
                <div class="transcript-header">
                    <h2>Transkrip Nilai</h2>
                    <div class="student-info">541221113 - Arabella Caroline</div>
                </div>
                <div class="ag-theme-alpine grid-wrapper">
                    <AgGridSolid
                        columnDefs={columnDefs()}
                        rowData={rowData()}
                        pagination={true}
                        paginationPageSize={10}
                        domLayout="autoHeight"
                        rowSelection="single"
                        animateRows={true}
                    />
                </div>
            </main>
        </div>
    );
};

export default TranscriptGrades;
