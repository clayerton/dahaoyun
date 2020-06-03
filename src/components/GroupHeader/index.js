import add from '@/assets/common/add.png';
import search from '@/assets/common/search.png';
import { Input, Select } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
const { Search } = Input;

const { Option } = Select;
export default class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      selectValue: null,
      items: '',
      name: ''
    }
  }
  _onChange = value => {
    const { onChange } = this.props;
    onChange && onChange(value);
    this.setState({
      query: '',
      selectValue: value,
    })
  };
  search = () => {
    const { onHandleSearch } = this.props;
    const { query, selectValue } = this.state;
    onHandleSearch && onHandleSearch(query);
    this.setState({
      selectValue: null,
    })
  }
  _onHandleAdd = () => {
    const { onHandleAdd } = this.props;
    onHandleAdd && onHandleAdd();
  }
  onNameChange = event => {
    event.stopPropagation();
  };

  addItem = event => {
    event.stopPropagation();
  };
  render() {
    const { group } = this.props;
    const { query, selectValue, items, name } = this.state;
    return (
      <div className={styles.header}>
        <div className={styles.left}>
          <Select
            value={selectValue || '全部分组'}
            onChange={this._onChange}
            style={{ width: 210, height: 34, marginRight: 60 }}
          >
            {group &&
              group.map((v, i) => {
                return (
                  <Option key={v.name} value={v.name}>
                    {
                      v.name === null && '全部分组'
                      ||
                      v.name === '~' && '未分组'
                      ||
                      v.name
                    }
                  </Option>
                );
              })}
          </Select>
          <div className={styles.search}>
            <input placeholder="请输入关键词搜索"
              value={query}
              onChange={event => { this.setState({ query: event.target.value }) }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }} />
            <img onClick={this.search} src={search} />
          </div>
        </div>
        <div className={styles.right} onClick={this._onHandleAdd}>
          <img src={add} />
          <span>新 增</span>
        </div>
      </div>
    );
  }
}
