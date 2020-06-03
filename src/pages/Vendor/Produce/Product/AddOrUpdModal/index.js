import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';
import ProductFormVdr from '@/components/ProductFormVdr';
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
    const { handleCancel, changeType } = this.props;
    changeType(0);
    handleCancel();
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

    const parentMethods = {
      getFieldDecorator,
      current,
      formLayout: this.formLayout,
      type,
      submit: this.handleSubmit,
      validateFields,
      changeItem: this.changeItem,
      groupList,
    };
    return (
      <Modal
        title={current && current.id ? '编辑产品' : '新增产品'}
        className={styles.standardListForm}
        width={880}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        <ProductFormVdr {...parentMethods} />
      </Modal>
    );
  }
}
export default AddOrUpdModal;
