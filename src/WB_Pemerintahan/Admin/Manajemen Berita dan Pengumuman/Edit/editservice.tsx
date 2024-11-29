import { Component, createSignal, createEffect } from 'solid-js';
import back from '../../Assets/back.svg';
import img from '../../Assets/bsc.png'; // Gambar default
import edit from '../../Assets/edit.svg'; // Ikon edit
import link from '../../Assets/link.svg';
import line from '../../Assets/linepart3.svg';
import Sidebar from '../../Sidebar/sidebaradmin';
import Navbar from '../../Navbar/navbaradmin';
import './editservice.css';
import { useNavigate } from '@solidjs/router';

const EditService: Component = () => {
  const [description, setDescription] = createSignal(
    'Bandung Smart City adalah konsep pengelolaan Kota Bandung menggunakan teknologi informasi untuk memaksimalkan pelayanan kepada warganya.'
  );
  const [charCount, setCharCount] = createSignal(description().length);
  const [imageSrc, setImageSrc] = createSignal(img); // Menggunakan signal untuk gambar
  const MAX_CHARS = 9999;
  const [url, setUrl] = createSignal("bandungsmart.co.id");
  const [isInputFocused, setIsInputFocused] = createSignal(false); // State for input focus
  const [title, setTitle] = createSignal("Bandung Smart City"); // Signal for title
  let inputRef: HTMLInputElement | undefined; // Reference variable for input

  const handleEditClick = () => {
    if (inputRef) {
      inputRef.focus(); // Fokus ke input
      setUrl(''); // Kosongkan input
    }
  };

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
    <div class="edit-service-container">
      <Sidebar />
      <Navbar />
      <div class="back-button-edit-service">
        <img src={back} alt="" onClick={handleBack} />
        <h1 onClick={handleBack}>Edit Layanan Digital</h1>
      </div>
      <main>
        <div class="edit-service-form">
          <div class="title-edit-service">
            <img src={imageSrc()} alt="Berita" />
            <label for="image-upload">
                <img src={edit} alt="Edit" class="edit-img2" />
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
                class="editable-title"
                onInput={(e) => setTitle(e.currentTarget.textContent || '')} // Update title on input
                onFocus={() => setIsInputFocused(true)} // Set focus state to true
                onBlur={() => setIsInputFocused(false)} // Set focus state to false
                role="textbox"
                aria-label="Editable title"
            >
                {title()} {/* Render title */}
            </div>
          </div>

          <img src={line} alt="Line Separator" class="line-edit-service" />

          <div class="description-edit-service">
            <textarea
              onInput={handleDescriptionChange}
              value={description()} // Atur nilai default dari signal
              maxLength={MAX_CHARS}
              class="editable-heading"
              rows="6"
            />
            <div class="char-counter">{charCount()}/{MAX_CHARS}</div>
          </div>
          <div class="source-edit-service">
            <img src={link} alt="" />
            <label for="url" class="hidden-label">URL</label>
            <input
              type="url"
              id="url"
              placeholder={isInputFocused() ? '' : url()} // Use focus state to manage placeholder
              class="edit-url-service"
              ref={el => inputRef = el} // Set reference to the input element
              value={url()} // Bind nilai input ke signal
              onInput={(e) => setUrl(e.target.value)} // Update signal saat input berubah
              onFocus={() => setIsInputFocused(true)} // Set focus state to true
              onBlur={() => setIsInputFocused(false)} // Set focus state to false
            />
            <img src={edit} class="edit-url2" onClick={handleEditClick} alt="Edit" /> {/* Tambahkan onClick */}
          </div>
        </div>
      </main>
      <div class='btn-action-edit-service'>
        <button class="cancel-btn-service-edit" onClick={handleBack}>Batal</button>
        <button class="save-btn-service-edit">Simpan</button>
      </div>
    </div>
  );
};

export default EditService;
