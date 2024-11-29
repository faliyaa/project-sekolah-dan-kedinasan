import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./Navbar.css"; // Import file CSS terpisah
import Tahun_Ajaran_Icon from '../img/Tahun_Ajaran_Icon.svg';
import Kalender_Icon from '../img/Kalender_Icon.svg';
import Notif_Icon from '../img/Notification_Icon.svg';
import Search_Icon from '../img/Search_Icon.svg';
import Arrow_Icon from '../img/Arrow_Icon.svg';
import Arrow_Dropdown_Icon from '../img/Arrow_Dropdown_icon.svg';

const Navbar = () => {
    // Simpan inisial dan warna lingkaran
    const navigate = useNavigate(); 
    const [userInitial] = createSignal("A");
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);
    const [selectedYear, setSelectedYear] = createSignal("2024/2025 - 2");
    const [isMenuOpen, setMenuOpen] = createSignal(false);
    const [isSearchActive, setSearchActive] = createSignal(false);
    const [searchQuery, setSearchQuery] = createSignal("");

    const colors = ["#4A90E2", "#7B68EE", "#FF7F50", "#20B2AA", "#FF6347"];
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen());
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen());
    };

    const selectYear = (year) => {
        setSelectedYear(year);
        setDropdownOpen(false);
    };

    const toggleSearch = () => {
        setSearchActive(!isSearchActive());
        if (isSearchActive()) {
            setSearchQuery(""); // Reset query saat berpindah ke tombol
        }
    };

    return (
        <nav class="navbar-container">
            <div class="navbar-left">
                <div class="navbar-calendar-container">
                    <div class="navbar-calendar" onClick={toggleDropdown}>
                        <img src={Tahun_Ajaran_Icon} />
                        {selectedYear()}
                        <img src={Arrow_Icon} class="navbar-arrow-icon" />
                    </div>
                    {isDropdownOpen() && (
                        <div class="navbar-dropdown">
                            <div class="navbar-dropdown-item" onClick={() => selectYear("2024/2025 - 1")}>
                                2024/2025 - 1
                            </div>
                            <div class="navbar-dropdown-item" onClick={() => selectYear("2023/2024 - 2")}>
                                2024/2025 - 2
                            </div>
                        </div>
                    )}
                </div>
                <button class="navbar-button" onClick={() => navigate('/kalender')}>
                    <img src={Kalender_Icon} />
                    Kalender
                    </button>
                <button class="navbar-icon-button">
                    <img src={Notif_Icon} />
                </button>
                {!isSearchActive() ? (
                    <button class="navbar-icon-button" onClick={toggleSearch}>
                        <img src={Search_Icon} />
                    </button>
                ) : (
                    <div class="navbar-search-container">
                        <img src={Search_Icon} class="navbar-search-icon" />
                        <input
                            type="text"
                            class="navbar-search-input"
                            value={searchQuery()}
                            onInput={(e) => setSearchQuery(e.target.value)}
                            onBlur={toggleSearch} // Menutup search bar ketika kehilangan fokus
                            placeholder="Search..."
                        />
                    </div>
                )}
            </div>
            <div class="navbar-right">
                <div class="navbar-user-circle" style={{ "background-color": randomColor() }}>
                    {userInitial()}
                </div>
                <div class="navbar-user-info">
                    <span class="navbar-username">Arabella Caroline</span>
                    <span class="navbar-email">arabellacaroline16@gmail.com</span>
                </div>
                <div class="navbar-major-label">
                    <p>IPA</p>
                </div>
                <div class="navbar-menu-container">
                    <button onClick={toggleMenu} class="navbar-dropdown-toggle">
                        <img src={Arrow_Dropdown_Icon} />
                    </button>
                    {isMenuOpen() && (
                        <div class="navbar-dropdown">
                            <div class="navbar-dropdown-item">Profil</div>
                            <div class="navbar-dropdown-item">Pengaturan</div>
                            <div class="navbar-dropdown-item">Keluar</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
