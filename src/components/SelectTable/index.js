import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class SelectTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      return {
        selectedRowKeys: [],
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

 

  render() {
    const { selectedRowKeys } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      selectType,
      selectedList,
      rowkey,
      rowClassName,
      onRow
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      type: selectType,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        selectedRowKeys: selectedList ? selectedList.indexOf(record.id) !== -1 : false,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <Table
          onClick={this.onClick}
          loading={loading}
          rowKey={rowkey !== undefined ? rowkey : record => record.id}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          rowClassName={rowClassName && styles.row}     
          onRow={onRow}
        />
      </div>
    );
  }
}

export default SelectTable;
