import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class NormalTable extends PureComponent {
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const {
      data: { list, pagination },
      loading,
      columns,
      rowkey,
      onRow,
      onExpand,
      expandedRowRender,
      expandRowByClick,
      bordered,
      rowClassName,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          expandRowByClick={expandRowByClick || false}
          loading={loading}
          rowKey={rowkey !== undefined ? rowkey : record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          expandedRowRender={expandedRowRender}
          onExpand={onExpand}
          onRow={onRow}
          bordered={bordered}
          rowClassName={rowClassName && styles.row}      
          />
      </div>
    );
  }
}

export default NormalTable;
