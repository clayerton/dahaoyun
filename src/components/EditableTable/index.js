import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
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
              message: `${title}${formatMessage({id: 'not.empty'})}.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            placeholder={formatMessage({id: 'please.input.name'})}
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
        title: formatMessage({id: 'product.name'}),
        dataIndex: 'name',
        editable: true,
        align: 'center',
        width: '50%',
      },
      {
        title: formatMessage({id: 'action'}),
        dataIndex: 'operation',
        align: 'center',
        render: (text, record) => (
          <Popconfirm title={formatMessage({id: 'if.delete'})} onConfirm={() => this.handleDelete(record)}>
            <a>{formatMessage({id: 'delete'})}</a>
          </Popconfirm>
        ),
      },
    ];

    this.state = {
      dataSource: [],
      curentCount: 5,
      currentPage: 1,
      workshopParams: {
        // type: 'design',
        count: 5,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { groupList } = this.props;
    if (nextProps.groupList !== groupList) {
      this.setState({
        dataSource: nextProps && nextProps.groupList !== undefined ? nextProps.groupList.items : [],
        totalNum: nextProps && nextProps.groupList !== undefined ? nextProps.groupList.total : 0,
      });
    }
  }

  handleSave = row => {
    const { curentCount, currentPage } = this.state;
    const { dispatch, typeParams } = this.props;
    if (row.id === undefined) {
      dispatch({
        type: 'group/addGroup',
        payload: {
          add: {
            name: row.name,
            type: typeParams,
          },
          fetch: {
            count: curentCount,
            type: typeParams,
          },
        },
      });
      this.setState({
        currentPage: 1,
      });
    } else {
      dispatch({
        type: 'group/updGroup',
        payload: {
          upd: { ...row },
          fetch: {
            count: curentCount,
            type: typeParams,
            page: currentPage - 1,
          },
        },
      });
    
    }
  };

  handleDelete = record => {
    const { dispatch, typeParams } = this.props;
    const { curentCount, currentPage, dataSource } = this.state;
    let { totalNum } = this.state;
    if (record.id) {
      dispatch({
        type: 'group/delGroup',
        payload: {
          del: record,
          fetch: {
            count: curentCount,
            page: currentPage - 1,
            type: typeParams,
          },
        },
      });
    } else {
      const data = [...dataSource];
      this.setState({
        dataSource: data.filter(item => item.id !== record.id),
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
    const { visible, handleCancel, dispatch,typeParams  } = this.props;
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

    dataSource.forEach((item, i) => {
      if (item.key === undefined) {
        dataSource[i] = Object.assign(item, { key: i });
      }
    });

    const paginationProps = {
      onChange: page => {
        dispatch({
          type: 'group/fetchGroup',
          payload: { ...workshopParams, type: typeParams, page: page - 1 },
        });
    
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
      <Modal title={formatMessage({id: 'group.management'})} width={800} visible={visible} onCancel={handleCancel} footer={null}>
        <Button onClick={this.handleAdd} type="primary" icon="plus" style={{ marginBottom: 16 }}>
          {formatMessage({id: 'add'})}
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
