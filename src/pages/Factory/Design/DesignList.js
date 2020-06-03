import Header from '@/components/GroupHeader';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import AddDesign from './AddDesign';
import { Item } from './Component';
import styles from './style.less';
import NextPage from '@/components/NextPage';
@connect(({ group, design, loading }) => ({
  group: group.groupList,
  designList: design.designList,
  nextPage: design.designNext,
  designImgList: design.designImgList,
  loading: loading.effects['design/fetchList'],
}))
export default class DesignList extends PureComponent {
  // Redundant here, the pot in the backend development.Don't want to write a comment.
  state = {
    size: 16,
    group: null,
    key: null,
    nextType: 0,
    visible: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { size, group } = this.state;

    dispatch({
      type: 'group/fetchGroup',
      payload: {
        size: 1000,
      },
    });
    dispatch({
      type: 'design/fetchList',
      payload: {
        size,
        group,
      },
    });
  }
  onChange = group => {
    const { dispatch } = this.props;
    const { size } = this.state;
    this.setState({
      group,
      nextType: 0,
    })
    dispatch({
      type: 'design/fetchList',
      payload: {
        size,
        group,
      },
    });
  };
  onHandleSearch = (key) => {
    const { dispatch } = this.props;
    const { size } = this.state;
    this.setState({
      nextType: 1,
      key,
    })
    dispatch({
      type: 'design/fetchDesKey',
      payload: {
        size,
        key,
      },
    })
  }
  onClickMore = () => {
    const { nextPage, dispatch } = this.props;
    const { size, group, nextType, key, } = this.state;

    dispatch({
      type: `design/${nextType === 0 ? 'fetchList' : 'fetchDesKey'}`,
      payload: {
        size,
        page: nextPage,
        group,
        key,
      },
    });
  };
  onAddDesign = () => {
    this.setState({
      visible: true
    })
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { group, designList, nextPage, designImgList, loading } = this.props;
    const { visible } = this.state;
    const headerParent = {
      group,
      onChange: this.onChange,
      onHandleSearch: this.onHandleSearch,
      onHandleAdd: this.onAddDesign,
    };
    const addDesignParent = {
      onCancel: this.onCancel,
      visible,
      group,
    }
    const nextParent = {
      nextPage,
      onClickMore: this.onClickMore,
    }
    return (
      <Fragment>
        <Header {...headerParent} />
        <div className={styles.content}>
          {designList &&
            designList.map((v, i) => {
              return <Item key={v.name} imgUrl={designImgList[i]} {...v} groupList={group} />;
            })}
        </div>
        <NextPage {...nextParent} />
        <AddDesign {...addDesignParent} />
      </Fragment>
    );
  }
}
