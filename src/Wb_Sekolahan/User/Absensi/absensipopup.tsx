import { Component, createSignal } from 'solid-js';
import './absensipopup.css';
import calendarIcon from '../img/calendar.svg';
import dropdownIcon from '../img/arrow-right.svg';

interface AttendancePopupProps {
  onClose: () => void;
}

const AttendancePopup: Component<AttendancePopupProps> = (props) => {
  const [selectedOption, setSelectedOption] = createSignal('Hadir');
  const [selectedDate, setSelectedDate] = createSignal('19 - September 2024');
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);

  const availableDates = [
    '19 - September 2024', 
    '20 - September 2024', 
    '21 - September 2024', 
    '22 - September 2024', 
    '23 - September 2024'
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen());
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div class="attendance-popup-overlay">
      <div class="attendance-popup-content">
        <div class="attendance-popup-header">
          <h2 class="attendance-popup-title">Absensi Harian</h2>

          <div class="attendance-popup-date-selector">
            <button onClick={toggleDropdown} class="calendar-button">
              <img src={calendarIcon} alt="Calendar" class="calendar-icon" />
              <span>{selectedDate()}</span>
              <img src={dropdownIcon} alt="Dropdown" class={`dropdown-icon ${isDropdownOpen() ? 'open' : ''}`} />
            </button>
            {isDropdownOpen() && (
              <div class="calendar-options">
                {availableDates.map(date => (
                  <div class="calendar-option" onClick={() => selectDate(date)}>
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div class="attendance-popup-class">IPA - Kelas XII</div>
        </div>

        <div class="attendance-popup-student-info">
          <span>541220001</span>
          <span>Arabella Caroline</span>
          <span>XII - MIPA 1</span>
        </div>
        
        <div class="attendance-popup-options">
          {['Hadir', 'Alfa', 'Izin', 'Sakit'].map((option) => (
            <label class="attendance-popup-option">
              <input
                type="radio"
                name="attendance"
                value={option}
                checked={selectedOption() === option}
                onChange={() => setSelectedOption(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        
        <div class="attendance-popup-buttons">
          <button
            class="attendance-popup-button attendance-popup-button-cancel"
            onClick={props.onClose}
          >
            Batalkan
          </button>
          <button class="attendance-popup-button attendance-popup-button-send">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePopup;
