import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col } from 'antd';
import styles from './index.less';

@Form.create()
class ModifyStageSN extends PureComponent {
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
    } = this.props;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    // const parentMethods = {
    //   getFieldDecorator,
    //   current,
    //   formLayout: this.formLayout,
    //   submit: this.handleSubmit,
    //   validateFields,
   
    // };

    return (
      <Modal
        title={'web测试设备绑定'}
        // className={styles.standardListForm}
        width={500}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
       <Form className={{}} onSubmit={this.handleSubmit}>
          <Form.Item key={1}  className={styles.leftWidth} label="SN" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {getFieldDecorator('sn', {
              rules: [{ required: true, message: '请输入SN' }],
            //   initialValue: current && current.productQuantity,
            })(<Input placeholder="请输入SN" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default ModifyStageSN;
