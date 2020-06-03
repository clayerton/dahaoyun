import React from 'react';
import styles from './box.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('echarts-box1'));
    this.chart.setOption(option);
  }

  shouldComponentUpdate(nextProps) {
    const { data } = nextProps;
    var errors = (data && data.errors) || null,
      offlines = (data && data.offlines) || null,
      runs = (data && data.runs) || null,
      stops = (data && data.stops) || null;

    if (this.chart) {
      this.chart.setOption({
        series: [
          {
            ...seriesCummom,
            data: [
              { value: runs, name: formatMessage({id: 'device.run'}) },
              { value: errors, name: formatMessage({id: 'device.error'}) },
              { value: offlines, name: formatMessage({id: 'device.offline'}) },
              { value: stops, name: formatMessage({id: 'device.stop'}) },
            ],
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
          <span className={styles.titleLgColor}>{formatMessage({id: 'device.title.lg'})}</span>
        </div>
        <div className={styles.chart} style={{ paddingRight: '20px' }} id="echarts-box1" />
      </div>
    );
  }
}

const textStyle = { color: '#00f7a1', fontSize: '17' };
const colors = ['rgb(104,171,251)', 'rgb(208,10,24)', 'rgb(176,29,255)', 'rgb(232,193,15)'];
const seriesCummom = {
  name: formatMessage({id: 'device.title.lg'}),
  type: 'pie',
  label: { normal: { formatter: '{c}', fontSize: '20' } },
  radius: ['55%', '80%'],
};

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  color: colors,
  label: {
    normal: {
      show: false,
      position: 'center',
    },
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    top: 'center',
    data: [
      { name: formatMessage({id: 'device.run'}), textStyle },
      { name: formatMessage({id: 'device.error'}), textStyle },
      { name: formatMessage({id: 'device.offline'}), textStyle },
      { name: formatMessage({id: 'device.stop'}), textStyle },
    ],
  },
  series: [
    {
      ...seriesCummom,
      data: [
        { value: 20, name: formatMessage({id: 'device.run'}) },
        { value: 20, name: formatMessage({id: 'device.error'}) },
        { value: 20, name: formatMessage({id: 'device.offline'}) },
        { value: 20, name: formatMessage({id: 'device.stop'}) },
      ],
    },
  ],
};
