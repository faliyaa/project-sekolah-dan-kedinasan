import Navbar from '../../Navbar/navbar';
import Sidebar from '../../Sidebar/sidebar';
import './detailmateri.css';
import images from '../../img/image.svg';
import upload from '../../img/upload.svg';
import docs from '../../img/docs.svg';
import choosefile from '../../img/choosefile.svg';
import folder from '../../img/folder.svg';
import line from '../../img/line9.svg';
import soal from '../../img/soal.svg';
import { createSignal } from 'solid-js';

const DetailQuestion = () => {
    const [docsFile, setDocsFile] = createSignal<File | null>(null);
    const [uploadFile, setUploadFile] = createSignal<File | null>(null);
    const [imageFile, setImageFile] = createSignal<File | null>(null);
    const [chooseLink, setChooseLink] = createSignal("");
    const [answer, setAnswer] = createSignal("");

    const handleDocsChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setDocsFile(target.files ? target.files[0] : null);
    };

    const handleUploadChange = (event) => {
        const files = event.target.files; // Ambil file yang diupload
        if (files.length > 0) {
            console.log('Files uploaded:', files);
            setUploadFile(files[0]); // Simpan file pertama ke dalam state
        }
    };

    const handleImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setImageFile(target.files ? target.files[0] : null);
    };

    const handleChooseLink = () => {
        const link = prompt("Masukkan URL untuk file/link:");
        if (link) {
            setChooseLink(link);
        }
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        // Logika untuk mengirim data ke server atau memproses file yang diunggah
        alert("Jawaban berhasil dikirim!");
    };

    return (
        <div class="detailquestion">
            <Sidebar />
            <Navbar />
            <div class="d-title">
                <h1>XII - Ilmu Pengetahuan Alam</h1>
                <img src={line} alt="line" />
                <h4>Latihan Soal PAS XII IPA</h4>
                <p>Pengampu : Amira Nadhira Prameswari</p>
            </div>
            <div class="latsopas">
                <p>
                    Hai teman-teman kelas XII! 👋 <br />
                    Sekarang waktunya kalian mengerjakan Latihan Soal PAS yang terdiri dari 30 soal pilihan ganda. Latihan ini dirancang untuk <br />
                    membantu kalian memahami materi lebih dalam dan mempersiapkan diri dengan sebaik mungkin sebelum menghadapi ujian yang <br />
                    sebenarnya. <br /> <br />
                    Berikut beberapa petunjuk penting sebelum kalian mulai mengerjakan: <br /> <br />
                    1. Waktu pengerjaan 1 jam (60 menit). Gunakan waktu dengan bijak, jangan terburu-buru tapi juga jangan terlalu lama di satu soal. <br />
                    2. Baca soal dengan cermat. Pahami setiap detail dalam soal agar bisa memilih jawaban yang paling tepat. <br />
                    3. Jika menemukan soal yang sulit, kerjakan soal yang mudah dulu, lalu kembali ke soal yang sulit di akhir waktu. <br />
                    4. Pastikan semua soal terisi, dan periksa kembali jawaban kalian jika ada waktu tersisa.
                    5. Tetap fokus dan tenang selama mengerjakan. <br /><br />
                    Ingat, Latihan Soal PAS ini penting untuk mempersiapkan kalian agar lebih siap menghadapi ujian sesungguhnya. Setiap usaha <br />
                    yang kalian lakukan hari ini akan sangat membantu untuk hasil yang lebih maksimal nanti. <br />
                    Selamat mengerjakan dan tetap semangat! 💪 Ibu yakin kalian bisa!
                </p>
                <div class="question">
                    <img src={soal} alt="soal" />
                    <h4>Latihan Soal PAS XII IPA</h4>
                </div>
                <div class="answer">
                    <input
                        class='jawaban'
                        type="text"
                        placeholder="Masukkan jawaban disini"
                        value={answer()}
                        onInput={(e) => setAnswer(e.currentTarget.value)}
                    />
                    <label>
                        <img src={docs} class='docs' alt="Upload Docs" />
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleDocsChange} hidden />
                        {docsFile() && <p>{docsFile()?.name}</p>}
                    </label>
                    <label>
                        <img src={upload} class='upload' alt="Upload Any File" />
                        <input type="file" onChange={handleUploadChange} hidden />
                        {uploadFile() && <p>{uploadFile()?.name}</p>}
                    </label>
                    <label>
                        <img src={images} class='pict' alt="Upload Image" />
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                        {imageFile() && <p>{imageFile()?.name}</p>}
                    </label>
                    <label onClick={handleChooseLink}>
                        <img src={choosefile} class='choosefile' alt="Choose File Link" />
                        {chooseLink() && <p>Link: {chooseLink()}</p>}
                    </label>
                    <label>
                        <img src={folder} class='folder' alt="Upload Folder" />
                        <input type="file" webkitdirectory="true" onChange={handleUploadChange} hidden />
                    </label>
                </div>

                <div class="btn-krm">
                    <button onClick={handleSubmit}>Kirim</button>
                </div>
            </div>
        </div>
    );
};

export default DetailQuestion;
