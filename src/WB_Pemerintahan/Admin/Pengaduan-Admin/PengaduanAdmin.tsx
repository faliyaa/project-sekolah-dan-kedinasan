import { createSignal, For, onMount } from 'solid-js';
import styles from './PengaduanAdmin.module.css';
import IconEditStatus from '../../Admin/Pengaduan-Admin/iconEditStatus.svg';
import IconArrowDownStatus from '../../Admin/Pengaduan-Admin/iconArrowDownStatus.svg';
import IconPesan from '../../Admin/Pengaduan-Admin/iconPesanBalasan.svg';
import SidebarAdmin from '../Sidebar/sidebaradmin';
import NavbarAdmin from '../Navbar/navbaradmin';

const Pengaduan = () => {
  const [pengaduan, setPengaduan] = createSignal([]);
  const [balasan, setBalasan] = createSignal({});
  const [showStatusDropdown, setShowStatusDropdown] = createSignal({});

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8080/pengaduan-all'); // Adjust your endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPengaduan(data);
    } catch (error) {
      console.error('Error fetching pengaduan:', error);
    }
  });

  const toggleStatusDropdown = (id) => {
    setShowStatusDropdown(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Call the API to update the status
      const response = await fetch('http://localhost:8080/pengaduan/update', { // Adjust your endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the local state after successful API call
      setPengaduan(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      setShowStatusDropdown(prev => ({ ...prev, [id]: false }));

      // Optionally update localStorage if necessary
      const updatedReports = pengaduan().map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      );
      // localStorage.setItem("reports", JSON.stringify(updatedReports)); // Uncomment if you want to keep localStorage updated
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleBalasanChange = (id, value) => {
    setBalasan(prev => ({ ...prev, [id]: value }));
  };

  const handleBalasanSubmit = (id) => {
    console.log(`Balasan untuk pengaduan ${id}: ${balasan()[id]}`);
    setBalasan(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div class={styles.pageContainer}>
      <SidebarAdmin />
      <div class={styles.mainContent}>
        <NavbarAdmin />
        <div class={styles.pengaduanContainer}>
          <For each={pengaduan()}>
            {(item) => (
              <div class={styles.pengaduanCard}>
                <div class={styles.gambarContainer}>
                <img 
  src={`http://localhost:8080/${item.file_path}`} 
  alt="Gambar Aduan" 
  class={styles.gambarAduan} 
/>

                </div>
                <div class={styles.infoContainer}>
                  <div class={styles.pengaduanInfo}>
                    <div class={styles.infoItem}>
                      <span class={styles.label}>Nama:</span>
                      <span class={styles.value}>{item.name}</span>
                    </div>
                    <div class={styles.infoItem}>
                      <span class={styles.label}>Judul Laporan:</span>
                      <span class={styles.value}>{item.title}</span>
                    </div>
                    <div class={styles.infoItem}>
                      <span class={styles.label}>Tanggal:</span>
                      <span class={styles.value}>{item.date}</span>
                    </div>
                    <div class={styles.infoItem}>
                      <span class={styles.label}>Deskripsi Masalah:</span>
                      <span class={styles.value}>{item.description}</span>
                    </div>
                    <div class={styles.infoItem}>
                      <span class={styles.label}>Lokasi Masalah:</span>
                      <span class={styles.value}>{item.location}</span>
                    </div>
                  </div>
                  <div class={styles.statusContainer}>
                    <button class={styles.statusButton} onClick={() => toggleStatusDropdown(item.id)}>
                      <img src={IconEditStatus} alt="Edit Status" />
                      <span>{item.status}</span>
                      <img src={IconArrowDownStatus} alt="Arrow Down" />
                    </button>
                    {showStatusDropdown()[item.id] && (
                      <div class={styles.statusDropdown}>
                        <div onClick={() => handleStatusChange(item.id, 'not_processed')}>Menunggu</div>
                        <div onClick={() => handleStatusChange(item.id, 'processing')}>Diproses</div>
                        <div onClick={() => handleStatusChange(item.id, 'completed')}>Selesai</div>
                      </div>
                    )}
                  </div>
                  <div class={styles.balasanContainer}>
                    <img src={IconPesan} alt="Pesan" class={styles.iconPesan} />
                    <input 
                      type="text" 
                      placeholder="Tambahkan Balasan.." 
                      value={balasan()[item.id] || ''} 
                      onInput={(e) => handleBalasanChange(item.id, e.currentTarget.value)}
                      class={styles.balasanInput}
                    />
                    <button 
                      onClick={() => handleBalasanSubmit(item.id)}
                      class={styles.balasButton}
                    >
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Pengaduan;
