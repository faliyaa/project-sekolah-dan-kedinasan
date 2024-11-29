import { Component, For, createSignal } from 'solid-js';
import styles from './InformasiPopulerPopup.module.css';
import kpu from '../kpu2.png';
import donor from '../donor.png';

interface InfoItem {
  id: number;
  image: string;
  title: string;
  description: string;
  likes: number;
}

const InformasiPopulerPopup: Component = () => {
  const [infoItems, setInfoItems] = createSignal<InfoItem[]>([
    {
      id: 1,
      image: kpu,
      title: 'KPU Tunggu Juknis Pelaksanaan Debat Paslon Pilwakot Bandung',
      description: 'KPU Kota Bandung akan melaksanakan tahapan debat pasangan calon wali kota dan wakil wali kota. Namun masih..',
      likes: 500,
    },
    {
      id: 2,
      image: donor,
      title: 'HJKB ke-214, Rumah Sakit Bandung Kiwari dan PMI Gelar Donor Darah',
      description: 'KPU Kota Bandung akan melaksanakan tahapan debat pasangan calon wali kota dan wakil wali kota. Namun masih..',
      likes: 500,
    },
  ]);

  const [selectedItems, setSelectedItems] = createSignal<number[]>([]);

  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div class={styles.popupOverlay}>
      <div class={styles.popupContent}>
        <div class={styles.popupHeader}>
          <h2>Pilih Informasi Populer yang akan di tampilkan</h2>
          <button class={styles.closeButton}>×</button>
        </div>
        <div class={styles.infoContainer}>
          <For each={infoItems()}>
            {(item) => (
              <div 
                class={`${styles.infoItem} ${selectedItems().includes(item.id) ? styles.selected : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <div class={styles.imageContainer}>
                  <img src={item.image} alt={item.title} />
                  <div class={styles.likes}>
                    <span class={styles.heartIcon}>❤</span> {item.likes}
                  </div>
                </div>
                <div class={styles.infoContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <input 
                  type="checkbox" 
                  class={styles.checkbox} 
                  checked={selectedItems().includes(item.id)}
                  onChange={() => {}} // Untuk mencegah event bubbling
                />
              </div>
            )}
          </For>
        </div>
        <div class={styles.actionButtons}>
          <button class={styles.cancelButton}>Batalkan</button>
          <button class={styles.saveButton}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default InformasiPopulerPopup;