import { createSignal, onMount } from "solid-js";
import Navbar from '../Navbar/Navbar';
import './PengaduanUser.css';
import Footer from '../Footer/Footer';

export default function ReportForm() {
    const [loggedInUser, setLoggedInUser] = createSignal<string | null>(null);
    const [fileName, setFileName] = createSignal("Upload Lampiran (Max 10 MB)");
    const [showPopup, setShowPopup] = createSignal(false);
    const [showValidationError, setShowValidationError] = createSignal(false);
    const [validationError, setValidationError] = createSignal("");
    const [isSubmitting, setIsSubmitting] = createSignal(false);

    onMount(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (user) {
            setLoggedInUser(user.username);
        }
    });

    const handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            // Add file size validation (10MB = 10 * 1024 * 1024 bytes)
            if (file.size > 10 * 1024 * 1024) {
                setValidationError("Ukuran file tidak boleh lebih dari 10MB");
                setShowValidationError(true);
                setTimeout(() => setShowValidationError(false), 3000);
                input.value = '';
                setFileName("Upload Lampiran (Max 10 MB)");
                return;
            }
            setFileName(file.name);
        } else {
            setFileName("Upload Lampiran (Max 10 MB)");
        }
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            // Validate required fields
            const requiredFields = ['name', 'title', 'description', 'date', 'location', 'file'];
            for (const field of requiredFields) {
                if (!formData.get(field)) {
                    throw new Error("Semua field harus diisi dan file harus diupload.");
                }
            }

            // Add username to formData
            formData.append('username', loggedInUser() || '');

            // Send to backend
            const response = await fetch('http://localhost:8080/pengaduan-user', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Terjadi kesalahan saat mengirim laporan');
            }

            const result = await response.json();
            
            // Show success popup
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                form.reset();
                setFileName("Upload Lampiran (Max 10 MB)");
                window.location.href = "/RiwayatPengaduan-user";
            }, 3000);

        } catch (error) {
            console.error('Error submitting report:', error);
            setValidationError(error.message || 'Terjadi kesalahan saat mengirim laporan');
            setShowValidationError(true);
            setTimeout(() => setShowValidationError(false), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div class="pengaduan-form-page">
        <Navbar />
        <div class="illustration-card">
            <div class="illustration-content">
                <h1>Sampaikan Laporan Anda dengan Mudah</h1>
                <p>Laporkan pengaduan, aspirasi, atau permintaan informasi dengan cepat dan aman.</p>
            </div>
        </div>

        <div class="pengaduan-form-container">
            <form action="#" method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <label for="name" class="label-pengaduan">Nama:</label>
                <input type="text" name="name" class="input-pengaduan" placeholder="Ketikkan nama Anda" required />

                <label for="title" class="label-pengaduan">Judul Laporan: <span>*</span></label>
                <input type="text" name="title" class="input-pengaduan" placeholder="Ketikkan judul laporanmu disini!" required />

                <label for="description" class="label-pengaduan">Isi Laporan: <span>*</span></label>
                <textarea name="description" class="input-pengaduan" placeholder="Ketikkan isi laporan Anda" rows="5" required></textarea>

                <label for="date" class="label-pengaduan">Tanggal Kejadian: <span>*</span></label>
                <input type="date" name="date" class="input-pengaduan" required />

                <label for="location" class="label-pengaduan">Lokasi Kejadian: <span>*</span></label>
                <input type="text" name="location" class="input-pengaduan" placeholder="Ketik lokasi kejadian" required />

                <div class="pengaduan-file-upload">
                    <input 
                        type="file" 
                        id="file" 
                        name="file"
                        class="pengaduan-file-input" 
                        accept=".jpg,.jpeg,.png,.pdf" 
                        required 
                        onChange={handleFileChange} 
                    />
                    <label for="file">{fileName()}</label>
                </div>
                <button type="submit" disabled={isSubmitting()}>
                    {isSubmitting() ? 'Mengirim...' : 'Lapor Sekarang!'}
                </button>
            </form>
            {showPopup() && (
                <div class="pengaduan-popup">
                    <img src="src\WB_Pemerintahan\User\Assets\centangg.png" alt="Check" class="pengaduan-check-icon" />
                    <p>Laporan Anda akan segera diproses</p>
                    <button onClick={() => window.location.href = "/RiwayatPengaduan-user"} class="btn">
                        Cek Laporanmu!
                    </button>
                </div>
            )}
            {showValidationError() && (
                <div class="pengaduan-popup warning">
                    <p>{validationError()}</p>
                </div>
            )}
        </div>
        <Footer />

        <div class="floating-button" onClick={() => window.location.href = '/RiwayatPengaduan-user'}>
            <img src="src\WB_Pemerintahan\User\Assets\hisstory.svg" alt="Riwayat" />
        </div>
    </div>
);
}