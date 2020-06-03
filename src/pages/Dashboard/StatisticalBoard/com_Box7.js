import React from 'react';
import styles from './box.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  _timeRatio = (int, total) => {
    var ratio100 = 0;
    ratio100 = Math.round((int / total) * 100, 0);
    return ratio100;
  };

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('echarts-box7'));
    this.chart.setOption(option);
  }

  shouldComponentUpdate(nextProps) {
    const { data } = nextProps;
    const formatRun = [];
    const formatStop = [];
    const formatOffline = [];
    const formatError = [];
    const formatY = [];

    data &&
      data.map((obj, index) => {
        const dataArray = [];
        const total = obj.run + obj.stop + obj.offline + obj.error;
        formatY.push(obj.name);
        formatRun.push(this._timeRatio(obj.run, total));
        formatStop.push(this._timeRatio(obj.stop, total));
        formatOffline.push(this._timeRatio(obj.offline, total));
        formatError.push(this._timeRatio(obj.error, total));
      });

    if (this.chart) {
      this.chart.setOption({
        yAxis: {
          ...yAxisCummon,
          data: formatY,
        },
        series: [
          {
            name: '开车',
            ...seriesCummon,
            data: formatRun,
          },
          {
            name: '停车',
            ...seriesCummon,
            data: formatStop,
          },
          {
            name: '离线',
            ...seriesCummon,
            data: formatOffline,
          },
          {
            name: '故障',
            ...seriesCummon,
            data: formatError,
          },
        ],
      });
    }
    return true;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleLgColor}>当前时间占比</span>
        </div>
        <div id="echarts-box7" className={styles.chart} style={{ paddingTop: '10px' }} />
      </div>
    );
  }
}

const colors = ['rgb(104,171,251)', 'rgb(232,193,15)', 'rgb(176,29,255)', 'rgb(208,10,24)'];
const textStyle = { color: '#00f7a1', fontSize: '17' };
const yAxisCummon = {
  type: 'category',
  axisLine: { lineStyle: { color: '#040e5e' } },
  axisLabel: { color: '#00f7a1', fontSize: '14' },
};
const seriesCummon = {
  type: 'bar',
  stack: '百分比',
  barWidth: 19,
  label: {
    normal: {
      show: false,
    },
  },
};

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  color: colors,
  legend: {
    data: [
      { name: '开车', textStyle },
      { name: '停车', textStyle },
      { name: '离线', textStyle },
      { name: '故障', textStyle },
    ],
  },
  grid: {
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    max: 100,
    splitLine: {
      show: false,
    },
    axisLine: { lineStyle: { color: '#040e5e' } },
    axisLabel: { color: '#fff', fontSize: '14', formatter: '{value}%' },
  },
  yAxis: {
    ...yAxisCummon,
    data: ['一车间', '二车间', '三车间', '四车间', '五车间', '六车间'],
  },
  series: [
    {
      name: '开车',
      ...seriesCummon,
      data: [40, 40, 40, 40, 40, 40],
    },
    {
      name: '停车',
      ...seriesCummon,
      data: [20, 20, 20, 20, 20, 20],
    },
    {
      name: '离线',
      ...seriesCummon,
      data: [20, 20, 20, 20, 20, 20],
    },
    {
      name: '故障',
      ...seriesCummon,
      data: [20, 20, 20, 20, 20, 20],
    },
  ],
};
