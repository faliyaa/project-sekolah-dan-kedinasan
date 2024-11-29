import { Component, onCleanup, onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import styles from './EmploymentChart.module.css';

const EmploymentChart: Component = () => {
  let chartDiv!: HTMLDivElement;
  let root!: am5.Root;

  onMount(() => {
    // Create root element
    root = am5.Root.new(chartDiv);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Data
    const data = [
      {
        sektor: "Pertanian",
        jumlah: 38290000
      },
      {
        sektor: "Perdagangan",
        jumlah: 25960000
      },
      {
        sektor: "Industri Pengolahan",
        jumlah: 19750000
      },
      {
        sektor: "Konstruksi",
        jumlah: 8750000
      },
      {
        sektor: "Transportasi",
        jumlah: 7470000
      },
      {
        sektor: "Jasa Pendidikan",
        jumlah: 5860000
      },
      {
        sektor: "Administrasi Pemerintahan",
        jumlah: 4940000
      }
    ];

    // Create X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "sektor",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    xAxis.data.setAll(data);
    xAxis.get("renderer").labels.template.setAll({ visible: false }); // Hide X-axis labels

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    yAxis.get("renderer").labels.template.setAll({ visible: false }); // Hide Y-axis labels

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Pekerjaan",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "jumlah",
        categoryXField: "sektor",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}" // Show sector and count in the tooltip
        })
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      fillOpacity: 0.9,
      tooltipText: "{categoryX}: {valueY}", // Tooltip text for each bar
    });

    series.data.setAll(data);

    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add title
    chart.children.unshift(
      am5.Label.new(root, {
        fontSize: 0.5,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 20
      })
    );

    // Make stuff animate
    series.appear(1000);
    chart.appear(1000, 100);
  });

  onCleanup(() => {
    root.dispose();
  });

  return (
    <div class={styles.chartContainer} ref={chartDiv}></div>
  );
};

export default EmploymentChart;