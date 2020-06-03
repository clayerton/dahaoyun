import DataSet from "@antv/data-set";
import { Axis, Chart, Coord, Geom, Label, Tooltip } from "bizcharts";
import 'echarts/lib/chart/pie';
import React, { useEffect, useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from '../style.less';
import Header from './Header';
const status = ['all', 'runs', 'stops', 'errors', 'offlines',];
const colors = ['#00b01a', '#ff8400', '#bd0000', '#838383'] // 更改默认的颜色
const colorAll = [''].concat(colors);

function Device(props) {
    const { all, errors, offlines, runs, stops } = props;
    const [dv, newDv] = useState(null)
    const [cols, newCols] = useState(null)
    useEffect(() => {
        const { DataView } = DataSet;
        let data = [
            {
                item: "开车",
                count: runs,
                color: '#00b01a'
            },
            {
                item: "停车",
                count: stops,
                color: '#ff8400'

            },
            {
                item: "故障",
                count: errors,
                color: '#bd0000'
            },
            {
                item: "离线",
                count: offlines,
                color: '#838383'
            },

        ];
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "count",
            dimension: "item",
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
        newDv(dv)
        newCols(cols)
    }, [props])
    return (
        <div className={styles.device}>
            <Header title={'设备详情'} />
            <div className={styles.item}>
                <div className={styles.deviceType}>
                    {
                        status.map((v, i) => {
                            return (
                                <div key={i} className={styles.deviceItem}>
                                    <div style={{ background: colorAll[i] }} className={styles.deviceColor} />
                                    <span>{formatMessage({ id: `device.${v}` })}</span>
                                    <span>{props[v]}</span>
                                </div>

                            )
                        })
                    }
                </div>
                <div style={{ marginLeft: 286 }}>
                    <Chart
                        height={400}
                        width={400}
                        data={dv}
                        scale={cols}
                    >
                        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                        <Axis name="percent" />
                        <Tooltip
                            showTitle={false}
                            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                        />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['color', (color) => {
                                return color;
                            }]}
                            tooltip={[
                                "item*percent",
                                (item, percent) => {
                                    percent = percent * 100 + "%";
                                    return {
                                        name: item,
                                        value: percent
                                    };
                                }
                            ]}
                        >
                            <Label
                                content="percent"
                                textStyle={{
                                    fill: '#333', // 文本的颜色
                                    fontSize: '14', // 文本大小
                                }}
                                formatter={(val, item) => {
                                    if (item.point.count === 0) return;
                                    return item.point.item + ": " + item.point.count;
                                }}
                            />
                        </Geom>
                    </Chart>
                </div>

            </div>
        </div>
    )

}
export default Device;