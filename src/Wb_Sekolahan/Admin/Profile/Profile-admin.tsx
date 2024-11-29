import { createSignal } from 'solid-js';
import './Profile.css';

const Profile = () => { 
  const [latestActivities] = createSignal([
    { user: 'Karen Hope', action: 'moved task "User Research" from On Progress to Done', time: '2 March 2021, 13:45 PM' },
    { user: 'Samantha William', action: 'add new 4 attached files on task "Photo\'s Assets"', time: '2 March 2021, 13:45 PM' },
    { user: 'Tony Soap', action: 'invite you in task "Wireframing" and "Hi-fidelity"', time: '2 March 2021, 13:45 PM' },
    { user: 'Samantha William', action: 'created new Task', time: '2 March 2021, 13:45 PM' },
  ]);

  return (
    <div class="profile-admin-dashboard">
      <aside class="profile-sidebar">
        <h1>Untitle</h1>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Data Siswa</li>
            <li class="profile-active">Ekstrakulikuler</li>
            <li>Data Guru</li>
            <li>Transkrip Nilai</li>
          </ul>
        </nav>
        <div class="profile-sidebar-footer">
          <p>Lainnya</p>
          <ul>
            <li>Pengaturan</li>
          </ul>
        </div>
      </aside>
      <main>
        <header class="profile-header">
          <h2>Admin Dashboard</h2>
          <div class="profile-user-info">
            <span class="profile-notification">6</span>
            <span class="profile-language">🇬🇧</span>
            <span class="profile-user-avatar">PRIYONO</span>
          </div>
        </header>
        <section class="profile-profile-card">
          <div class="profile-profile-header"></div>
          <div class="profile-profile-content">
            <div class="profile-avatar"></div>
            <h3>Priyono</h3>
            <p>Admin</p>
            <p>Jakarta, Indonesia</p>
            <div class="profile-contact-info">
              <div>
                <h4>Phone</h4>
                <p>+62 0813 2521 8497</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>kevinpriambudi6@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
        <section class="profile-latest-activity">
          <h3>Latest Activity</h3>
          <ul>
            {latestActivities().map((activity, index) => (
              <li>
                <div class="profile-activity-icon"></div>
                <div class="profile-activity-content">
                  <p><strong>{activity.user}</strong> {activity.action}</p>
                  <p class="profile-time">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Profile;
