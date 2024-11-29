import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import styles from './ProfileDaerah.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

declare global {
  interface Window {
    H: any;
  }
}

const ProfileDaerah = () => {
  let mapRef: HTMLDivElement | undefined;
  const [map, setMap] = createSignal<any | null>(null);
  const [profile, setProfile] = createSignal<{ title: string; description: string } | null>(null);
  const navigate = useNavigate();

  const apiKey = 'FRzYDXHeOKdnnyfX9nnSx7PJEbP5fvaU1PxUN8tRKTU';
  const bandungCoordinates = { lat: -6.9175, lng: 107.6191 };
  
  // Fungsi untuk mendapatkan profil
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/bandung-profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Error fetching profile:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const initMap = () => {
    if (mapRef && !map()) {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const defaultLayers = platform.createDefaultLayers();

      const newMap = new window.H.Map(
        mapRef,
        defaultLayers.vector.normal.map,
        {
          center: bandungCoordinates,
          zoom: 12,
          pixelRatio: window.devicePixelRatio || 1
        }
      );

      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(newMap));
      const ui = window.H.ui.UI.createDefault(newMap, defaultLayers);

      // Code for adding markers goes here...

      setMap(newMap);

      window.addEventListener('resize', () => newMap.getViewPort().resize());
    }
  };

  onMount(() => {
    fetchProfile(); // Fetch profile data on component mount

    const script = document.createElement('script');
    script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const scripts = [
        'https://js.api.here.com/v3/3.1/mapsjs-service.js',
        'https://js.api.here.com/v3/3.1/mapsjs-ui.js',
        'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
      ];

      let loaded = 0;
      scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          loaded++;
          if (loaded === scripts.length) {
            initMap();
          }
        };
      });
    };
  });

  return (
    <div class={styles.pageContainer}>
      <Navbar />
      <div class={styles.container}>
        <div class={styles.content}>
          <div class={styles.mapSection}>
            <div class={styles.mapContainer} ref={mapRef}></div>
            <h2 class={styles.mapTitle}>BANDUNG CITY</h2>
          </div>
          <div class={styles.descriptionSection}>
            <h1 class={styles.title}>Profil Kota Bandung</h1>
            <div class={styles.description}>
              {profile() ? (
                <>
                  <h2>{profile()?.title}</h2>
                  <p>{profile()?.description}</p>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileDaerah;
