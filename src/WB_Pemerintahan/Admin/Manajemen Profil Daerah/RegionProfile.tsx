import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import styles from './RegionProfile.module.css';
import Navbar from '../Navbar/navbaradmin';
import Sidebar from '../Sidebar/sidebaradmin';
import axios from 'axios';

declare global {
    interface Window {
        H: any;
    }
}

const ProfileDaerah = () => {
    let mapRef: HTMLDivElement | undefined;
    const [map, setMap] = createSignal<any | null>(null);
    const navigate = useNavigate();

    // State untuk modal dan form input
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [title, setTitle] = createSignal("Profil Kota Bandung");
    const [description, setDescription] = createSignal("");

    const apiKey = 'FRzYDXHeOKdnnyfX9nnSx7PJEbP5fvaU1PxUN8tRKTU';
    const bandungCoordinates = { lat: -6.9175, lng: 107.6191 };
    const kecamatanList = [
        { name: 'Cicendo', coordinates: { lat: -6.9175, lng: 107.5922 } },
        { name: 'Cibeunying Kaler', coordinates: { lat: -6.8961, lng: 107.6332 } },
        { name: 'Coblong', coordinates: { lat: -6.8932, lng: 107.6139 } },
        { name: 'Sukajadi', coordinates: { lat: -6.8917, lng: 107.5967 } },
        { name: 'Cidadap', coordinates: { lat: -6.8667, lng: 107.6000 } },
        { name: 'Bandung Wetan', coordinates: { lat: -6.9056, lng: 107.6156 } },
        { name: 'Astana Anyar', coordinates: { lat: -6.9375, lng: 107.6000 } },
        { name: 'Regol', coordinates: { lat: -6.9375, lng: 107.6167 } },
        { name: 'Batununggal', coordinates: { lat: -6.9333, lng: 107.6333 } },
        { name: 'Lengkong', coordinates: { lat: -6.9333, lng: 107.6167 } }
    ];

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

            kecamatanList.forEach(kecamatan => {
                const marker = new window.H.map.Marker(kecamatan.coordinates);
                newMap.addObject(marker);

                marker.addEventListener('tap', (evt: any) => {
                    const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
                        content: `
              <div class="${styles.popup}">
                <h3>${kecamatan.name}</h3>
                <button class="${styles.closeButton}">Tutup</button>
              </div>
            `
                    });
                    ui.addBubble(bubble);

                    const closeButton = bubble.getElement().querySelector(`.${styles.closeButton}`);
                    closeButton.addEventListener('click', () => {
                        ui.removeBubble(bubble);
                    });
                });
            });

            setMap(newMap);

            window.addEventListener('resize', () => newMap.getViewPort().resize());
        }
    };

    // Fetch initial data from BE
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/bandung-profile');
            const { title, description } = response.data;
            setTitle(title);
            setDescription(description);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    // Update data in BE
    const updateProfileData = async () => {
        try {
            await axios.post('http://localhost:8080/bandung-profile', {
                title: title(),
                description: description()
            });
            setIsModalOpen(false); // Close modal on success
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile data:", error);
            alert("Failed to update profile.");
        }
    };

    onMount(() => {
        // Load map scripts
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
                        fetchProfileData(); // Fetch profile data on mount
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
                        <button
                            class={styles.visiMisiButton}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Edit Judul & Deskripsi
                        </button>
                    </div>
                    <div class={styles.descriptionSection}>
                        <h1 class={styles.title}>{title()}</h1>
                        <div class={styles.description}>
                            <p>{description()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />

            {isModalOpen() && (
                <div class={styles.modalOverlay}>
                    <div class={styles.modal}>
                        <h2>Edit Profil Kota Bandung</h2>
                        <label>
                            Judul:
                            <input
                                type="text"
                                value={title()}
                                onInput={(e) => setTitle(e.currentTarget.value)}
                            />
                        </label>
                        <label>
                            Deskripsi:
                            <textarea
                                value={description()}
                                onInput={(e) => setDescription(e.currentTarget.value)}
                            />
                        </label>
                        <button onClick={updateProfileData}>Simpan</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDaerah;
