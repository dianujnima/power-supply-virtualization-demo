import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function Graph({ datasets, dates, onChartReadyCallback }) {
    const renderItem = (params, api) => {
        let dateIndex = api.value(0);
        let start = api.coord([api.value(1), dateIndex]);
        let end = api.coord([api.value(2), dateIndex]);
        let height = api.size([0, 1])[1] * 0.6;
        let rectangle = echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        });
        return (
            rectangle && {
                type: 'rect',
                transition: ['shape'],
                shape: rectangle,
                style: api.style()
            }
        );
    }
    const getOption = {
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3];
            }
        },
        title: {
            text: 'Power Supply Virtualization',
            left: 'center'
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: ''
        },
        {
            type: 'inside',
            filterMode: 'weakFilter'
        }
        ],
        grid: {
            height: 300
        },
        xAxis: {
            type: 'time',
            name: 'Time',
            scale: true,
            minInterval: 1,
            maxInterval: 3600 * 1000 * 24,
        },
        yAxis: {
            data: dates
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1],
                y: 0
            },
            data: datasets
        }]
    }

    return (
        <section className='chart'>
            <ReactECharts
                option={getOption}
                notMerge={true}
                lazyUpdate={true}
                style={{ "minHeight": "500px" }}
                theme={"dark"}
                onChartReady={onChartReadyCallback}
            />
        </section>
    )
}