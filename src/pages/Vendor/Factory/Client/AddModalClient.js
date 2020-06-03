import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';
import ClientForm from './AddOrUpClient';
import styles from './index.less';

@Form.create()
class AddOrUpdModal extends PureComponent {
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
      selectTab,
      client,
      proxy,
    } = this.props;

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const parentMethods = {
      getFieldDecorator,
      current,
      formLayout: this.formLayout,
      selectTab,
      submit: this.handleSubmit,
      validateFields,
      changeItem: this.changeItem,
      client,
      proxy,
    };

    return (
      <Modal
        title={current && current.id ? `编辑${selectTab==0 ? '客户': '代理'}` : `新增${selectTab==0 ? '客户': '代理'}`}
        className={styles.standardListForm}
        width={880}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        <ClientForm {...parentMethods} />
      </Modal>
    );
  }
}
export default AddOrUpdModal;
