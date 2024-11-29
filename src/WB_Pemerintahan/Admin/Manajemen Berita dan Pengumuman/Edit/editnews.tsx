import { Component, createSignal, createEffect } from 'solid-js';
import back from '../../Assets/back.svg';
import img from '../../Assets/img.png'; // Gambar default
import edit from '../../Assets/edit.svg'; // Ikon edit
import line from '../../Assets/linepart3.svg';
import Sidebar from '../../Sidebar/sidebaradmin';
import Navbar from '../../Navbar/navbaradmin';
import './editnews.css';
import { useNavigate } from '@solidjs/router';

const EditNews: Component = () => {
  const [description, setDescription] = createSignal('KPU Kota Bandung akan melaksanakan tahapan debat pasangan calon wali kota dan wakil wali kota. Namun masih..');
  const [charCount, setCharCount] = createSignal(0);
  const [imageSrc, setImageSrc] = createSignal(img); // Menggunakan signal untuk gambar
  const MAX_CHARS = 9999;
  const [isInputFocused, setIsInputFocused] = createSignal(false);
  const [title, setTitle] = createSignal("KPU Tunggu Juknis Pelaksanaan Debat Paslon Pilwalkot Bandung"); // Signal for title
  let inputRef: HTMLInputElement | undefined; // Reference variable for input


  // Update charCount sesuai panjang description saat komponen pertama kali di-render
  createEffect(() => {
    setCharCount(description().length); // Hitung panjang teks awal secara otomatis
  });

  // Hitung karakter saat teks berubah
  const handleDescriptionChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setDescription(target.value);
    setCharCount(target.value.length);
  };

  const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string); // Update gambar dengan file baru
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/ManajemenBeritaPengumuman-admin');
  };

  return (
    <div class="edit-news-container">
      <Sidebar />
      <Navbar />
      <div class="back-button-edit-news">
        <img src={back} alt="" onclick={handleBack} />
        <h1 onclick={handleBack}>Edit Berita</h1>
      </div>
      <main>
        <div class="edit-news-form">
          <div class="title-edit-news">
            <img src={imageSrc()} alt="Berita" />
            <label for="image-upload">
              <img src={edit} alt="Edit" class="edit-img" />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style="display: none;" // Menyembunyikan input file
              onChange={handleImageChange}
            />
            <div
                contentEditable
                class="editable-news"
                onInput={(e) => setTitle(e.currentTarget.textContent || '')} // Update title on input
                onFocus={() => setIsInputFocused(true)} // Set focus state to true
                onBlur={() => setIsInputFocused(false)} // Set focus state to false
                role="textbox"
                aria-label="Editable news"
            >
                {title()} {/* Render title */}
            </div>
          </div>

          <div class="source-edit-news">
            <label for="url" class="hidden-label">URL</label>
            <input type="url" id="url" placeholder="berita.co.id" class="edit-url" />
          </div>

          <img src={line} alt="Line Separator" class="line-edit" />

          <div class="description-edit-news">
            <textarea
              onInput={handleDescriptionChange}
              value={description()} // Atur nilai default dari signal
              maxLength={MAX_CHARS}
              class="editable-heading"
              rows="6"
            />
            <div class="char-counter">{charCount()}/{MAX_CHARS}</div>
          </div>

        </div>
      </main>
      <div class='btn-action-edit'>
        <button class="cancel-btn-news-edit" onclick={handleBack}>Batal</button>
        <button class="save-btn-news-edit">Simpan</button>
      </div>
    </div>
  );
};

export default EditNews;
