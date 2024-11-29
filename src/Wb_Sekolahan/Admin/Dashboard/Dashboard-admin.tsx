import { createSignal, createEffect } from 'solid-js';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import './Dashboard.css';
import widgetTotalUser from '../../Admin/AssetAdmin/widgetTotalUser.svg';
import widgetTotalSiswaKelas from '../../Admin/AssetAdmin/widgetTotalSiswaKelas.svg';
import widgetTotalGuru from '../../Admin/AssetAdmin/widgetTotalGuru.svg';
import widgetTotalMapel from '../../Admin/AssetAdmin/widgetTotalGuru.svg';
import widgetTotalEkstrakulikuler from '../../Admin/AssetAdmin/widgetTotalEkstrakulikuler.svg';

const Dashboard = () => {
  const [selectedStats, setSelectedStats] = createSignal([
    { title: 'Total User', value: 0, icon: widgetTotalUser },
    { title: 'Total Siswa Kelas', value: 0, icon: widgetTotalSiswaKelas },
    { title: 'Total Guru', value: 0, icon: widgetTotalGuru },
    { title: 'Total Mata Pelajaran', value: 40689, icon: widgetTotalMapel },
    { title: 'Total Ekstrakurikuler', value: 40689, icon: widgetTotalEkstrakulikuler },
  ]);

  // Fungsi untuk fetch data siswa dan guru dari API
  const fetchData = async () => {
    try {
      // Fetch data siswa
      const siswaResponse = await fetch('http://127.0.0.1:8080/lihat-siswa');
      const siswaData = await siswaResponse.json();

      // Fetch data guru
      const guruResponse = await fetch('http://127.0.0.1:8080/lihat-guru');
      const guruData = await guruResponse.json();

      // Set data ke widget
      setSelectedStats([
        { title: 'Total User', value: siswaData.length + guruData.length, icon: widgetTotalUser },
        { title: 'Total Siswa Kelas', value: siswaData.length, icon: widgetTotalSiswaKelas },
        { title: 'Total Guru', value: guruData.length, icon: widgetTotalGuru },
        { title: 'Total Mata Pelajaran', value: 40689, icon: widgetTotalMapel },
        { title: 'Total Ekstrakurikuler', value: 40689, icon: widgetTotalEkstrakulikuler },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Jalankan fetchData ketika komponen dimount
  createEffect(() => {
    fetchData();
  });

  createEffect(() => {
    // Line Chart
    let root = am5.Root.new("lineChartDiv");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.data.setAll([
      { date: new Date(2022, 0, 1).getTime(), value: 20 },
      { date: new Date(2022, 1, 1).getTime(), value: 35 },
      { date: new Date(2022, 2, 1).getTime(), value: 64366 },
    ]);

    // Pie Chart
    let pieRoot = am5.Root.new("pieChartDiv");
    pieRoot.setThemes([am5themes_Animated.new(pieRoot)]);

    let pieChart = pieRoot.container.children.push(
      am5percent.PieChart.new(pieRoot, {
        layout: pieRoot.verticalLayout,
      })
    );

    let pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(pieRoot, {
        valueField: "value",
        categoryField: "category",
      })
    );

    pieSeries.data.setAll([
      { category: "Shopping", value: 50 },
      { category: "Food", value: 10 },
      { category: "Entertainment", value: 20 },
      { category: "Hobby", value: 20 },
    ]);

    return () => {
      root.dispose();
      pieRoot.dispose();
    };
  });

  
  return (
    <div class="dashboard">
      <h2 class="dashboard-title">Dashboard</h2>
      <div class="stats-grid">
        {selectedStats().map(({ title, value, icon }) => (
          <div class="stat-card">
            <img src={icon} alt={title} class="stat-icon" />
            <div class="stat-info">
              <h3>{title}</h3>
              <p>{value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div class="charts-container">
        <div class="chart-card">
          <h3>Penggunaan LMS</h3>
          <div id="lineChartDiv" style="width: 100%; height: 300px;"></div>
        </div>
        <div class="chart-card">
          <h3>Data Ekstrakurikuler</h3>
          <div id="pieChartDiv" style="width: 100%; height: 300px;"></div>
        </div>
      </div>

      <div class="table-card">
        <h3>Siswa Online</h3>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>NIS</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="avatar">P</div>
                Priyono
              </td>
              <td>XII - PPLG 2</td>
              <td>541221074</td>
              <td>541221074@student.smktelkom-pwt.sch.id</td>
              <td><span class="status-online">Online</span></td>
            </tr>
            <tr>
              <td>
                <div class="avatar">M</div>
                Henoch
              </td>
              <td>XII - PPLG 2</td>
              <td>541221074</td>
              <td>541221074@student.smktelkom-pwt.sch.id</td>
              <td><span class="status-online">Online</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
