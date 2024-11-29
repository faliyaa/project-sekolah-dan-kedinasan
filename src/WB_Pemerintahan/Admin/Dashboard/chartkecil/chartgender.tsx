import { onCleanup, createEffect } from 'solid-js';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from './chartgender.module.css';

const GenderChart = () => {
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
                valueField: "litres",
                categoryField: "country",
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
                valueField: "bottles",
                innerRadius: am5.percent(80),
                categoryField: "country"
            })
        );

        series0.labels.template.set("forceHidden", true);
        series0.ticks.template.set("forceHidden", true);
        series1.labels.template.set("forceHidden", true);
        series1.ticks.template.set("forceHidden", true);

        let data = [
            { country: "Male", litres: 501.9, bottles: 1500 },
            { country: "Female", litres: 301.9, bottles: 990 },
        ];

        series0.data.setAll(data);
        series1.data.setAll(data);

        return () => {
            root.dispose();
        };
    });

    return <div class={styles.chartContainer} ref={chartDiv} />;
};

export default GenderChart;