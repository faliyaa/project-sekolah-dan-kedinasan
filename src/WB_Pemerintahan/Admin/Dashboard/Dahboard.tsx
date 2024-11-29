// Dashboard.tsx
import styles from './Dashboard.module.css';
import Sidebar from '../Sidebar/sidebaradmin';
import Navbar from '../Navbar/navbaradmin';
import GenderChart from './chartkecil/chartgender'; // Adjust the path if necessary
import ReligionChart from './chartkecil/chartreligius';
import ChartUmur from './chartkecil/chartumur';
import ChartPekerjan from './chartbesar/datapekerjaan';
import ChartPendidkan from './chartbesar/datapendidikan'

import kuburan from "../Assets/kuburan.png";
import pediatricts from "../Assets/pediatrics.png";
import people from "../Assets/people.png";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div class={styles.dashboard}>
                <h1 class={styles.title}>Dashboard</h1>
                <div class={styles.gridchart1}>
                <div class={styles.widget}>
        <img src={kuburan} alt="Jumlah Kematian Icon" class={styles.icon} />
        <div class={styles.widgetNumber} style={{ color: '#e74c3c' }}>123</div> {/* Example value */}
        <div class={styles.widgetText}>Jumlah Kematian</div>
    </div>
    <div class={styles.widget}>
        <img src={pediatricts} alt="Jumlah Kelahiran Icon" class={styles.icon} />
        <div class={styles.widgetNumber} style={{ color: '#2ecc71' }}>456</div> {/* Example value */}
        <div class={styles.widgetText}>Jumlah Kelahiran</div>
    </div>
    <div class={styles.widget}>
        <img src={people} alt="Total Penduduk Icon" class={styles.icon} />
        <div class={styles.widgetNumber} style={{ color: '#3498db' }}>789</div> {/* Example value */}
        <div class={styles.widgetText}>Total Penduduk</div>
    </div>
</div>
                <div class={styles.gridchart2}>
                    <div class={styles.gridatas}>
                 
                      <ChartPekerjan/>
                        </div>
                    <div class={styles.gridatas}>

                        <ChartPendidkan/>
                    </div>
                </div>

                <div class={styles.gridchart3}>
                    <div class={styles.gridbawah}>
                        Data Gender
                        <GenderChart />
                    </div>
                    <div class={styles.gridbawah}>
                        Data Umur
                        <ChartUmur />
                    </div>
                    <div class={styles.gridbawah}>
                       Data Agama
                        <ReligionChart />
                    </div>
                </div>

                <div class={styles.gridchart4}>
                    <div class={styles.gridbesar}>Grid besar</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;