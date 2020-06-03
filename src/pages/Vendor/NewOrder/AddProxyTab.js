import { Col, Form, Input, notification, Row, Select, Radio } from 'antd';
import React, { Fragment } from 'react';
import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const ClientForm = Form.create()(props => {
  const {
    getFieldDecorator,
    current,
    formLayout,
    selectTab,
    submit,
    validateFields,
    onChange,
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) return;
      submit(fieldsValue);
    });
  };
  const _onChange = e => {
    onChange && onChange(e.target.value);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label="客户/代理" {...formLayout}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择类型' }],
              initialValue: selectTab,
            })(
              <Radio.Group onChange={_onChange} value={selectTab}>
                <Radio value={0}>客户</Radio>
                <Radio value={1}>代理</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Col>
        {selectTab == 0 ? (
          <Fragment>
            <Col span={12}>
              <FormItem label="名称" {...formLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入名称' }],
                  // initialValue: current && current.name,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="联系人" {...formLayout}>
                {getFieldDecorator('contact', {
                  rules: [{ required: true, message: '请输入联系人' }],
                  // initialValue: current && current.contact,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="手机号" {...formLayout}>
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: '请输入手机号' }],
                  // initialValue: current && current.mobile,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="收货地址" {...formLayout}>
                {getFieldDecorator('address', {
                  rules: [{ required: false, message: '请输入收货地址' }],
                  // initialValue: current && current.address,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Fragment>
        ) : (
          <Fragment>
            <Col span={12}>
              <FormItem label="姓名" {...formLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入名称' }],
                  // initialValue: current && current.name,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="手机号" {...formLayout}>
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: '请输入手机号' }],
                  // initialValue: current && current.mobile,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="代理地区" {...formLayout}>
                {getFieldDecorator('address', {
                  rules: [{ required: false, message: '请输入代理地区' }],
                  // initialValue: current && current.address,
                })(<Input autocomplete={'off'} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Fragment>
        )}

        <Col span={12}>
          <FormItem label="发票抬头" {...formLayout}>
            {getFieldDecorator('invoiceName', {
              rules: [{ required: false, message: '请输入发票抬头' }],
              // initialValue: current && current.invoiceName,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="税号" {...formLayout}>
            {getFieldDecorator('licence', {
              rules: [{ required: false, message: '请输入税号' }],
              // initialValue: current && current.licence,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="单位地址" {...formLayout}>
            {getFieldDecorator('invoiceAddress', {
              rules: [{ required: false, message: '请输入发票地址' }],
              // initialValue: current && current.invoiceAddress,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="电话号码" {...formLayout}>
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: '请输入电话号码' }],
              // initialValue: current && current.phone,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="开户银行" {...formLayout}>
            {getFieldDecorator('bank', {
              rules: [{ required: false, message: '请输入开户银行' }],
              // initialValue: current && current.bank,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="银行帐号" {...formLayout}>
            {getFieldDecorator('account', {
              rules: [{ required: false, message: '请输入银行帐号' }],
              // initialValue: current && current.account,
            })(<Input autocomplete={'off'} placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});
export default ClientForm;
