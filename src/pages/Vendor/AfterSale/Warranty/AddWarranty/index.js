import { Form, Input, Modal, Upload, Icon, message, Divider, Button, Card } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
const { TextArea } = Input;
@Form.create()
class AddWarranty extends PureComponent {
    formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    state = {
        imageUrl: null,
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form, handleSubmit } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleSubmit && handleSubmit(fieldsValue);
        });
    };


    handleCancel = e => {
        e.preventDefault();
        const { handleCancel } = this.props;
        handleCancel && handleCancel();
    };


    render() {
        const {
            form: { getFieldDecorator, validateFields },
            visible,
        } = this.props;

        return (
            <Card>
                <Form.Item label="客户" {...this.formLayout}>
                    {getFieldDecorator('custom', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="联系电话" {...this.formLayout}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="机型" {...this.formLayout}>
                    {getFieldDecorator('a', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="出厂编号" {...this.formLayout}>
                    {getFieldDecorator('b', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="问题描述" {...this.formLayout}>
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: '请输入' }],
                    })(<TextArea style={{ minHeight: 100 }} placeholder="请输入" />)}
                </Form.Item>

                <Divider dashed={true} />
                <Form.Item label="签字意见" {...this.formLayout}>
                    {getFieldDecorator('d', {
                        rules: [{ required: false, message: '请输入' }],
                    })(<TextArea style={{ minHeight: 100 }} />)}
                </Form.Item>
                <div className={styles.footer}>
                    <Button onClick={this.handleSubmit} type='primary'>提交</Button>
                    <Button type='default'>保存</Button>
                    <Button onClick={this.handleCancel} type='default'>更多操作</Button>
                </div>
            </Card>
        );
    }
}
export default AddWarranty;
