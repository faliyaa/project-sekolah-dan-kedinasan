import { onCleanup, createEffect } from 'solid-js';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from './chartgender.module.css';

const ReligionChart = () => {
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
                valueField: "followers",
                categoryField: "religion",
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
                categoryField: "religion"
            })
        );

        // Hide labels and ticks for both series
        series0.labels.template.set("forceHidden", true);
        series0.ticks.template.set("forceHidden", true);
        series1.labels.template.set("forceHidden", true);
        series1.ticks.template.set("forceHidden", true);

        // Updated data for religions
        let data = [
            { religion: "Christianity", followers: 2000, percentage: 40 },
            { religion: "Islam", followers: 1600, percentage: 32 },
            { religion: "Hinduism", followers: 1000, percentage: 20 },
            { religion: "Buddhism", followers: 400, percentage: 8 },
            { religion: "Other", followers: 200, percentage: 4 },
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

export default ReligionChart;