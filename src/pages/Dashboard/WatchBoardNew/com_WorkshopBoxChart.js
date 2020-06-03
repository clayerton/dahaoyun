import React from 'react';
import styles from './box.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

export default class Component extends React.PureComponent {

  constructor(props) {
    super(props);
    this.chart = null;
    this.chartBox = null;
  }

  _parseColorPresent = (now, index) => {
    return [(now / MAX).toFixed(1), colors[index % 3]]
  }

  componentDidMount() {
    this.chart = echarts.init(this.chartBox);
    this.chart.setOption({
      series: [
        {
          ...seriesCummon,
          axisLine: {
            lineStyle: {
              color: [this._parseColorPresent(this.props.data.total, this.props.index), [1, 'rgba(255,255,255,0.1)']],
              ...lineStyleCummon,
            }
          },
          data: [{ value: this.props.data.total, name: '针' }]
        },
      ]
    });

  }

  render() {

    const { data, index } = this.props;
    return <div ref={ref => this.chartBox = ref} className={styles.worshopContentItemChart} />
  }
}

const colors = ['#ff8800', '#34ed95', '#fddd29'];
const MAX = 1000000;
const seriesCummon = {
  name: '针数',
  type: 'gauge',
  min: 0,
  max: MAX,
  axisLabel: {            // 坐标轴小标记
    textStyle: {       // 属性lineStyle控制线条样式
      fontWeight: 'bolder',
      color: '#fff',
      shadowColor: '#fff', //默认透明
      shadowBlur: 10
    }
  },
  axisTick: { show: false },
  splitLine: { show: false },
  axisLabel: { show: false },
  pointer: {           // 分隔线
    shadowColor: '#fff', //默认透明
    shadowBlur: 5,
    length: '30%',
    width: 5,
    backgroundColor: 'auto',
  },
  title: {
    show: false
  },
  detail: {
    borderRadius: 50,
    backgroundColor: 'auto',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#fff', //默认透明
    shadowBlur: 5,
    offsetCenter: [0, '50%'],       // x, y，单位px
    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      fontWeight: 'bolder',
      color: '#fff',
      fontSize: '16',
    },
    formatter: function (value) { return `${(value / 1000000 * 100).toFixed(0)}%` },
  },
}
const lineStyleCummon = {
  width: 20,
  shadowColor: '#fff', //默认透明
  shadowBlur: 10
}

const option = {
  tooltip: {
    formatter: "{a} <br/>{c} {b}"
  },
  series: [
    {
      ...seriesCummon,
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          color: [[0.5, colors[0]], [1, 'rgba(255,255,255,0.1)']],
          ...lineStyleCummon,
        }
      },
      data: [{ value: 500000, name: '针' }]
    },
  ]
};