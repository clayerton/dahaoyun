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
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import ListCardUtil from '@/components/ListCardUtil';
import moment from 'moment';
import stj from '@/assets/stj.png';
import styles from './index.less';
import { connect } from 'dva';
import AddClientModal from './AddClientModal';
@Form.create()
@connect(({ vdrClient, loading }) => ({
  client: vdrClient.proxy, //proxy type为null时为全部；
  loading: loading.models.list,
}))
class BaseInfo extends PureComponent {
  state = {
    value: 1,
    visible: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'vdrClient/getClientList',
      payload: {
        count: 100,
        type: null,
      },
    });
  }
  fillBatchName = () => {};
  handleSubmit = (values, type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'vdrClient/addClient',
      payload: {
        add: { ...values, type: type },
        fetch: { page: 1, count: 10000, type: null },
      },
      callback: () => {
        this.setState({
          visible: false,
        });
      },
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onOpenClientVisible = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      item,
      productShowModal,
      index,
      formLayout,
      client,
    } = this.props;
    const { visible } = this.state;
    const addClient = {
      handleSubmit: this.handleSubmit,
      handleCancel: this.handleCancel,
      visible,
    };
    return (
      <Card bordered={false}>
        <div className={styles.baseInfo}>
          <span className={styles.flag}>1</span>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>填写基本信息</span>
        </div>
        <Row gutter={24}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="订单号" {...formLayout}>
              {getFieldDecorator('no', {
                rules: [{ required: true, message: '请输入订单号' }],
              })(
                <Input
                  placeholder="请输入订单编号"
                  autocomplete={'off'}
                  onChange={this.fillOrderNum}
                  // maxLength={15}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="订单标题" {...formLayout}>
              {getFieldDecorator('name')(
                <Input
                  style={{ width: '100%' }}
                  autocomplete={'off'}
                  onChange={this.fillBatchName}
                  placeholder="请输入订单标题"
                />
              )}
            </Form.Item>
          </Col>

          <Col lg={8} md={12} sm={24} style={{ position: 'relative' }}>
            <Form.Item label="客户/代理" {...formLayout} style={{ flex: 1 }}>
              {getFieldDecorator('customerId', {
                rules: [{ required: true, message: '请选择客户' }],
              })(
                <Select showSearch placeholder="请选择">
                  {client && client.items
                    ? client.items.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
            <a
              onClick={() => this.onOpenClientVisible()}
              style={{
                position: 'absolute',
                top: 10,
                right: 40,
              }}
            >
              新增
            </a>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="下单日期" {...formLayout}>
              {getFieldDecorator('order')(
                <DatePicker placeholder="请选择下单日期" style={{ width: '100%' }} />
              )}
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label="交货日期" {...formLayout}>
              {getFieldDecorator('deliver', {
                rules: [{ required: false, message: '请选择交货日期' }],
              })(<DatePicker placeholder="请选择交货日期" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
        </Row>
        <AddClientModal {...addClient} />
      </Card>
    );
  }
}

export default BaseInfo;
