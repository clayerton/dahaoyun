import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Button, /* Alert, */ Upload, Icon, Modal, message, Select, Row, Col } from 'antd';
import './style.less';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ loading, designGlobal, group }) => ({
  designGlobal,
  groupList: group.groupList,
  loading: loading.effects['designList/addDesign'],
}))
@Form.create()
class AddDesignModal extends PureComponent {
  formLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };

  constructor(props) {
    super(props);

    this.state = {
      uploadFileList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.designRes && nextProps.designRes.code === 0) {
      this.setState({
        uploadFileList: [],
      });
    }
  }

  handleChange = val => {
    this.setState({ val });
  };

  // 上传文件
  onUploadFile = () => {
    const { dispatch, form } = this.props;
    const { uploadFileList, val } = this.state;
    const formData = new FormData();
    uploadFileList.map(obj => {
      formData.append('files', obj);
    });
    val && formData.append('group', val);
    dispatch(
      {
        type: 'designGlobal/submintDes',
        payload: formData,
      },
      this.handleCancle()
    );
    form.resetFields();
  };

  // 清除文件列表
  remove = (e) => {
    e.preventDefault();
    this.setState(() => {
      const newFileList = [];
      return {
        uploadFileList: newFileList,
      };
    });
  };

  handleCancle = () => {
    const { onCancel } = this.props;
    this.setState({
      uploadFileList: [],
    });
    onCancel();
  };

  render() {
    const {
      visible,
      // onCancel,
      loading,
      groupList,
      form: { getFieldDecorator },
    } = this.props;
    const { uploadFileList } = this.state;

    const props = {
      multiple: true,
      accept: '.DST,.DSB,.dst,.dsb,.GLV,.glv,.PAS,.pas',
      headers: {
        'X-Requested-With': null,
      },
      onRemove: file => {
        this.setState(() => {
          const index = uploadFileList.indexOf(file);
          const newFileList = uploadFileList.slice();
          newFileList.splice(index, 1);
          return {
            uploadFileList: newFileList,
          };
        });
      },
      beforeUpload: (file, fileList) => {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error(formatMessage({id: 'file.limit'}));
          return false;
        }
        this.setState(() => ({
          uploadFileList: [...uploadFileList, ...fileList],
        }));
        return false;
      },
      fileList: uploadFileList,
    };

    return (
      <Modal visible={visible} onCancel={this.handleCancle} width={1000} footer={null}>
        {/* <Alert message={messages} type="info" showIcon style={{ marginTop: '20px' }} /> */}
        <div style={{ marginTop: '30px', position: 'relative', }}>
          <Upload {...props}>
            <Button style={{marginBottom: 20,}} type="primary">
              <Icon type="upload" />
              {formatMessage({id: 'add.design.file'})}
            </Button>
          </Upload>
          <Button 
            style={{ 
              marginLeft: 15, 
              marginBottom: 20,
              position: 'absolute',
              top: 0,
              left: 150,
            
            }} onClick={this.remove}>
              {formatMessage({id: 'remove.design.file'})}
          </Button>
          <span
            style={{
              width: '60%',
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              textAlign: 'right',
              right: 0,
            }}
          >
            <Form>
              <Row gutter={24}>
                <Col span={24}>
                  <FormItem label={formatMessage({id: 'group'})} {...this.formLayout}>
                    {getFieldDecorator('type')(
                      <Select
                        style={{ width: '100%' }}
                        placeholder={formatMessage({id: 'please.input.group.or.add'})}
                        onChange={this.handleChange}
                        mode="tags"
                        maxTagCount={1}
                      >
                        {groupList && groupList.items
                          ? groupList.items.map(item => (
                              // eslint-disable-next-line react/jsx-indent
                              <Option key={String(item.id)} value={String(item.name)}>
                                {item.name}
                              </Option>
                            ))
                          : null}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button
            type="primary"
            onClick={this.onUploadFile}
            disabled={uploadFileList.length === 0}
            loading={loading}
          >
            {formatMessage({id: 'upload'})}
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={this.handleCancle}>
            {formatMessage({id: 'return'})}
          </Button>
        </div>
      </Modal>
    );
  }
}

export default AddDesignModal;
