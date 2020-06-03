import close from '@/assets/common/close.png';
import { message, Select, Upload, Radio } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './index.less';
const { Option } = Select;
import Modal from '@/components/Modal';
@connect(({ loading, designGlobal, group }) => ({
  designGlobal,
  groupList: group.groupList,
  loading: loading.effects['designList/addDesign'],
}))
class AddDesign extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uploadFileList: [],
      selGroup: null,
      overwrite: false,
    };
  }
  _onCancel = () => {
    const { visible, onCancel } = this.props;
    this.setState({
      selGroup: null,
      uploadFileList: [],
      overwrite: false,
    });
    onCancel && onCancel();
  };
  // 清除文件列表
  remove = e => {
    e.preventDefault();
    this.setState(() => {
      const newFileList = [];
      return {
        uploadFileList: newFileList,
      };
    });
  };

  // 上传文件
  onUploadFile = () => {
    const { dispatch } = this.props;
    const { uploadFileList, selGroup, overwrite } = this.state;
    const formData = new FormData();
    if (uploadFileList.length === 0) {
      message.destroy();
      message.error('上传文件不能为空');
      return;
    }
    uploadFileList.map(obj => {
      formData.append('files', obj);
    });
    selGroup && formData.append('group', selGroup);
    formData.append('overwrite', overwrite);
    dispatch({
      type: 'design/uploadDes',
      payload: formData,
      callback: () => {
        this._onCancel();
        this.setState(() => {
          const newFileList = [];
          return {
            uploadFileList: newFileList,
            selGroup: null,
          };
        });
      },
    });
  };
  _onChange = selGroup => {
    this.setState({
      selGroup,
    });
  };
  onChangeRadio = e => {
    this.setState({
      overwrite: e.target.value,
    });
  };
  render() {
    const { visible, group } = this.props;
    const { uploadFileList, selGroup } = this.state;

    const props = {
      multiple: true,
      accept: '.DST,.DSB,.dst,.dsb,.GLV,.glv',
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
          message.error(formatMessage({ id: 'file.limit' }));
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
      <Modal
        visible={visible}
        width={992}
        height={500}
        onCancel={this._onCancel}
        title={'新增花样'}
      >
        <div className={styles.designButton}>
          <div className={styles.fileButton}>
            <Upload {...props}>
              <div className={styles.addDesign}>添加花样文件</div>
            </Upload>
            <div onClick={this.remove} className={styles.clearDesign}>
              清除所有文件
            </div>
            <div className={styles.group}>
              <span>花样覆盖:</span>
              <Radio.Group onChange={this.onChangeRadio} value={this.state.overwrite}>
                <Radio value={false}>否</Radio>
                <Radio value={true}>是</Radio>
              </Radio.Group>
              <span>分组: </span>
              <Select
                placeholder={'请选择分组'}
                onChange={this._onChange}
                style={{ width: 170, height: 28 }}
                value={selGroup}
              >
                {group &&
                  group.map((v, i) => {
                    return (
                      <Option key={v.name} value={v.name}>
                        {(v.name === null && '全部分组') || (v.name === '~' && '未分组') || v.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div onClick={this.onUploadFile}>上传</div>
          <div onClick={this._onCancel} className={styles.back}>
            返回
          </div>
        </div>
      </Modal>
    );
  }
}
export default AddDesign;
