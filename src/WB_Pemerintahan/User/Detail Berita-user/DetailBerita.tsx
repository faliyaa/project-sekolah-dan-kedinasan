import { Component } from 'solid-js';
import Navbar from '../Navbar/Navbar';
import './DetailBerita.css';
import Footer from '../Footer/Footer';

const DetailBerita: Component = () => {
    return (

        <>
        <Navbar />
            <div class="container">
                
                <div class="detail-berita">

                    <div class="sejajar">
                            <button class="iconKembali">
                                <img class="kembali" src="src\WB_Pemerintahan\Aset_Pemerintahan\arrowLeft.svg" alt="balik" />
                            </button>
                        <div class="back-button">
                            <h1 class="populerText">Populer</h1>
                        </div>
                    </div>

                    <h1 class="content-luar">HJKB ke-214, Pj Wali Kota: Momentum Evaluasi dan Inovasi untuk Bandung Maju Berkelanjutan</h1>
                    <p class="author-date">Humas Kota Bandung - Rabu, 25 September 2024 14:22</p>

                        <div class="share-buttons">
                            <button>
                                <img src="src\WB_Pemerintahan\Aset_Pemerintahan\like.svg" alt="like" />
                            </button>
                            <button>
                                <img src="src\WB_Pemerintahan\Aset_Pemerintahan\salinLink.svg" alt="Link" />
                            </button>
                            <button>
                                <img src="src\WB_Pemerintahan\Aset_Pemerintahan\facebook.svg" alt="Facebook" />
                            </button>
                            <button>
                                <img src="src\WB_Pemerintahan\Aset_Pemerintahan\whatsapp.svg" alt="WhatsApp" />
                            </button>
                        </div>


                    <div class="berita-content">
                        <img src="src\WB_Pemerintahan\Aset_Pemerintahan\gambarContent.svg" alt="Upacara HJKB" class="main-image" />
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
