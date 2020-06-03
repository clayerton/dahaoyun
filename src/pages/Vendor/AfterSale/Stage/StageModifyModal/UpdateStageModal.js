import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';
import ModifyStageForm from '../StageModifyModal/ModifyStageForm';

@Form.create()
class UpdateStageModal extends PureComponent {
  formLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSubmit && handleSubmit(fieldsValue);
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
        title={'修改分期列表'}
        // className={styles.standardListForm}
        width={type ===2 ? 500 : 800}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        <ModifyStageForm {...parentMethods} />
      </Modal>
    );
  }
}
export default UpdateStageModal;
