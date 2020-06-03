import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import { connect } from 'dva';


// @connect(
//   ({ device: { deviceStatus }, }) => ({
//     deviceStatus,
//   }),
// )


export default class EGauge extends Component {

  chart = null;

  //数据位置
  labelBottom = {
    normal: {
      color: '#ccc',
      label: {
        show: true,
        position: 'center'
      },
      labelLine: {
        show: false
      }
    },
    emphasis: {
      color: 'rgba(0,0,0,0)'
    }
  };

  setTachometer = (value) => {
    // console.log({value})
    return [{ 
      value:value, 
      // name: 'x100 r/min' 
    }]
  }

  chartOption = {

    series: [
      // 转数表盘
      {
        name: '转速',
        type: 'gauge',
        center: ['50%', '50%'],    // 默认全局居中
        radius: '100%',
        min: 0,
        max: 2000,
        z: 2,
        splitNumber: 1,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            width: 2
          }
        },
        axisTick: {            // 坐标轴小标记
          length: 2,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          length: 1,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        pointer: {
          width: 1
        },
        title: {
          fontWeight: 'bolder',
          fontSize: 14,
          fontStyle: 'italic',
          offsetCenter: [0, '-30%'],       // x, y，单位px
        },
        detail: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 14,
          formatter: function (value) {
            // return value || null
          }
        },
        data: []
      }
    ]
  }


  componentDidMount() {
    const {sn} = this.props;
    this.chart = echarts.init(document.getElementById(`echarts-rpm${sn}`));
    this.chart.setOption(this.chartOption)

  }

  shouldComponentUpdate(nextProps) {
    const { deviceStatus } = nextProps;
    // const speed = deviceStatus.rpm ? (deviceStatus.rpm / 100).toFixed(2) : 0;
    const speed = deviceStatus || 0;

    if (this.chart) {
      this.chart.setOption({
        series: [{
          name: '转速',
          data: this.setTachometer(speed),
        }]
      })
    }


    return true
  }

  render() {
    const {sn} = this.props;
    return (
      <div id={`echarts-rpm${sn}`} style={{ width: 80, height: 80, ...this.props.style }}></div>
    );
  }
}
