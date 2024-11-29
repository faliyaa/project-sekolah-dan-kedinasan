import { onCleanup, createEffect } from 'solid-js';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from './chartgender.module.css';

const AgeChart = () => {
    let chartDiv;

    createEffect(() => {
        let root = am5.Root.new(chartDiv);

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                startAngle: 160, endAngle: 380
            })
        );

        let series0 = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "population",
                categoryField: "ageGroup",
                startAngle: 160,
                endAngle: 380,
                radius: am5.percent(70),
                innerRadius: am5.percent(65)
            })
        );

        let series1 = chart.series.push(
            am5percent.PieSeries.new(root, {
                startAngle: 160,
                endAngle: 380,
                valueField: "percentage",
                innerRadius: am5.percent(80),
                categoryField: "ageGroup"
            })
        );

        // Hide labels and ticks for both series
        series0.labels.template.set("forceHidden", true);
        series0.ticks.template.set("forceHidden", true);
        series1.labels.template.set("forceHidden", true);
        series1.ticks.template.set("forceHidden", true);

        // Updated data for age groups
        let data = [
            { ageGroup: "0-14", population: 1500, percentage: 25 },
            { ageGroup: "15-24", population: 1200, percentage: 20 },
            { ageGroup: "25-54", population: 2500, percentage: 40 },
            { ageGroup: "55-64", population: 800, percentage: 10 },
            { ageGroup: "65+", population: 500, percentage: 5 },
        ];

        series0.data.setAll(data);
        series1.data.setAll(data);

        // Clean up on unmount
        return () => {
            root.dispose();
        };
    });

    return <div class={styles.chartContainer} ref={chartDiv} />;
};

export default AgeChart;