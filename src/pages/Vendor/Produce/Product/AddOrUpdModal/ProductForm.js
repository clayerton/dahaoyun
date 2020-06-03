import { Col, Form, Input, notification, Row, Select } from 'antd';
import React from 'react';
import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const ProductForm = Form.create()(props => {
  const {
    getFieldDecorator,
    current,
    formLayout,
    type,
    submit,
    validateFields,
    changeItem,
    groupList,
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) return;
      submit(fieldsValue);
    });
  };

  const InputNumber = (rule, value, callback) => {
    if (value && isNaN(Number(value))) {
      notification.success({
        message: '头数请输入数字类型',
      });
      return;
    }
    callback();
  };

  const category = id => {
    const list = (groupList && groupList.typeList) || [];
    const data = list && list.filter(v => v.id === id);
    return data && data[0] && data[0].name;
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      {/* <Row gutter={24}>
                <Col span={12}> */}
      <FormItem label="产品类型" {...formLayout}>
        {getFieldDecorator('category', {
          rules: [{ required: true, message: '请输入产品类型' }],
          initialValue: current && current.type,
        })(
          <Select placeholder="请选择" onSelect={changeItem}>
            <SelectOption key="glove" value="glove">
              手套
            </SelectOption>
          </Select>
        )}
      </FormItem>
      {/* </Col>
                <Col span={12}> */}
      <FormItem label="工艺单号" {...formLayout}>
        {getFieldDecorator('no', {
          rules: [{ required: true, message: '请输入工艺单号' }],
          initialValue: current && current.no,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/* </Col>
                <Col span={12}> */}
      <FormItem label="品名" {...formLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current && current.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/* </Col>
                <Col span={12}> */}
      <FormItem label="品类" {...formLayout}>
        {getFieldDecorator('group', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current && current.group,
        })(
          <Select placeholder="请选择">
            {groupList && groupList.typeList
              ? groupList.typeList.map(item => (
                  // eslint-disable-next-line react/jsx-indent
                  <SelectOption key={item.id} value={item.name}>
                    {item.name}
                  </SelectOption>
                ))
              : null}
          </Select>
        )}
      </FormItem>
      <FormItem label="品类" {...formLayout}>
        {getFieldDecorator('group', {
          rules: [{ required: true, message: '请输入产品名称' }],
          initialValue: current && current.group,
        })(
          <Select placeholder="请选择">
            {groupList && groupList.items
              ? groupList.items.map(item => (
                  // eslint-disable-next-line react/jsx-indent
                  <SelectOption key={item.id} value={item.name}>
                    {item.name}
                  </SelectOption>
                ))
              : null}
          </Select>
        )}
      </FormItem>
      {/* </Col>
            </Row> */}
    </Form>
  );
});
export default ProductForm;
