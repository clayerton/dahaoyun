import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';

@Form.create()
class EditWarrantyModal extends PureComponent {
  formLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSubmit(fieldsValue);
    });
  };

  changeItem = value => {
    const { changeType } = this.props;
    changeType(value);
  };

  handleCancel = e => {
    e.preventDefault();
    const { handleCancel } = this.props;
    handleCancel();
  };

  render() {
    const {
      form: { getFieldDecorator, validateFields },
      current,
      visible,
      client,
      proxy,
    } = this.props;
    const modalFooter = { okText: ' ', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const parentMethods = {
      getFieldDecorator,
      current,
      formLayout: this.formLayout,
      submit: this.handleSubmit,
      validateFields,
      changeItem: this.changeItem,
      client,
      proxy,
    };

    return (
      <Modal
        // title={' '}
        width={500}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
        footer={null}
      >
        <div style={{height: '30px'}} />
      </Modal>
    );
  }
}
export default EditWarrantyModal;
