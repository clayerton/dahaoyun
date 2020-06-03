import React from 'react';
import { Button, Form, InputNumber, Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import styles from './style.less';
import NormalTable from '@/components/NormalTable';
import { formatMessage } from 'umi-plugin-react/locale';

// const columns = [
//   {
//     dataIndex: 'sn',
//     title: 'SN',
//   },
//   {
//     dataIndex: 'name',
//     title: '设备名',
//   },
//   {
//     dataIndex: 'workshop',
//     title: '车间',
//     filters: [
    
//     ],
//     onFilter: (value, record) => record.workshop.indexOf(value) === 0,
//   },
// ];
function group(groupList) {
  let data = [];
  groupList && groupList.map((v, i) => {
    data.push({
      text: v.name,
      value: v.name,
    })
  })
  data.push(...data,{ text: formatMessage({id: 'unallocated'}), value: formatMessage({id: 'unallocated'}) })
  return  Array.from(new Set(data));
}
function columns(groupList) {
  return [
    {
      dataIndex: 'sn',
      title: 'SN',
    },
    {
      dataIndex: 'name',
      title: formatMessage({id: 'device.name'}),
    },
    {
      dataIndex: 'workshop',
      title: formatMessage({id: 'workshop'}),
      filters: group(groupList),
      onFilter: (value, record) => {
        if(value===formatMessage({id: 'unallocated'})) return record.workshop === ''
        return record.workshop.indexOf(value) === 0
      },
      render: (text)=>{
        return text || formatMessage({id: 'unallocated'})
      }
    },
  ]
}

/* eslint react/no-multi-comp:0 */
class MachineOfDesign extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      disabled: false,
      showSearch: false,
      init: true,
      groupList: [],
    };
  }

  _getDataSn = () => {
    const { dataSource, targetKeys } = this.state;
    const array = dataSource.filter(item => targetKeys.includes(item.key));
    const sn = [];
    array.map(obj => {
      sn.push(obj.sn);
    });
    return sn;
  };

  componentWillReceiveProps(nextProps) {
    const { devices, groupList } = nextProps;
    const { init } = this.state;
    if (devices && devices.items && devices.items.length > 0 && init) {
      const newData = devices.items.map((item, i) => ({
        key: item.sn,
        deviceSn: item.sn,
        ...item,
      }));
      this.setState({
        dataSource: newData,
        // init: false,
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
    this.setState({ dataSource: newData });
  };

  render() {
    const { targetKeys, disabled, showSearch, dataSource, active, groupList } = this.state;
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
      >
        {({
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
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
          const columnss = columns(groupList).map(col => {
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
              rowSelection={rowSelection}
              rowClassName={() => 'editable-row'}
              columns={columnss}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : null }}
            />
          );
        }}
      </Transfer>
    );
  }
}

export default MachineOfDesign;
