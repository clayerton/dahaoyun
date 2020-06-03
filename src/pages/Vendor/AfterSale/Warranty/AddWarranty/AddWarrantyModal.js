import { Form, Input, Modal, Upload, Icon, message, Divider, Button } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
const { TextArea } = Input;
@Form.create()
class AddWarrantyModal extends PureComponent {
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
      console.log(fieldsValue)
      handleSubmit(fieldsValue);
    });
  };


  handleCancel = e => {
    e.preventDefault();
    const { handleCancel } = this.props;
    handleCancel();
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
    return isJpgOrPng;
  }

  render() {
    const { imageUrl } = this.state;
    const {
      form: { getFieldDecorator, validateFields },
      visible,
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击添加故障照片</div>
      </div>
    );
    return (
      <Modal
        width={500}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        onCancel={this.handleCancel}
        visible={visible}
        footer={null}
      >
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
        {getFieldDecorator('image', {
          rules: [{ required: false, message: '请输入' }],
        })(
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            className={styles.avatar}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" className={styles.img} /> : uploadButton}
          </Upload>
        )}
        <Divider dashed={true} />
        <Form.Item label="签字意见" {...this.formLayout}>
          {getFieldDecorator('d', {
            rules: [{ required: false, message: '请输入' }],
          })(<TextArea style={{ minHeight: 100 }} />)}
        </Form.Item>
        <div className={styles.footer}>
          <Button onClick={this.handleSubmit} type='primary'>提交</Button>
          <Button type='default'>保存</Button>
          <Button onClick={this.handleCancel} type='default'>取消</Button>
        </div>
      </Modal>
    );
  }
}
export default AddWarrantyModal;
