import React, { PureComponent } from 'react';
import { Card, Button, List, Form, Modal, Input, Row, Col, Tabs } from 'antd';
import ClientForm from '../Factory/Client/AddOrUpClient';
import AddProxyTab from './AddProxyTab';

import styles from './index.less';
const { TabPane } = Tabs;

@Form.create()
class AddClientModal extends PureComponent {
  formLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  state = {
    selectTab: 0,
  };

  handleSubmit = (e, value) => {
    e.preventDefault();
    const { form, handleSubmit } = this.props;
    const { selectTab } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSubmit(fieldsValue, selectTab);
    });
  };

  handleCancel = e => {
    e.preventDefault();
    const { handleCancel } = this.props;
    handleCancel();
  };
  onChange = value => {
    this.setState({
      selectTab: value,
    });
  };

  render() {
    const {
      form: { getFieldDecorator, validateFields },
      visible,
    } = this.props;
    const { selectTab } = this.state;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const parentMethods1 = {
      getFieldDecorator,
      current: [],
      formLayout: this.formLayout,
      selectTab,
      submit: this.handleSubmit,
      validateFields,
      onChange: this.onChange,
    };

    return (
      <Modal
        // title={' '}
        className={styles.standardListForm}
        width={880}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        <div style={{ height: 30 }} />
        <AddProxyTab {...parentMethods1} />
      </Modal>
    );
  }
}
export default AddClientModal;
