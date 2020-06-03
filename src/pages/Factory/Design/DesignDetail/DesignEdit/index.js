import { getValue } from '@/utils/parameter';
import { Button, Form, Input, notification, Select, InputNumber } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import router from 'umi/router';
import { colors, HeaderItem, StitchInfo } from '../Component';
import styles from './index.less';
import { isInteger } from '@/utils/isInteger';

const FormItem = Form.Item;
const SelectOption = Select.Option;
@Form.create()
@connect()
class DesignEdit extends PureComponent {

    state = {
        unit: null,
        mapSelect: 0,
        map: [],
        colorsNum: 0,
        unitSpi: 1, //1万针 2千针
        unitName: null,
        factor: 1,
        initial_factor: 1,
    }
    componentDidMount() {
        const { location } = this.props;
        const desIdDetail = location && location.state && location.state.desIdDetail;
        const unitType = desIdDetail && desIdDetail.unitType;
        // 针位信息
        const colorsNum = desIdDetail && desIdDetail.parameter && getValue('colors', desIdDetail.parameter) || 0;
        const map = desIdDetail && desIdDetail.setting && desIdDetail.setting.map || (colorsNum && new Array(colorsNum).fill(null)) || [];
        const unit = JSON.parse(localStorage.getItem('unit'));

        let unitName = null, factor = 1;
        try {
            unitName = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].name) || null;
            factor = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].factor) || 1;
        } catch (e) { }
        this.setState({
            unit,
            map,
            colorsNum,
            unitName,
            factor,
            initial_factor: factor,
        })
    }

    MapItem = ({ mapInfo }) => {
        const { form: { getFieldDecorator } } = this.props;
        const { mapSelect } = this.state;
        return <Fragment>
            {mapInfo && mapInfo.map((_, index) => {
                if (index % 10 === 0)
                    return (
                        <div key={index + ''} className={styles.needle}>
                            <span className={styles.line}>({!index ? '01' : index + 1}~{index + 10})</span>
                            {mapInfo.map((obj, index2) => {
                                if (Math.ceil((index + 1) / 10) === Math.ceil((index2 + 1) / 10)) {
                                    return <div key={index + '_' + index2}>
                                        {
                                            getFieldDecorator(`setting.map.${index2}`, {
                                                initialValue: obj,
                                            })(
                                                <span
                                                    onClick={this.onHandleMap.bind(this, index2)}
                                                    key={index + '_' + index2}
                                                    style={{ background: colors[obj - 1] }}
                                                    className={`${styles.item} ${mapSelect === index2 && styles.itemSelect}`}
                                                >
                                                    {obj}
                                                </span>
                                            )
                                        }
                                    </div>
                                }
                            })}
                        </div>
                    )
            })}
        </Fragment>
    }
    onHandleMap = (index) => {
        this.setState({
            mapSelect: index,
        })
    }
    onHandleColors = (v, i) => {
        let { map, mapSelect, colorsNum } = this.state;
        let _map = map.slice();
        _map[mapSelect] = i + 1;
        this.setState((preState) => {
            return {
                map: _map,
                mapSelect: mapSelect >= colorsNum - 1 ? preState.mapSelect : preState.mapSelect + 1
            }
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        let { unitSpi, factor } = this.state;

        const { form, dispatch } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;

            //  系数处理
            fieldsValue.stitchPrice = fieldsValue.stitchPrice / (unitSpi === 1 ? 10000 : 1000);
            fieldsValue.yield = fieldsValue.yield * factor;
            fieldsValue.yieldPrice = fieldsValue.yieldPrice / factor;
            let map = fieldsValue.setting.map && fieldsValue.setting.map.slice() || [], flag = true, farther = [];
            let length = map.length;
            let map_last = null, len = map.length; //map最后出现的数字及长度
            for (let i of map) { if (i) map_last = i };
            let index = map.lastIndexOf(map_last) + 1; // 最后出现的数字的下标
            let allNull = map.every(item => item === null); // 当全部为空是
            let map_v = map.slice(0, index);
            flag = map_v.every(item => !!item);
            if (!flag && !allNull) {
                notification.warn({
                    message: '连续换色不能为空',
                });
                return;
            }
            farther = new Array(len - index).fill(map_last);
            fieldsValue.setting.map = map_v.concat(farther);
            if(allNull) delete fieldsValue.setting.map
            dispatch({
                type: 'design/updDes',
                payload: fieldsValue,
                callback: () => {
                    router.goBack();
                }
            })
        });
    }
    onCancel = () => {
        router.goBack();
    }
    onChangeUnit = value => {
        const { unit } = this.state;
        const unitName = value && (unit.filter((v, i) => v.type === value)[0].name);
        const factor = value && (unit.filter((v, i) => v.type === value)[0].factor);

        this.setState({
            unitName,
            factor,
        })
    }
    baseInfo = () => {
        const { location, form, form: { getFieldDecorator } } = this.props;
        const { unit, unitName, factor, initial_factor } = this.state;
        const desIdDetail = location && location.state && location.state.desIdDetail;
        const desIdDetailImg = location && location.state && location.state.desIdDetailImg;
        return (
            <div className={styles.baseContent}>
                <div className={styles.left}>
                    <div className={styles.baseText}>
                        名称：{getFieldDecorator('name', { initialValue: desIdDetail && desIdDetail.name })(
                        <Fragment>{desIdDetail && desIdDetail.name}</Fragment>
                    )}
                    </div>
                    <div className={styles.baseText}>分组：{desIdDetail && desIdDetail.group || '未分组'}</div>
                    <FormItem label={'单位'} className={styles.baseInfo}>
                        {getFieldDecorator('unitType', {
                            initialValue: desIdDetail && desIdDetail.unitType,
                        })(
                            <Select className={styles.select} onChange={this.onChangeUnit}>
                                {
                                    unit && unit.map((v, i) => {
                                        return <SelectOption key={v.type}>{v.name}</SelectOption>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'花样产量'} className={styles.baseInfo}>
                        <div className={styles.input}>
                            {getFieldDecorator('yield', {
                                initialValue: desIdDetail && isInteger(desIdDetail.yield / initial_factor)
                            })(
                                <InputNumber className={styles.inputNumber} autoComplete='off' />
                            )}
                            <span className={styles.inputText}>/&nbsp;&nbsp;{unitName}</span>
                        </div>
                    </FormItem>
                    <FormItem label={'针数工价'} className={styles.baseInfo}>
                        <div className={styles.stitch}>
                            {getFieldDecorator('stitchPrice', {
                                initialValue: desIdDetail && isInteger(desIdDetail.stitchPrice * 10000)
                            })(
                                <InputNumber className={styles.inputNumber} autoComplete='off' className={styles.stitchL} />
                            )}
                            <span className={styles.line}>/</span>
                            <Select defaultValue={'万针'} onChange={this.onHandleSelectSpi} className={`${styles.select} ${styles.stitchR}`}>
                                <SelectOption key={1}>万针</SelectOption>
                                <SelectOption key={2}>千针</SelectOption>

                            </Select>
                        </div>
                    </FormItem>
                    <FormItem label={'产量工价'} className={styles.baseInfo}>
                        <div className={styles.input}>
                            {getFieldDecorator('yieldPrice', {
                                initialValue: desIdDetail && isInteger(desIdDetail.yieldPrice * initial_factor)
                            })(
                                <InputNumber className={styles.inputNumber} autoComplete='off' />
                            )}
                            <span className={styles.inputText}>/&nbsp;&nbsp;{unitName}</span>
                        </div>

                    </FormItem>
                </div>
                <div className={styles.right}>
                    <img src={desIdDetailImg} alt='' />
                </div>
            </div>
        )
    }

    onHandleSelectSpi = unitSpi => {
        this.setState({
            unitSpi,
        })
    }

    render() {
        const { location, form, form: { getFieldDecorator } } = this.props;
        const { unit, map } = this.state;
        const desIdDetail = location && location.state && location.state.desIdDetail;
        const desIdDetailImg = location && location.state && location.state.desIdDetailImg;
        const needles = desIdDetail && desIdDetail.setting && desIdDetail.setting.needles || new Array(15).fill({ "needle": null, "thread": null });

        const MapItem = this.MapItem;
        return (
            <Form className={styles.content} onSubmit={this.handleSubmit}>
                <HeaderItem title={'编辑基本信息'} >
                    <div>
                        <Button type="fault" onClick={this.onCancel} style={{ marginRight: 20 }} >取消 </Button>
                        <Button type="primary" htmlType="submit"  >提交 </Button>
                    </div>

                </HeaderItem>
                {this.baseInfo()}
                <HeaderItem title={'设置针位信息'} />
                <StitchInfo needles={needles} form={form} edit={true} />
                <HeaderItem title={'设置换色顺序'} />
                <div className={styles.colors}>
                    <div className={styles.header}>
                        <span className={styles.text}>针位:</span>
                        {
                            colors.map((v, i) => {
                                return <span onClick={this.onHandleColors.bind(this, v, i)} key={i} style={{ background: v }} className={styles.block}>{i + 1}</span>
                            })
                        }
                    </div>
                    <MapItem mapInfo={map} />
                </div>
            </Form>
        )
    }
}
export default DesignEdit;