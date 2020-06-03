import React from 'react';
import { Form, Input, Col, Row, Select } from 'antd';
import GloveFormUtil from './FormItemUtil';
import LaceFormUtil from './LaceFormUtil';
import SequinFormUtil from './SequinFormUtil';

import { formatMessage } from 'umi-plugin-react/locale';

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
    categoryList,
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) return;
      submit(fieldsValue);
    });
  };
  const renderForm = defaultCategory => {
    let category = current && current.category;

    switch (type || category || defaultCategory) {
      case 'lace':
        return <LaceFormUtil {...props} />;
      case 'sequin':
        return <SequinFormUtil {...props} />;
      case 'glove':
        return <GloveFormUtil {...props} />;
      case 8:
        return null;
      default:
        return null;
    }
  };
  let defaultCategory =
    categoryList && categoryList.items && categoryList.items[0] && categoryList.items[0].name;
  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label={formatMessage({ id: 'product.type' })} {...formLayout}>
            {getFieldDecorator('category', {
              rules: [
                { required: true, message: formatMessage({ id: 'please.select.product.type' }) },
              ],
              initialValue: (current && current.category) || defaultCategory,
            })(
              current && current.category ? (
                <span>{formatMessage({ id: `parameter.${current.category}` })}</span>
              ) : (
                <Select placeholder={formatMessage({ id: 'please.input' })} onSelect={changeItem}>
                  {categoryList &&
                    categoryList.items &&
                    categoryList.items.map((v, i) => {
                      return (
                        <SelectOption key={v.id} value={v.name}>
                          {formatMessage({ id: `parameter.${v.name}` })}
                        </SelectOption>
                      );
                    })}
                </Select>
              )
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={formatMessage({ id: 'product.name' })} {...formLayout}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: formatMessage({ id: 'please.input.product.name' }) },
              ],
              initialValue: current && current.name,
            })(<Input placeholder={formatMessage({ id: 'please.input' })} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={formatMessage({ id: 'group' })} {...formLayout}>
            {getFieldDecorator('group', {
              rules: [{ required: false, message: ' ' }],
              initialValue: current && current.group,
            })(
              <Select placeholder={formatMessage({ id: 'please.input' })}>
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
        </Col>
        {/* <GloveFormUtil {...props} /> */}
        {renderForm(defaultCategory)}
      </Row>
    </Form>
  );
});

export default ProductForm;
