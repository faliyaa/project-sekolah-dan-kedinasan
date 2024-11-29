import { Component } from 'solid-js';
import Navbar from '../Navbar/Navbar';
import './DetailBerita.css';
import Footer from '../Footer/Footer';

import asset1 from "../../Aset_Pemerintahan/arrowLeft.svg";
import asset2 from "../../Aset_Pemerintahan/like.svg";
import asset3 from "../../Aset_Pemerintahan/salinLink.svg";
import asset4 from "../../Aset_Pemerintahan/facebook.svg";
import asset5 from "../../Aset_Pemerintahan/whatsapp.svg";
import asset6 from "../../Aset_Pemerintahan/gambarContent.svg";


const DetailBerita: Component = () => {
    return (

        <>
        <Navbar />
            <div class="container">
                
                <div class="detail-berita">

                    <div class="sejajar">
                            <button class="iconKembali">
                                <img class="kembali" src={asset1} alt="balik" />
                            </button>
                        <div class="back-button">
                            <h1 class="populerText">Populer</h1>
                        </div>
                    </div>

                    <h1 class="content-luar">HJKB ke-214, Pj Wali Kota: Momentum Evaluasi dan Inovasi untuk Bandung Maju Berkelanjutan</h1>
                    <p class="author-date">Humas Kota Bandung - Rabu, 25 September 2024 14:22</p>

                        <div class="share-buttons">
                            <button>
                                <img src={asset2} alt="like" />
                            </button>
                            <button>
                                <img src={asset3} alt="Link" />
                            </button>
                            <button>
                                <img src={asset4} alt="Facebook" />
                            </button>
                            <button>
                                <img src={asset5} alt="WhatsApp" />
                            </button>
                        </div>


                    <div class="berita-content">
                        <img src={asset6} alt="Upacara HJKB" class="main-image" />
                        <p class="berita-paragraph">
                            Kota Bandung memperingati Hari Jadi ke-214 di Plaza Balai, Rabu 25 September 2024. Pj Wali Kota Bandung, A. Koswara menegaskan, momen ini harus dijadikan sebagai evaluasi terhadap hal yang telah, sedang, dan akan dilakukan untuk mewujudkan Kota Bandung Maju Berkelanjutan sesuai tema HJKB tahun ini.
                        </p>
                        <p class="berita-paragraph">
                            “Peringatan 214 tahun Kota Bandung, bukan sekedar perayaan hari jadi, tetapi sejatinya harus menjadi momentum evaluasi terhadap apa yang telah, sedang, dan akan dilakukan dalam memberi warna terhadap kemajuan kota ini,” ujarnya.
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default DetailBerita;
