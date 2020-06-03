import React from 'react';
import styles from './box.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('echarts-yieldBox'));
    this.chart.setOption(option);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps;
      const formatData = [];
      const formatLegend = [];
      let formatX = [];
      let xArray = [];

      data &&
        data.map((obj, index) => {
          const yieldArray = [];
          obj.yields &&
            obj.yields.map((obj2, index2) => {
              yieldArray.push(obj2.valid);
              xArray.push(obj2.time ? moment(obj2.time).format('HH:mm') : null);
            });
          formatX = xArray;
          formatData.push({ name: obj.name, stack: obj.name, data: yieldArray, type });
          formatLegend.push({ name: obj.name, textStyle });
        });

      let newFormatX = Array.from(new Set(formatX))
      if (this.chart) {
        this.chart.setOption({
          series: formatData,
          legend: {
            ...legendCummon,
            data: formatLegend,
          },
          xAxis: {
            ...xAxisCummon,
            // data: formatX,
            data: newFormatX,
          },
        });
      }
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className={styles.box}>
        <div className={styles.title}>
          {formatMessage({id: 'current.production.dustribution'})}
        </div>
        <div id="echarts-yieldBox" className={styles.chart} />
      </div>
    )
  }
}

const textStyle = { color: '#08c1f4', fontSize: '15' };
const lineStyle = { color: '#040e5e' };
const colors = [
  '#fcff00',
  '#003dff',
  '#f20219',
  '#00f7a1',
  '#f19815',
  '#ae00ff',
  '#FF359A',
  '#949449',
];
const legendCummon = {
  orient: 'vertical',
  right: '5%',
  top: 'center',
};
const type = 'line';
const xAxisCummon = {
  type: 'category',
  axisLine: { lineStyle },
  axisLabel: { color: '#fff', fontSize: '14' },
  name: formatMessage({id: 'time'}),
  nameTextStyle: {
    color: '#fff',
  },
};

const option = {
  legend: {
    ...legendCummon,
    data: [
      { name: '一车间', textStyle },
      { name: '二车间', textStyle },
      { name: '三车间', textStyle },
      { name: '四车间', textStyle },
      { name: '五车间', textStyle },
      { name: '六车间', textStyle },
    ],
  },
  color: colors,
  grid: {
    top: '10%',
    left: '5%',
    right: '20%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      ...xAxisCummon,
      data: [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ],
    },
  ],
  yAxis: {
    type: 'value',
    name: formatMessage({id: 'number'}),
    nameTextStyle: {
      color: '#fff'
    },
    axisLine: { lineStyle },
    axisLabel: { color: '#fff', fontSize: '13' },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: '一车间',
      type,
      stack: '总量1',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: '二车间',
      type,
      stack: '总量2',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: '三车间',
      type,
      stack: '总量3',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: '四车间',
      type,
      stack: '总量4',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: '五车间',
      type,
      stack: '总量5',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: '六车间',
      type,
      stack: '总量6',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};