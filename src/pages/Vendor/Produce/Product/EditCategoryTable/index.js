import React from 'react';
import { connect } from 'dva';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import styles from './index.less';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    let { editing } = this.state;
    editing = !editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      if (record.name === values.name) return;
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title}不能为空.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            placeholder="请输入分组"
            autocomplete={'off'}
            // eslint-disable-next-line no-return-assign
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            autoFocus
          />
        )}
      </Form.Item>
    ) : (
      // eslint-disable-next-line react/jsx-indent
      <div
        className={styles.editable}
        style={{ paddingRight: 24, height: '30px' }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ loading }) => ({
  loading: loading.effects['designList/addDesign'],
}))
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '分组',
        dataIndex: 'name',
        editable: true,
        align: 'center',
        width: '50%',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record) => (
          <Popconfirm title="是否要删除?" onConfirm={() => this.handleDelete(record)}>
            <a>删除</a>
          </Popconfirm>
        ),
      },
    ];

    this.state = {
      dataSource: [],
      curentCount: 5,
      currentPage: 1,
      workshopParams: {
        count: 5,
        page: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { categoryList } = this.props;
    if (nextProps.categoryList !== categoryList) {
      this.setState({
        dataSource:
          nextProps && nextProps.categoryList !== undefined ? nextProps.categoryList.items : [],
        totalNum:
          nextProps && nextProps.categoryList !== undefined ? nextProps.categoryList.total : 0,
      });
    }
  }

  handleSave = row => {
    const { curentCount, currentPage } = this.state;
    const { dispatch, typeParmas } = this.props;
    if (row.id === undefined) {
      dispatch({
        type: 'vdrCategory/submitCategory',
        payload: {
          add: {
            name: row.name,
            // type: typeParmas,
          },
          fetch: {
            count: curentCount,
            // type: typeParmas,
          },
        },
      });
      this.setState({
        currentPage: 1,
      });
    } else {
      dispatch({
        type: 'vdrCategory/updateCategory',
        payload: {
          upd: { ...row },
          fetch: {
            count: curentCount,
            // type: typeParmas,
            page: currentPage - 1,
          },
        },
      });
    }
  };

  handleDelete = record => {
    const { dispatch, typeParmas } = this.props;
    const { curentCount, currentPage, dataSource } = this.state;
    let { totalNum } = this.state;
    if (record.id) {
      dispatch({
        type: 'vdrCategory/delCategory',
        payload: {
          del: record,
          fetch: {
            count: curentCount,
            page: currentPage - 1,
            // type: typeParmas,
          },
        },
      });
    } else {
      const data = [...dataSource];
      this.setState({
        dataSource: data && data.filter(item => item.id !== record.id),
        totalNum: (totalNum -= 1),
      });
    }
  };

  handleAdd = () => {
    const { dataSource } = this.state;
    if (dataSource.filter(item => item.id === undefined).length === 0) {
      let { totalNum } = this.state;
      const newData = {
        key: dataSource.length,
      };
      this.setState({
        dataSource: [newData, ...dataSource],
        totalNum: (totalNum += 1),
      });
    }
  };

  render() {
    const { visible, handleCancel, dispatch } = this.props;
    const { dataSource, currentPage, totalNum, workshopParams } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    dataSource && dataSource.forEach((item, i) => {
      if (item.key === undefined) {
        dataSource[i] = Object.assign(item, { key: i });
      }
    });

    const paginationProps = {
      onChange: page => {
        dispatch({
          type: 'vdrCategory/fetchCategory',
          payload: { ...workshopParams, page: page - 1 },
        });
        // dispatch({
        //   type: 'category/searchCategory',
        //   payload: {
        //     type: 1,
        //     page: page - 1,
        //     count: 5,
        //   },
        // });
        this.setState({
          currentPage: page,
        });
      },
      showQuickJumper: true,
      pageSize: 5,
      total: totalNum,
      showTotal: total => `共 ${total} 条`,
      current: currentPage,
    };

    return (
      <Modal title="" width={800} visible={visible} onCancel={handleCancel} footer={null}>
        <Button onClick={this.handleAdd} type="primary" icon="plus" style={{ marginBottom: 16 }}>
          新增分组
        </Button>
        <Table
          components={components}
          rowClassName={() => styles.editable_row}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          size="small"
          pagination={paginationProps}
        />
      </Modal>
    );
  }
}

export default EditableTable;
