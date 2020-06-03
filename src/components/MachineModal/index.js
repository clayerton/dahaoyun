import React from 'react';
import { Button, Form, InputNumber, Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import styles from './style.less';

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
      if (error) {
        return;
      }
      this.toggleEdit();
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
              message: `数量不能为空`,
            },
            {
              pattern: /^[1-9]\d*$/,
              message: '数量不合法',
            },
          ],
          initialValue: record[dataIndex],
        })(
          <InputNumber
            // eslint-disable-next-line no-return-assign
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
        // eslint-disable-next-line react/jsx-indent
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
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

function group(groupList) {
  let data = [];
  groupList && groupList.map((v, i) => {
    data.push({
      text: v.name,
      value: v.name,
    })
  })
  data.push(...data,{ text: '未分配', value: '未分配' })
  return  Array.from(new Set(data));
}

function leftTableColumns(groupList) {
  return [
    {
      dataIndex: 'sn',
      title: 'SN',
    },
    {
      dataIndex: 'name',
      title: '设备名',
    },
    {
      dataIndex: 'workshop',
      title: '车间',
      filters: group(groupList),
      onFilter: (value, record) => {
        if(value==='未分配') return record.workshop === ''
        return record.workshop.indexOf(value) === 0
      },
      render: (text)=>{
        return text || '未分配'
      }
    },
  ]
}
function rightTableColumns(groupList) {
  return [
    {
      dataIndex: 'name',
      title: '设备名',
    },
    {
      dataIndex: 'workshop',
      title: '车间',
      filters: group(groupList),
      onFilter: (value, record) => {
        if(value==='未分配') return record.workshop === ''
        return record.workshop.indexOf(value) === 0
      },
      render: (text)=>{
        return text || '未分配'
      }
    },
    {
      dataIndex: 'quantity',
      title: '排产数量',
      editable: true,
    },
  ];
}

/* eslint react/no-multi-comp:0 */
class MachineModal extends React.PureComponent {
  constructor(props) {
    super(props);
    // const mockDatas = [];
    // for (let i = 0; i < 20; i += 1) {
    //   mockDatas.push({
    //     key: i.toString(),
    //     sn: `000000${i + 1}`,
    //     name: `000${i + 1}`,
    //     workshop: i % 2 ? '1' : '2',
    //     number: 0,
    //     // tag: mockTags[i % 3],
    //     // test: 0
    //   });
    // }

    this.state = {
      targetKeys: [],
      disabled: false,
      showSearch: false,
      init: true,
      quantity: props.quantity || 0,
      done: 0,
      groupList: [],
    };
  }

  _getData = () => {
    const { dataSource, targetKeys } = this.state;
    return dataSource.filter(item => targetKeys.includes(item.key));
  };

  _other = (quantity, done) => {
    const other = Math.floor(quantity - done);
    if (other < 0) return `(超${Math.abs(other)})`;
    return other;
  };

  _equalPress = () => {
    const { quantity, dataSource, targetKeys } = this.state;
    const active = dataSource.filter(item => targetKeys.includes(item.key));

    if (active.length < 1) {
      return;
    }
    const equal = Math.floor(quantity / active.length);
    const other = quantity % active.length;

    dataSource.map(obj => {
      active.map((item, index) => {
        if (item.id === obj.id) {
          if (index < other) {
            obj.quantity = parseInt(equal) + 1;
          } else {
            obj.quantity = parseInt(equal);
          }
        }
      });
    });

    this.setState({ dataSource: [...dataSource], done: quantity });
  };

  componentWillReceiveProps(nextProps) {
    const { devices, groupList } = nextProps;
    const { init } = this.state;
    if (devices && devices.items && devices.items.length > 0 && init) {
      const newData = devices.items.map((item, i) => ({
        key: i,
        quantity: 0,
        deviceSn: item.sn,
        ...item,
      }));
      this.setState({
        dataSource: newData,
        init: false,
      });
    }
    this.setState({
      groupList: groupList,
    })
  }

  componentWillUnmount() {
    this.setState({
      init: true,
    });
  }

  // 关闭选择机器的弹框
  closeModal = () => {
    const { machineHandleCancel } = this.props;
    machineHandleCancel();
  };

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  handleSave = row => {
    const { dataSource, targetKeys } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    let done = 0;
    const active = newData.filter(obj => targetKeys.includes(obj.key));
    active.map(obj => {
      done += parseInt(obj.quantity);
    });
    this.setState({ dataSource: newData, done });
  };

  render() {
    const { targetKeys, disabled, showSearch, dataSource, quantity, done, active, groupList } = this.state;

    return (
      <Transfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        disabled={disabled}
        onChange={this.onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        showSelectAll={false}
        showSearch={showSearch}
        titles={[
          null,
          <div className={styles.countBlock}>
            <span className={styles.countTitle}>
              应排：<span className={styles.blue}>{quantity}</span>
            </span>
            <span className={styles.countTitle}>
              已排：<span className={styles.green}>{done}</span>
            </span>
            <span className={styles.countTitle}>
              待排：<span className={styles.red}>{this._other(quantity, done)}</span>
            </span>
            <Button size="small" type="primary" onClick={this._equalPress}>
              均
            </Button>
          </div>,
        ]}
      >
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns = direction === 'left' ? leftTableColumns(groupList) : rightTableColumns(groupList);
          const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };
          const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
          const columnss = columns.map(col => {
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

          return (
            <Table
              components={components}
              rowSelection={rowSelection}
              rowClassName={() => 'editable-row'}
              columns={columnss}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : null }}
            // onRow={({ key, disabled: itemDisabled }) => ({
            //   onClick: () => {
            //     if (itemDisabled || listDisabled) return;
            //     onItemSelect(key, !listSelectedKeys.includes(key));
            //   },
            // })}
            />
          );
        }}
      </Transfer>
    );
  }
}

export default MachineModal;
