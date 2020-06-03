import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';

const ds = new DataSet({
  state: {
    start: 0,
    end: 1,
  },
});
export default class Basiccolumn extends React.Component {
  handleSliderChange = e => {
    console.log(e);
    const { startRadio, endRadio } = e;
    ds.setState('start', startRadio);
    ds.setState('end', endRadio);
  };
  render() {
    const {data} = this.props
  
    const cols = {
      ratio: {
        tickInterval: 20,
      },
    };
    const dv = ds.createView().source(data);

    dv.transform({
      type: 'filter',
      callback(item, idx) {
        const radio = idx / data.length;
        return radio >= ds.state.start && radio <= ds.state.end;
      },
    });
    return (
      <div>
        <Chart height={400} padding='auto' data={dv} scale={cols} forceFit>
          <Axis name="date" />
          <Axis name="ratio" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="date*ratio" />
        </Chart>
        <Slider
          data={data}
          padding={60}
          xAxis="date"
          yAxis="ratio"
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}