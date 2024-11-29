import { useNavigate } from '@solidjs/router';
import Navbar from '../Navbar/navbar';
import Sidebar from '../Sidebar/sidebar';
import './materi.css';
import line from '../img/line9.svg';
import animalcellstructure from '../img/image 11.png';
import animalcellstructure2 from '../img/image 12.png';
import pdf from '../img/pdf.svg';
import powerpoint from '../img/pp.svg';
import soal from '../img/soal.svg';
import youtube from '../img/yt.png';


const Materi = () => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/DetailMateri-user');
  };

    return (
        <>
            <div class="materi">
                <Sidebar />
                <Navbar />
                <div class="m-title">
                    <h4>Materi Ajar - Ilmu Pengetahuan Alam</h4>
                    <p>Pengampu : Amira Nadhira Prameswari</p>
                    <img src={line} alt="line" />
                </div>
                <div class="m-info">
                    <h4>Informasi Materi Kelas XII IPA</h4>
                    <p>Assalamu'alaikum Wr. Wb.<br />
                        Semangat pagi teman-teman kelas XII IPA! Semoga kalian semua selalu dalam keadaan sehat dan bahagia tentunya.<br /><br />
                        Perkenalkan, Ibu Amira Nadhira Prameswari, yang akan mengampu mata pelajaran Biologi kelas XII. Ibu sampaikan beberapa materi <br />yang akan kita pelajari di kelas XII:<br /><br />
                        <strong>Semester Ganjil</strong><br />
                        1. Struktur dan Fungsi Sel<br />
                        2. Jaringan Tumbuhan dan Hewan<br />
                        3. Metabolisme Sel<br /><br />
                        <strong>Semester Genap</strong><br />
                        1. Reproduksi Sel dan Genetika<br />
                        2. Bioteknologi<br /><br />
                        Semoga kalian dapat mengikuti materi-materi tersebut dengan baik, dan hasil yang kalian peroleh nanti bisa maksimal.<br /><br />
                        Terima kasih.<br />
                        Wassalamu'alaikum Wr. Wb.
                    </p>
                </div>
                <div class="m-1">
                    <h1>1. Struktur & Fungsi Sel</h1>
                    <p>Struktur sel terdiri dari berbagai organel seperti nukleus, mitokondria, ribosom, dan membran sel, yang masing-masing memiliki <br />
                        fungsi khusus, seperti mengontrol aktivitas sel, menghasilkan energi, membangun protein, serta mengatur pertukaran zat <br />
                        dengan lingkungan luar.</p>
                    <img src={animalcellstructure} class="img1" />
                    <img src={animalcellstructure2} class="img2" />
                    <img src={line} class="line1" alt="line" />
                    <div class="resume">
                        <img src={pdf} class="pdf" />
                        <h4>Rangkuman Materi Struktur & Fungsi Sel</h4>
                    </div>
                </div>
                <div class="m-2">
                    <h1>2. Sistem Organ Pada Manusia</h1>
                    <p>Jaringan Tumbuhan terdiri dari jaringan epidermis yang melindungi, xilem dan floem untuk transportasi air dan hasil fotosintesis,
                        serta meristem yang berperan dalam pertumbuhan. <br /> <br />
                        Sel Hewan memiliki organel seperti membran sel yang mengatur pertukaran zat, mitokondria sebagai pusat energi, retikulum <br />
                        endoplasma untuk sintesis protein, dan nukleus sebagai pengendali. Sel ini membentuk jaringan seperti otot, saraf, dan epitel <br />
                        untuk fungsi gerakan, pengiriman sinyal, dan perlindungan.</p>
                    <img src={line} class="line2" alt="line" />
                    <div class="resume2">
                        <img src={powerpoint} class="ppt" />
                        <h4>Rangkuman Materi Sistem Organ Manusia</h4>
                    </div>
                </div>
                <div class="m-3">
                    <h1>3. Metabolisme Sel</h1>
                    <p>Metabolisme adalah proses penting dalam tubuh kita, yang membantu mengubah makanan menjadi energi. Ada dua jenis reaksi <br />
                        utama: katabolisme (pemecahan zat untuk menghasilkan energi) dan anabolisme (membangun zat untuk pertumbuhan dan <br />
                        perbaikan tubuh). Proses ini menjaga agar tubuh kita tetap berfungsi dengan baik, seperti bernapas, mencerna makanan, dan <br />
                        mengedarkan nutrisi. <br /> <br />
                        Yuk, supaya lebih paham, tonton video di bawah ini! 😊</p>
                        <img src={youtube} />
                </div>
                <div class="latso" onclick={handleClick}>
                    <h1>LATIHAN SOAL PENILAIAN AKHIR SEMESTER GANJIL</h1>
                    <p>Hai teman-teman kelas XII! 👋<br /><br />
                        Sekarang waktunya kalian mengerjakan Latihan Soal PAS yang ada di bawah ini. Latihan ini sangat penting untuk membantu kalian memahami materi lebih dalam dan mempersiapkan diri dengan baik.
                        Semangat ya!💪 Jangan lupa, setiap usaha yang kalian lakukan hari ini akan membawa kalian selangkah lebih dekat menuju kesuksesan! Kerjakan dengan tenang, fokus, dan yakin pada kemampuan kalian sendiri. Ibu percaya kalian bisa!
                        Selamat mengerjakan, dan tetap semangat! </p>
                        <img src={line} class="line3" />
                        <div class="soal">
                            <img src={soal} />
                            <h4>Latihan Soal PAS XII IPA</h4>
                            <p>Tenggat: Jumat, 03 Januari 2025 (20.00 WIB)</p>
                        </div>
                </div>
                <div class="m-4">
                    <h1>4. Reproduksi Sel dan Genetika</h1>
                </div>
                <div class="m-5">
                    <h1>5. Bioteknologi </h1>
                </div>
            </div>
        </>
    );
};

export default Materi;
