import React from 'react';
import { Form, Input, Col, Row, Select } from 'antd';
// import GloveFormUtil from './FormItemUtil';
import { formatMessage } from 'umi-plugin-locale';

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
        categoryList
    } = props;
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, fieldsValue) => {
            if (err) return;
            submit(fieldsValue);
        });
    };
    const renderForm = () => {
        switch (type) {
            case 1:
                return null;
            case 2:
                return null;
            case 'glove':
                return <GloveFormUtil {...props} />;
            case 8:
                return null;
            default:
                return null;
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Row gutter={24}>
                <Col span={12}>
                    <FormItem label="工艺单号" {...formLayout}>
                        {getFieldDecorator('craftNm', {
                            rules: [{ required: false, message: '请输入产品名称' }],
                            initialValue: current && current.craftNm,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="品名" {...formLayout}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入产品名称' }],
                            initialValue: current && current.name,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="分组" {...formLayout}>
                        {getFieldDecorator('typeId', {
                            rules: [{ required: false, message: '请输入产品分组' }],
                            initialValue: current && current.typeName,
                        })(
                            <Select placeholder="请选择">
                                {groupList && groupList.items
                                    ? groupList.items.map(item => (
                                        <SelectOption key={item.id} value={item.id}>
                                            {item.name}
                                        </SelectOption>
                                    ))
                                    : null}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="电控" {...formLayout}>
                        {getFieldDecorator('electrCtrl', {
                            rules: [{ required: false, message: '请输入电控' }],
                            initialValue: current && current.electrCtrl,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="机架" {...formLayout}>
                        {getFieldDecorator('frame', {
                            rules: [{ required: false, message: '请输入机架' }],
                            initialValue: current && current.frame,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="头数" {...formLayout}>
                        {getFieldDecorator('headNm', {
                            rules: [{ required: false, message: '请输入头数' }],
                            initialValue: current && current.headNm,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="针数" {...formLayout}>
                        {getFieldDecorator('stitches', {
                            rules: [{ required: false, message: '请输入针数' }],
                            initialValue: current && current.stitches,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="夹线器" {...formLayout}>
                        {getFieldDecorator('clipper', {
                            rules: [{ required: false, message: '请输入夹线器' }],
                            initialValue: current && current.clipper,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="主轴" {...formLayout}>
                        {getFieldDecorator('headstock', {
                            rules: [{ required: false, message: '请输入主轴' }],
                            initialValue: current && current.headstock,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="绣框" {...formLayout}>
                        {getFieldDecorator('embFrame', {
                            rules: [{ required: false, message: '请输入绣框' }],
                            initialValue: current && current.embFrame,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="剪线" {...formLayout}>
                        {getFieldDecorator('trim', {
                            rules: [{ required: false, message: '请输入剪线' }],
                            initialValue: current && current.trim,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="换色" {...formLayout}>
                        {getFieldDecorator('changeColor', {
                            rules: [{ required: false, message: '请输入换色' }],
                            initialValue: current && current.changeColor,
                        })(<Input autocomplete={'off'} placeholder="请输入" />)}
                    </FormItem>
                </Col>

            </Row>
        </Form>
    );
});

export default ProductForm;
