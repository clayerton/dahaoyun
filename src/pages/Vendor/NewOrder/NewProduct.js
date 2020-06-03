import stj from '@/assets/stj.png';
import A98 from '@/assets/device/d_A98.jpg'

import ListCardUtil from '@/components/ListCardUtil';
import { Button, Card, Col, Form, Icon, Input, InputNumber, List, Row, Select } from 'antd';
import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
const { Option } = Select;
const { TextArea } = Input;
import { ProductVendorRender } from '@/utils/PopoverRenderUtil';

@Form.create()
class NewProduct extends PureComponent {
  static translateRender(item) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td align="right">工艺单&nbsp;:&nbsp;</td>
              <td>{item.craftNm}</td>
            </tr>
            <tr>
              <td align="right">品名&nbsp;:&nbsp;</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td align="right">品类&nbsp;:&nbsp;</td>
              <td>{item.typeName}</td>
            </tr>
            <tr>
              <td align="right">日期&nbsp;:&nbsp;</td>
              <td>{item.createTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  formLayout2 = {
    wrapperCol: { span: 24 },
  };
  componentDidUpdate() {
    const { item, setFieldsValue, getFieldValue, index } = this.props;
    if (
      item.product &&
      item.product.id &&
      getFieldValue(`productList[${index}].id`) !== item.product.id
    ) {
      setFieldsValue({ [`productList[${index}].id`]: item.product.id });
    }
  }
  render() {
    const { getFieldDecorator, itemList, productShowModal, delOrderDetail, index, item, deleteFlag } = this.props;
    const cardMethods = {
      checkboxGroup: false,
      popover: false,
      translateRender: this.constructor.translateRender,
      onClick: () => productShowModal(item && item.index),
    };
    return (
      <Fragment>
        <Row gutter={24}>
          <Col lg={7} md={6} sm={24}>
            <Form.Item {...this.formLayout2} style={{ marginBottom: 0 }}>
              {item && item.product && item.product.id ? (
                <List grid={{ gutter: 24, lg: 1, md: 2, sm: 2, xs: 1 }}>
                  <ListCardUtil
                    avatar={<img alt="" className={styles.cardAvatar} src={A98} />}
                    {...cardMethods}
                    item={item.product}
                    title={<a>{item.product.name}</a>}
                    fromToVendorProduct={true}
                  content={ProductVendorRender(item && item.product)}
                  />
                </List>
              ) : (
                  <List grid={{ gutter: 24, lg: 1, md: 2, sm: 2, xs: 1 }}>
                    <List.Item key={index} style={{ padding: 0 }}>
                      <Card
                        bordered={false}
                        bodyStyle={{ padding: 16, height: '100%' }}
                        style={{ height: '162px' }}
                      >
                        <Button
                          type="dashed"
                          className={styles.newButton}
                          onClick={() => productShowModal(item.index)}
                        >
                          <Icon type="plus" style={{ fontSize: '50px' }} />
                          <div style={{ fontSize: '20px' }}>点击选择产品</div>
                        </Button>
                      </Card>
                    </List.Item>
                  </List>
                )}
                {getFieldDecorator(`productList[${index}].id`, {
                  initialValue: item && item.product ? item.product.id : null,
                  rules: [{ required: true, message: '请选择产品' }],
                })(<InputNumber style={{ display: 'none' }} />)}
            </Form.Item>
          </Col>
          <Col lg={14} md={12} sm={24}>
            <Row gutter={24}>
              <Col lg={12} md={12} sm={24}>
                <Form.Item label="数量" {...this.formLayout}>
                  {getFieldDecorator(`productList[${index}].quantity`, {
                    rules: [{ required: true, message: '请输入数量' }],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      style={{ width: '100%' }}
                      onChange={this.fillOrderNum}
                      min={0}
                      autoComplete="off"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Form.Item label="备注" {...this.formLayout}>
                  {getFieldDecorator(`productList[${index}].remark`, {
                    rules: [{ required: false, message: '请输入备注' }],
                  })(
                    <TextArea placeholder="请输入备注" style={{ height: 30, width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Form.Item label="单价(元)" {...this.formLayout}>
                  {getFieldDecorator(`productList[${index}].price`, {
                    rules: [{ required: false, message: '请输入单价(元)' }],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      style={{ width: '100%' }}
                      onChange={this.fillOrderNum}
                      min={0}
                      autoComplete="off"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {
            index !== 0 &&
            <Col lg={3} md={12} sm={24}>
              <Button
                style={{ width: '100%', marginTop: 56, marginBottom: 8 }}
                type="dashed"
                onClick={() => delOrderDetail(item.index)}
                icon="minus"
                title="删除"
              >
                删除
            </Button>
            </Col>
          }
        </Row>
      </Fragment>
    );
  }
}

export default NewProduct;
