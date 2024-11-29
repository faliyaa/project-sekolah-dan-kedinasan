import { Component } from 'solid-js';
import styles from './Footer.module.css';

import logo from "../../Aset_Pemerintahan/logo_bandung.svg";
import asset1 from "../../Aset_Pemerintahan/BandungSmart.svg";
import asset2 from "../../Aset_Pemerintahan/Hayu.svg";
import asset3 from "../../Aset_Pemerintahan/sipandu.svg";
import asset4 from "../../Aset_Pemerintahan/alamatIcon.svg";
import asset5 from "../../Aset_Pemerintahan/linkedinFooter.svg";
import asset6 from "../../Aset_Pemerintahan/facebookFooter.svg";
import asset7 from "../../Aset_Pemerintahan/instagramFooter.svg";
import asset8 from "../../Aset_Pemerintahan/twitterFooter.svg";

const Footer: Component = () => {
  return (
    <footer class={styles.footer}>
      <div class={styles.content}>
        <div class={styles.logoSection}>
          <img src={logo} alt="Bandung Logo" class={styles.logo} />
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
          <img src={asset1} alt="Bandung Smart City" />
          <img src={asset2} alt="HAY.U" />
          <img src={asset3} alt="Sipandu" />
        </div>
        </div>

        <div class={styles.address}>
          <img src={asset4} alt="Location Icon" class={styles.locationIcon} />
          <div>
            <p>Alamat :</p>
            <p>Jl. Wastukencana Permatasari No.128, Kec. Bandung Barat, Bandung, Jawa Barat 40117</p>
          </div>
        </div>
      </div>

      <div class={styles.socialIcons}>
        <img src={asset5} alt="LinkedIn" />
        <img src={asset6} alt="Facebook" />
        <img src={asset7} alt="Instagram" />
        <img src={asset8} alt="Twitter" />
      </div>

      <div class={styles.copyright}>
        <p>2024 Sentra Darurat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;