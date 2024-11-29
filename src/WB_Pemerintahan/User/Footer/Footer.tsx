import { Component } from 'solid-js';
import styles from './Footer.module.css';

const Footer: Component = () => {
  return (
    <footer class={styles.footer}>
      <div class={styles.content}>
        <div class={styles.logoSection}>
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\logo_bandung.svg" alt="Bandung Logo" class={styles.logo} />
          <div>
            <h2 class={styles.title}>Bandung</h2>
            <p class={styles.subtitle}>Portal Resmi Kota Bandung</p>
          </div>
        </div>

        <nav class={styles.links}>
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Privasi Kami</a>
          <a href="#">Kontak</a>
          <a href="#">Bantuan & Masukan</a>
        </nav>
        <div class={styles.sponsor}>
        <div class={styles.programs}>
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Bandung smart.svg" alt="Bandung Smart City" />
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\Hayu.svg" alt="HAY.U" />
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\sipandu.svg" alt="Sipandu" />
        </div>
        </div>

        <div class={styles.address}>
          <img src="src\WB_Pemerintahan\Aset_Pemerintahan\alamatIcon.svg" alt="Location Icon" class={styles.locationIcon} />
          <div>
            <p>Alamat :</p>
            <p>Jl. Wastukencana Permatasari No.128, Kec. Bandung Barat, Bandung, Jawa Barat 40117</p>
          </div>
        </div>
      </div>

      <div class={styles.socialIcons}>
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\linkedinFooter.svg" alt="LinkedIn" />
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\facebookFooter.svg" alt="Facebook" />
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\instagramFooter.svg" alt="Instagram" />
        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\twitterFooter.svg" alt="Twitter" />
      </div>

      <div class={styles.copyright}>
        <p>2024 Sentra Darurat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;