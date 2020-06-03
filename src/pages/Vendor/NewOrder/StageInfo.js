import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Input,
  Form,
  Col,
  Row,
  InputNumber,
  Select,
  Icon,
  Card,
  List,
  DatePicker,
  Radio,
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import ListCardUtil from '@/components/ListCardUtil';
import moment from 'moment';
import stj from '@/assets/stj.png';
import styles from './index.less';
const stageInterval = [
  {key: 1, name: '1个月'},
  {key: 2, name: '2个月'},
  {key: 3, name: '3个月'},
  {key: 6, name: '6个月'},
]

@Form.create()
class StageInfo extends PureComponent {
  state = {
    value: 1,
    endValue: null,
    endOpen: true,
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  disabledEndDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    let ableDate = new Date(endValue).getDate();
    let ableSelectDate =  ableDate===1 || ableDate===5 || ableDate===10 || ableDate===15 || ableDate===20 || ableDate===25;
    return endValue.valueOf() <= new Date() || !ableSelectDate;
  }

  render() {
    const { getFieldDecorator, productShowModal, formLayout } = this.props;
    const { endValue, endOpen } = this.state;
    return (
      <Card style={{ marginTop: 20 }} bordered={false}>
        <div className={styles.baseInfo}>
          <span className={styles.flag}>2</span>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>填写分期信息</span>
        </div>
        <Row gutter={24}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="是否分期" {...formLayout}>
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {this.state.value === 1 && (
            <Fragment>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="起始日期" {...formLayout}>
                  {getFieldDecorator('instalment.start',{
                  rules: [{ required: true, message: '请选择起始日期' }],
                })(
                    <DatePicker
                      value={endValue}  
                      disabledDate={this.disabledEndDate}
                      placeholder="请选择起始日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="分期间隔" {...formLayout}>
                  {getFieldDecorator('instalment.interval',{
                  rules: [{ required: true, message: '请选择分期间隔' }],
                })(
                    <Select placeholder="请选择">
                      {stageInterval && stageInterval.map(item => (
                          <Option key={item.key} value={item.key}>
                            {item.name}
                          </Option>
                        ))
                        }
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Fragment>
          )}
        </Row>
        {this.state.value === 1 && (
          <Row gutter={24}>
            <Col lg={8} md={12} sm={24}>
              <Form.Item label="分期期数" {...formLayout}>
                {getFieldDecorator('instalment.periodNm', {
                  rules: [{ required: true, message: ' ' },{
                    validator: async (rule, value) => {
                      if(!value) {
                        throw new Error('请输入分期期数');
                      }
                      let reg = /^[1-9]\d*$/; 
                      if(!reg.test(value) || value > 32) {  //正整数校验且不超过32期
                        throw new Error('分期期数不超过32期');
                      }
                    },
                  }],
                })(
                  <InputNumber
                    placeholder="请输入分期期数"
                    onChange={this.fillOrderNum}
                    style={{ width: '100%' }}
                    maxLength={15}
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
            <Col lg={8} md={12} sm={24}>
              <Form.Item label="每期还款金额" {...formLayout}>
                {getFieldDecorator('instalment.amount', {
                  rules: [{ required: false, message: '请输入每期还款金额' }],
                })(
                  <InputNumber
                    placeholder="请输入每期还款金额"
                    onChange={this.fillOrderNum}
                    style={{ width: '100%' }}
                    maxLength={15}
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        )}
      </Card>
    );
  }
}

export default StageInfo;
