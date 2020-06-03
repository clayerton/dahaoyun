import React from 'react';
import styles from './box.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
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

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('echarts-box6'));
    this.chart.setOption(option);
  }

  shouldComponentUpdate(nextProps) {
    const { data } = nextProps;
    const formatData = [];
    data &&
      data.map((obj, index) => {
        formatData.push({ value: obj.total ? obj.total : null, name: obj.name, textStyle });
      });

    if (this.chart) {
      this.chart.setOption({
        series: [
          {
            ...seriesCummon,
            data: formatData,
          },
        ],
        legend: {
          ...legendCummon,
          data: formatData,
        },
      });
    }
    return true;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleLgColor}>今日产量统计</span>
        </div>
        <div id="echarts-box6" className={styles.chart} style={{ paddingRight: '20px' }} />
      </div>
    );
  }
}

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
const textStyle = { color: '#15b5f5', fontSize: '16' };
const seriesCummon = {
  name: '今日产量统计',
  type: 'pie',
  radius: '90%',
  label: {
    normal: {
      position: 'inner',
      formatter: '{c}',
      color: '#fff',
      fontSize: '18',
    },
  },
  labelLine: {
    normal: {
      show: false,
    },
  },
  labelLine: {
    normal: {
      show: false,
    },
  },
  itemStyle: {
    emphasis: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};
const legendCummon = {
  orient: 'vertical',
  left: 'right',
  top: 'center',
};

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  color: colors,
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
  series: [
    {
      ...seriesCummon,
      data: [
        { value: 20, name: '一车间' },
        { value: 20, name: '二车间' },
        { value: 20, name: '三车间' },
        { value: 20, name: '四车间' },
        { value: 20, name: '五车间' },
        { value: 20, name: '六车间' },
      ],
    },
  ],
};
