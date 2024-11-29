import { Component, createSignal } from "solid-js";
import eye from '../Assets/mata.svg';
import rocket from '../Assets/rocket.svg';
import upload from '../Assets/document-upload.svg';
import edit from '../Assets/icon-edit.svg';
import './localgoverment.css';
import SidebarAdmin from "../Sidebar/sidebaradmin";
import NavbarAdmin from "../Navbar/navbaradmin";

const LocalGovernment: Component = () => {
    const [imageSrc, setImageSrc] = createSignal<string | null>(null);
    const [imageFile, setImageFile] = createSignal<File | null>(null);
    const [formData, setFormData] = createSignal({
        visidanmisi: "",
        visi: "",
        misi: "",
    });

    // Handle image file selection
    const handleImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle text input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        const submitData = new FormData();
        submitData.append('visidanmisi', formData().visidanmisi);
        submitData.append('visi', formData().visi);
        submitData.append('misi', formData().misi);

        if (imageFile()) {
            submitData.append('struktur_pemerintahan', imageFile()!);
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/visi_misi', {
                method: 'POST',
                body: submitData,
            });

            if (response.ok) {
                alert('Data berhasil disimpan!');
                // Optional: Reset form or redirect
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Gagal menyimpan data. Silakan coba lagi.');
        }
    };

    return (
        <div class="admin-page-government">
            <SidebarAdmin />
            <NavbarAdmin />
            <div class="content-government">
                <h1>Kelola Visi dan Misi</h1>

                <form onSubmit={handleSubmit}>
                    <div class="content-in-government">
                        <h2>Visi dan Misi Kota Bandung</h2>
                        <textarea
                            value={formData().visidanmisi}
                            onInput={(e) => handleInputChange('visidanmisi', e.currentTarget.value)}
                            placeholder="Masukkan deskripsi visi dan misi..."
                            class="visimisi-textarea"
                        />

                        <div class="vision-mission">
                            <div class="vision">
                                <img src={eye} class="eye" />
                                <h3>Visi</h3>
                                <textarea
                                    value={formData().visi}
                                    onInput={(e) => handleInputChange('visi', e.currentTarget.value)}
                                    placeholder="Masukkan visi..."
                                    class="vision-textarea"
                                />
                            </div>
                            <div class="mission">
                                <img src={rocket} alt="" />
                                <h3>Misi</h3>
                                <textarea
                                    value={formData().misi}
                                    onInput={(e) => handleInputChange('misi', e.currentTarget.value)}
                                    placeholder="Masukkan misi..."
                                    class="mission-textarea"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="government-structure">
                        <h2>Struktur Pemerintahan</h2>
                        <div class="overlay">
                            <div class="upload-area" style={{ position: 'relative' }}>
                                {imageSrc() && (
                                    <img src={imageSrc()} alt="Uploaded Document" class="uploaded-image" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style="display: none;"
                                    id="file-upload"
                                />
                                <label for="file-upload" style={{ cursor: 'pointer' }}>
                                    <img src={upload} alt="Upload Icon" class="upload-icon"/>
                                    <p>Upload Dokumen Struktur Pemerintahan (Max 10 MB)</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="button-container-government">
                        <button type="submit" class="save-button-government">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocalGovernment;