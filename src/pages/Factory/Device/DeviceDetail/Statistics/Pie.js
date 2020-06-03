import DataSet from "@antv/data-set";
import { Axis, Chart, Coord, Geom, Guide, Tooltip } from "bizcharts";
import React from 'react';

export default function PieChart(props) {
    const { DataView } = DataSet;
    const { stateList } = props;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(stateList).transform({
        type: "percent",
        field: "count",
        dimension: "state",
        as: "percent"
    });
    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + "%";
                return val;
            }
        },
    };
    return (
        <Chart
            height={360}
            width={360}
            padding={20}
            data={dv}
            scale={cols}
        >
            <Coord type={"theta"} radius={1} innerRadius={0.8} />
            <Axis name="percent" />
            <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Guide>
                <Html
                    position={["50%", "50%"]}
                    html="
                    <div style='text-align: center;width: 20em;'>
                        <div style='color:#333;font-size:24px;height: 24px;line-height: 24px;'>
                            状态时间占比
                        </div>
                        
                    </div>
                    "
                    alignX="middle"
                    alignY="middle"
                />
            </Guide>
            <Geom
                type="intervalStack"
                position="percent"
                color={['color', (color) => {
                    return color;
                }]}
                tooltip={[
                    "state*percent",
                    (state, percent) => {
                        percent = percent * 100 + "%";
                        return {
                            name: state,
                            value: percent
                        };
                    }
                ]}
            >
            </Geom>
        </Chart>
    )
}