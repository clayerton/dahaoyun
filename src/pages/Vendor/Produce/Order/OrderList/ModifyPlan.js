import React, { PureComponent, Fragment } from 'react';
import { Card, Row, Col, Select, Radio, Input, Modal, Button, Popover, Form, DatePicker, InputNumber } from 'antd';
const { TextArea } = Input;

@Form.create()
export default class ModifyPlan extends PureComponent {

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    _cancel = () => {
        const { cancel } = this.props;
        cancel && cancel()
    }

    _submit = () => {
        const { submit, form, client } = this.props;
        let clientItems = client && client.items || [];
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            submit && submit(fieldsValue)
        });

    }

    render() {
        const { visible, current, value, form: { getFieldDecorator, setFieldsValue, getFieldValue } } = this.props;
        return (
            <Modal
                destroyOnClose
                title=""
                visible={visible}
                onOk={this._submit}
                onCancel={this._cancel}
                width={500}
            >
                <Form.Item style={{ marginTop: 30 }} label="数量" {...this.formLayout}>
                    {getFieldDecorator('productQuantity', {
                        rules: [{ required: true, message: '请输入数量' }],
                        initialValue: current && current.productQuantity,
                    })(<InputNumber style={{ width: '100%' }} placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="备注" {...this.formLayout}>
                    {getFieldDecorator('remark', {
                        rules: [{ required: false, message: '请输入备注' }],
                        initialValue: current && current.remark,
                    })(<TextArea style={{ width: '100%' }} placeholder="请输入" />)}
                </Form.Item>
            </Modal>
        )
    }
}