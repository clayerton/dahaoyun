import React, { PureComponent, Fragment } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';

@Form.create()
class ModifyMachine extends PureComponent {

  handleCancel = e => {
    e.preventDefault();
    const { handleCancel } = this.props;
    handleCancel();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSubmit(fieldsValue);
    });
  };


  render() {
    const {
      form: { getFieldDecorator, validateFields },
      current,
      visible,
      type,
      groupList,
    } = this.props;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
    return (
      <Modal
        title={'修改分期列表'}
        // className={styles.standardListForm}
        width={type === 2 ? 500 : 800}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        <Form>
          <Form.Item key={1} label="设备名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('deviceName', {
              rules: [{ required: false, message: '请输入设备名称' }],
              initialValue: current && current.deviceName,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item key={2} label="出厂编号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('factoryNm', {
              rules: [{ required: false, message: '请输入出厂编号' }],
              initialValue: current && current.factoryNm,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>

      </Modal>
    );
  }
}
export default ModifyMachine;
