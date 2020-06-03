import closeImg from '@/assets/design/close.png';
import editImg from '@/assets/design/edit.png';
import saveImg from '@/assets/design/save.png';
import { isInteger } from '@/utils/isInteger';
import { Input, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import { colors, HeaderItem, StitchInfo } from './Component';
import styles from './index.less';

const { Option } = Select
@connect(({ design }) => ({
  desIdDetail: design.desIdDetail,
  desIdDetailImg: design.desIdDetailImg,
}))
export default class DesignDetail extends PureComponent {
  state = {
    name: null,
    unit: null,
    newName: null,
    valueNameFlag: false,
    valueGroup: null,
    valueGroupFlag: false,
    group: [],
  }
  componentDidMount() {
    const { location, dispatch } = this.props;
    const name = location && location.state && location.state.name;
    const group = location && location.state && location.state.group;

    const unit = JSON.parse(localStorage.getItem('unit'));
    this.setState({
      name,
      unit,
      group
    })
    dispatch({
      type: 'design/fetchDesById',
      payload: {
        name,
      },
    });
  }
  MapItem = ({ mapInfo }) => {
    return <Fragment>
      {mapInfo && mapInfo.map((_, index) => {
        if (index % 10 === 0)
          return (
            <div key={index + ''} className={styles.needle}>
              <span className={styles.line}>({!index ? '01' : index + 1}~{index + 10})</span>
              {mapInfo.map((obj, index2) => {
                if (Math.ceil((index + 1) / 10) === Math.ceil((index2 + 1) / 10)) {
                  return <span key={index + '_' + index2} style={{ background: colors[obj - 1] }} className={styles.item}>{obj}</span>
                }
              })}
            </div>
          )
      })}
    </Fragment>
  }
  back = () => {
    router.push({
      pathname: '/factory/produce/design-list',
    });
  }
  onHandleEdit = () => {
    const { desIdDetail, desIdDetailImg } = this.props;
    router.push({
      pathname: '/factory/produce/design-list/design-edit',
      state: { desIdDetail, desIdDetailImg }
    });
  }
  onHandleDel = () => {
    const { desIdDetail, dispatch } = this.props;
    const { name } = this.state;

    dispatch({
      type: 'design/delDes',
      payload: {
        name
      },
      callback: () => {
        router.goBack();
      }
    })
  }
  handleChange = event => {
    this.setState({ newName: event.target.value });
  }
  handleChangeSelect = valueGroup => {
    this.setState({ valueGroup });
  }
  edit = () => {
    const { desIdDetail } = this.props;
    const newName = desIdDetail && desIdDetail.name;
    this.setState((preState) => {
      return {
        valueNameFlag: !preState.valueNameFlag,
        newName,
      }
    })
  }
  editG = () => {
    const { desIdDetail } = this.props;
    const valueGroup = desIdDetail && desIdDetail.group;
    this.setState((preState) => {
      return {
        valueGroupFlag: !preState.valueGroupFlag,
        valueGroup,
      }
    })
  }
  save = () => {
    const { desIdDetail, dispatch } = this.props;
    const { newName, valueNameFlag, group } = this.state;
    const oldName = desIdDetail && desIdDetail.name;
    if (!valueNameFlag || (newName === oldName)) {
      this.setState({
        valueNameFlag: false,
      })
      return;
    };
    dispatch({
      type: 'design/updDesName',
      payload: {
        oldName,
        newName,
      },
      callback: () => {
        this.setState({
          valueNameFlag: false,
          name: newName,
        })
        router.replace({
          pathname: '/factory/produce/design-list/design-detail',
          state: { name: newName, group },
        });
      }
    })
  }
  saveG = () => {
    const { location, dispatch, desIdDetail } = this.props;
    const { valueGroupFlag, valueGroup } = this.state;
    const name = location && location.state && location.state.name;

    const oldGroup = desIdDetail && desIdDetail.group;
    if (!valueGroupFlag || (valueGroup === oldGroup)) {
      this.setState({
        valueGroupFlag: false,
      })
      return;
    };
    dispatch({
      type: 'design/updDesGroup',
      payload: {
        name,
        group: valueGroup,
      },
      callback: () => {
        this.setState({
          valueGroupFlag: false,
        })

      }
    })
  }
  cancel = () => {
    this.setState({
      valueNameFlag: false,
    })
  }
  cancelG = () => {
    this.setState({
      valueGroupFlag: false,
    })
  }
  render() {
    const { desIdDetail, desIdDetailImg, location } = this.props;
    const { unit, newName, valueNameFlag, valueGroupFlag, valueGroup, group } = this.state;
    const type = desIdDetail && desIdDetail.type && desIdDetail.type[0];
    const parameter = desIdDetail && desIdDetail.parameter
    const unitType = desIdDetail && desIdDetail.unitType;
    const len = parameter && (parameter.length % 2 === 0);  //判断奇 false  偶 true
    const lenMax = parameter && Math.ceil(parameter.length / 2) || 0;
    const created = `创建时间：${desIdDetail && moment(desIdDetail.created).format('YYYY-MM-DD HH:mm:ss')}`;
    // 针位信息
    const needles = desIdDetail && desIdDetail.setting && desIdDetail.setting.needles || new Array(15).fill({ "needle": null, "thread": null });
    const map = desIdDetail && desIdDetail.setting && desIdDetail.setting.map;
    const MapItem = this.MapItem;
    let unitName = '', factor = 1;
    try {
      unitName = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].name);
      factor = unitType && unit && (unit.filter((v, i) => v.type === unitType)[0].factor) || 1;
    } catch (e) { }
    return (
      <div className={styles.content}>
        <HeaderItem title={'基本信息'}>
          <div className={styles.button}>
            <span onClick={this.onHandleEdit} className={styles.edit}>编  辑</span>
            <span onClick={this.onHandleDel}>删  除</span>
          </div>
          <span onClick={this.back} className={styles.back}>返  回</span>
        </HeaderItem>
        <div className={styles.info}>
          <div className={styles.left}>
            {/* 名称 */}
            <div className={styles.item}>
              <div className={styles.itemL}>
                <span className={`${styles.itemName} ${styles.name}`}>名称：
                {
                    !valueNameFlag ?
                      <Fragment>
                        <span className={styles.noEdit}>{desIdDetail && desIdDetail.name}</span>
                        <img src={editImg} onClick={this.edit} />
                      </Fragment>
                      :
                      <Fragment>
                        <Input value={newName} onChange={this.handleChange} />
                        <div className={styles.menu}>
                          <img src={saveImg} onClick={this.save} />
                          <img src={closeImg} onClick={this.cancel} />
                        </div>
                      </Fragment>
                  }
                </span>
              </div>
              <div className={styles.itemR}>
                <span className={styles.itemName}>类型：{type}</span>
              </div>
            </div>
            {/* 名称 */}
            <div className={styles.item}>
              <div className={styles.itemL}>
                <span className={`${styles.itemName} ${styles.name}`}>分组：
                {
                    !valueGroupFlag ?
                      <Fragment>
                        <span className={styles.noEdit}>{desIdDetail && desIdDetail.group || '未分组'}</span>
                        <img src={editImg} onClick={this.editG} />
                      </Fragment>
                      :
                      <Fragment>
                        <Select defaultValue={desIdDetail && desIdDetail.group || '未分组'} className={this.select} onChange={this.handleChangeSelect}>
                          {
                            group && group.map((v, i) => {
                              if (v.name === null || v.name === '~') return;
                              return (
                                <Option key={v.name}>
                                  {v.name}
                                </Option>
                              )
                            })
                          }
                        </Select>
                        <div className={styles.menu}>
                          <img src={saveImg} onClick={this.saveG} />
                          <img src={closeImg} onClick={this.cancelG} />
                        </div>
                      </Fragment>

                  }

                </span>
              </div>
              <div className={styles.itemR}>
                <span className={styles.itemName}>针数：{desIdDetail && desIdDetail.stitch}</span>
              </div>
            </div>
            <Item left={`单位：${unitName}`} right={`花样产量：${desIdDetail && isInteger(desIdDetail.yield / factor)}${unitName}`} />
            <Item left={`针数工价：${desIdDetail && isInteger(desIdDetail.stitchPrice * 10000)}元/万针`} right={`产量工价：${desIdDetail && isInteger(desIdDetail.yieldPrice * factor)}元/${unitName}`} />
            {
              parameter && parameter.map((v, i) => {
                if (len) {
                  if (i === lenMax) return <Item key={i} left={created} />;
                  if (i + 1 <= lenMax) return <Item key={i} left={`${formatMessage({ id: 'parameter.' + parameter[2 * i].key })}：${parameter[2 * i].value}`} right={`${formatMessage({ id: 'parameter.' + parameter[2 * i + 1].key })}：${parameter[2 * i + 1].value}`} />
                } else {
                  if (i + 1 < lenMax - 1) return <Item key={i} left={`${formatMessage({ id: 'parameter.' + parameter[2 * i].key })}：${parameter[2 * i].value}`} right={`${formatMessage({ id: 'parameter.' + parameter[2 * i + 1].key })}：${parameter[2 * i + 1].value}`} />
                  if (i + 1 === lenMax - 1) return <Item key={i} left={`${formatMessage({ id: 'parameter.' + parameter[2 * i].key })}：${parameter[2 * i].value}`} right={created} />
                }
              })
            }
          </div>
          <div className={styles.right}>
            <img src={desIdDetailImg} alt='' />
          </div>
        </div>
        <HeaderItem title={'针位信息'} />
        <StitchInfo needles={needles} />
        <HeaderItem title={'换色顺序'} />
        <div className={styles.colors}>
          <div className={styles.header}>
            <span className={styles.text}>针位:</span>
            {
              colors.map((v, i) => {
                return <span key={i} style={{ background: v }} className={styles.block}>{i + 1}</span>
              })
            }
          </div>
          <MapItem mapInfo={map} />

        </div>
      </div>
    );
  }
}
const Item = props => {
  const { left, right } = props;
  return (
    <div className={styles.item}>
      <div className={styles.itemL}>
        <span className={styles.itemName}>{left}</span>
      </div>
      {
        right && <div className={styles.itemR}>
          <span className={styles.itemName}>{right}</span>
        </div>
      }
    </div>
  )
}