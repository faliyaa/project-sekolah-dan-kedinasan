import { Component, createSignal } from 'solid-js';
import file from '../../Assets/file.svg';
import back from '../../Assets/back.svg';
import line from '../../Assets/linepart3.svg';
import link from '../../Assets/link.svg';
import Sidebar from '../../Sidebar/sidebaradmin';
import Navbar from '../../Navbar/navbaradmin';
import './addnews.css';
import { useNavigate } from '@solidjs/router';


const AddNews: Component = () => {
  const [charCount, setCharCount] = createSignal(0);
  const MAX_CHARS = 9999;


  const handleDescriptionChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setCharCount(target.value.length);
  }
  const navigate = useNavigate ();

  const handleBack = () => {
    navigate('/ManajemenBeritaPengumuman-admin');
  }  

  return (
    <div class="add-news-container">
        <Sidebar/>
        <Navbar/>
        <div class="back-button-news">
          <img src={back} alt="" onclick={handleBack} />
          <h1>Tambah Berita</h1>
        </div>
      <main>
        <div class="news-form">
          <div class="title-input-news">
            <img src={file} alt="" />
            <input type="text" placeholder="Tulis Judul" />
          </div>
          <div class="source-input-news">
            <label for="url" class="hidden-label">URL</label>
            <input type="url" id="url" placeholder="Sumber Berita.." class="input-url"/>
          </div>

          <img src={line} alt="Line Separator" class="line-ns" />
          <div class="description-input-news">
            <textarea 
              placeholder="Deskripsi" 
              onInput={handleDescriptionChange}
              maxLength={MAX_CHARS}
            ></textarea>
            <div class="char-counter">{charCount()}/{MAX_CHARS}</div>
          </div>

        </div>
      </main>
      <div class='btn-action-news'>
        <button class="cancel-btn-news" onclick={handleBack}>Batal</button>
        <button class="save-btn-news">Simpan</button>
      </div>
    </div>
  );
};

export default AddNews;