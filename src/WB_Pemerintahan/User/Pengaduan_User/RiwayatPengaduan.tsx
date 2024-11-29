import { createSignal, onMount, createMemo } from "solid-js";
import "./RiwayatPengaduan.css";
import { FaRegularTrashCan } from 'solid-icons/fa';
import Navbar from "../Navbar/Navbar";

const HistoryLaporan = () => {
  const [reports, setReports] = createSignal<any[]>([]);
  const [showDeletePopup, setShowDeletePopup] = createSignal(false);
  const [reportToDelete, setReportToDelete] = createSignal<any | null>(null);

  // Fetch reports from the server when the component is mounted
  onMount(() => {
    fetchReportsFromServer();
  });

  // Fetch the reports from the backend server
  const fetchReportsFromServer = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/pengaduan-all");
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Confirm delete operation and show the popup
  const confirmDeleteReport = (report: any) => {
    setReportToDelete(report);
    setShowDeletePopup(true);
  };

  // Delete a report by sending a request to the server
  const deleteReport = async () => {
    const report = reportToDelete();
    if (!report) return;

    try {
      const response = await fetch(`http://127.0.0.1:8080/pengaduan/${report.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refetch the reports after successful deletion
        fetchReportsFromServer();
        setShowDeletePopup(false);
      } else {
        console.error("Failed to delete report");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // Create a memoized version of the reports list
  const reportList = createMemo(() => reports());

  return (
    <section class="riwayat-history-page">
      <Navbar />
      <h2 class="riwayat-reports-title">Riwayat Laporan Anda</h2>
      <div class="riwayat-reports-container">
        {reportList().map((report) => (
          <div class="riwayat-report-card">
            <div class="riwayat-report-header">
              <h3>{report.title}</h3>
              <p>{new Date(report.date).toLocaleDateString()}</p>
              <button class="riwayat-delete-button" onClick={() => confirmDeleteReport(report)}>
                <FaRegularTrashCan />
              </button>
            </div>
            <p class="riwayat-report-description">{report.description}</p>
            <div class="riwayat-report-footer">
              <span class="riwayat-report-location">{report.location}</span>
              <span class="riwayat-report-status">{report.status}</span>
            </div>
            {report.file_path && (
              <div class="riwayat-report-attachment">
                <a href={`path/to/attachments/${report.file_path}`} target="_blank" rel="noopener noreferrer">
                  Lampiran: {report.file_path}
                </a>
              </div>
            )}
          </div>
        ))}
        {reportList().length === 0 && <p class="riwayat-reports-p">Belum ada laporan yang dibuat.</p>}
      </div>

      {/* Pop-up konfirmasi hapus */}
      {showDeletePopup() && (
        <div class="riwayat-delete-popup">
          <div class="riwayat-popup-content">
            <p>Apakah Anda yakin ingin menghapus laporan ini?</p>
            <div class="riwayat-popup-buttons">
              <button onClick={deleteReport} class="riwayat-popup-confirm">Hapus</button>
              <button onClick={() => setShowDeletePopup(false)} class="riwayat-popup-cancel">Batal</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HistoryLaporan;
