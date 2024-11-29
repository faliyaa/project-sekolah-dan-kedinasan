import { Component, createSignal } from 'solid-js';
import file from '../../Assets/file.svg';
import back from '../../Assets/back.svg';
import line from '../../Assets/linepart3.svg';
import link from '../../Assets/link.svg';
import Sidebar from '../../Sidebar/sidebaradmin';
import Navbar from '../../Navbar/navbaradmin';
import './adddigitalservice.css';
import { useNavigate } from '@solidjs/router';

const AddDigitalService: Component = () => {
  const [charCount, setCharCount] = createSignal(0);
  const MAX_CHARS = 9999;

  const handleDescriptionChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setCharCount(target.value.length);
  }
  let inputRef;
  const navigate = useNavigate ();

  const handleBack = () => {
    navigate('/ManajemenBeritaPengumuman-admin');
  }


  return (
    <div class="add-service-container">
        <Sidebar/>
        <Navbar/>
        <div class="back-button-service">
          <img src={back} alt="" onclick={handleBack}/>
          <h1>Tambah Layanan Digital</h1>
        </div>
      <main>
        <div class="service-form">
          <div class="title-input-service">
            <img src={file} alt="" />
            <input type="text" placeholder="Tulis Judul" />
          </div>
          <img src={line} alt="Line Separator" class="line-ds" />
          <div class="description-input">
            <textarea 
              placeholder="Deskripsi" 
              onInput={handleDescriptionChange}
              maxLength={MAX_CHARS}
            ></textarea>
            <div class="char-counter">{charCount()}/{MAX_CHARS}</div>
          </div>
          <div class="link-input">
            <img src={link} alt="link-icon" onClick={() => inputRef.focus()} />
            <input ref={inputRef} type="url" placeholder="Tambah Link" />
            </div>

        </div>
      </main>
      <div class='btn-action'>
        <button class="cancel-btn" onclick={handleBack}>Batal</button>
        <button class="save-btn">Simpan</button>
      </div>
    </div>
  );
};

export default AddDigitalService;