import React, { PureComponent, Fragment } from 'react';
import { Card, Row, Col, Select, Radio, Input, Modal, Button, Popover, Form, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

const { TextArea } = Input;
const { Option } = Select;
const stageInterval = [
    { key: 1, name: '1个月' },
    { key: 2, name: '2个月' },
    { key: 3, name: '3个月' },
    { key: 6, name: '6个月' },
]
@Form.create()

@connect(({ vdrClient, loading }) => ({
    client: vdrClient.client,
    loading: loading.models.list,
  }))
export default class ModifyOrder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paytypeValue: null,
            endValue: null,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'vdrClient/getClientList',
            payload: {
                count: 100,
                type: 0,
            },
        });
      }
    
    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    _cancel = () => {
        const { cancel } = this.props;
        cancel && cancel()
    }

    _submit = () => {
        const { submit, form, client, current } = this.props;
        let clientItems = client && client.items || [];
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let cli,clientData;
            if(fieldsValue && fieldsValue.customerId && (typeof fieldsValue.customerId === 'string')){
                cli =  clientItems && clientItems.filter(v=>{
                    if(v.name ===fieldsValue.customerId) {
                        return v;
                    }
                })
                clientData = (cli && cli[0] && cli[0].id) || null;
                if(!clientData) {
                    clientData = !clientData && current && current.customerid;
                }
            };
            let nowCustom = !!clientData && {customerId:clientData}
            let value =  {...fieldsValue,...nowCustom}
            submit && submit(value)

        });
        
    }

    onChange = e => {
        this.setState({
            paytypeValue: e.target.value,
        });
    };

    onInterFilter = (interval) => {
       let stage = stageInterval.filter((v,i)=>{
            if(v.key === interval){
                return (v.name);
            }
        })
        let stageR = (stage && stage[0] && stage[0].key) || null
        return stageR;
    }
    disabledEndDate = (endValue) => {
        if (!endValue) {
          return false;
        }
        let ableDate = new Date(endValue).getDate();
        let ableSelectDate =  ableDate===1 || ableDate===5 || ableDate===10 || ableDate===15 || ableDate===20 || ableDate===25;
        return endValue.valueOf() <= new Date() || !ableSelectDate;
      }

    render() {
        const { visible, current, value, form: { getFieldDecorator, setFieldsValue, getFieldValue }, client } = this.props;
        const { paytypeValue, endValue } = this.state;
        return (
            <Modal
                destroyOnClose
                title=""
                visible={visible}
                onOk={this._submit}
                onCancel={this._cancel}
                width={800}
            >
                <Row gutter={24} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item label="订单号" {...this.formLayout}>
                            {getFieldDecorator('no', {
                                rules: [{ required: true, message: '请输入订单号' }],
                                initialValue: current && current.no,
                            })(<Input readOnly placeholder="请输入" />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="订单标题" {...this.formLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: false, message: '请输入订单标题' }],
                                initialValue: current && current.name,
                            })(<Input placeholder="请输入" />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="客户名称" {...this.formLayout}>
                            {getFieldDecorator('customerId', {
                                rules: [{ required: false, message: '请选择客户名称' }],
                                initialValue: current && current.customerName,
                            })(<Select style={{width: '100%'}} showSearch placeholder="请选择">
                            {client && client.items
                              ? client.items.map(item => (
                                <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>
                              ))
                              : null}
                          </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="下单日期" {...this.formLayout}>
                            {getFieldDecorator('order',{
                                        rules: [{ required: false, message: '请选择下单日期' }],
                                        initialValue: current && current.order && moment(current.order)
                                    })(
                                <DatePicker placeholder="请选择下单日期" style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="交货日期" {...this.formLayout}>
                            {getFieldDecorator('deliver',{
                                        rules: [{ required: false, message: '请选择交货日期' }],
                                        initialValue: current && current.deliver && moment(current.deliver) 
                                    })(
                                <DatePicker placeholder="请选择交货日期" style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </Col>
                    {
                        current && current.paytypeValue !== 'installment' &&
                        <Col span={12}>
                            <Form.Item label="是否分期" {...this.formLayout}>
                                <Radio.Group onChange={this.onChange} value={paytypeValue || value}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    }
                    {
                        ((current && value === 1) || (current && value ===2 && paytypeValue === 1 ))  &&
                        (<Fragment>
                            <Col span={12}>
                                <Form.Item label="起始日期" {...this.formLayout}>
                                    {getFieldDecorator('instalment.start', {
                                        rules: [{ required: true, message: '请选择起始日期' }],
                                        initialValue: current && current.start && moment(current.start)
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
                            <Col span={12}>
                                <Form.Item label="分期间隔" {...this.formLayout}>
                                    {getFieldDecorator('instalment.interval', {
                                        rules: [{ required: true, message: '请选择分期间隔' }],
                                        initialValue: current && current.interval && this.onInterFilter(current.interval),
                                    })(
                                        <Select style={{ width: '100%' }} placeholder="请选择">
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
                            <Col span={12}>
                                <Form.Item label="分期期数" {...this.formLayout}>
                                    {getFieldDecorator('instalment.periodNm', {
                                        rules: [{ required: true, message: ' ' },{
                                            validator: async (rule, value) => {
                                              let reg = /^[1-9]\d*$/; 
                                              if(!value) {
                                                throw new Error('请输入分期期数');
                                              }
                                              if(!reg.test(value) || value > 32) {  //正整数校验且不超过32期
                                                throw new Error('分期期数不超过32期');
                                              }
                                            },
                                          }],
                                        initialValue: current && current.totalIndex,
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
                            <Col span={12}>
                                <Form.Item label="每期还款金额" {...this.formLayout}>
                                    {getFieldDecorator('instalment.amount', {
                                        rules: [{ required: false, message: '请输入每期还款金额' }],
                                        initialValue: current && current.amount,
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
                        </Fragment>)
                    }


                </Row>
            </Modal>
        )
    }
}